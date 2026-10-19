import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { cssVars } from '../lib/cssVars'
import { useGift } from '../context/GiftProvider'
import { HeartGlyph } from './HeartGlyph'

type Floater = {
  id: number
  x: number
  y: number
  dx: number
  rise: number
  rot: number
  size: number
}

type SpawnOptions = {
  x: number
  y: number
  count: number
  size: number
  spread: number
  rise: number
  cap: number
  life: number
  setItems: Dispatch<SetStateAction<Floater[]>>
}

function isQuietTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  return Boolean(target.closest('button, a, input, textarea, label, select, [data-quiet]'))
}

export function FloatingHearts() {
  const { started, addHeart, play, reducedMotion } = useGift()
  const [bursts, setBursts] = useState<Floater[]>([])
  const [trails, setTrails] = useState<Floater[]>([])
  const idRef = useRef(1)
  const timeouts = useRef<number[]>([])

  const ambient = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => ({
        id: index,
        left: `${6 + ((index * 13) % 86)}%`,
        delay: `${-index * 1.8}s`,
        duration: `${15 + (index % 5) * 2}s`,
        size: `${14 + (index % 4) * 7}px`,
        opacity: `${0.28 + (index % 3) * 0.08}`,
        i: `${index}`,
      })),
    [],
  )

  const spawn = (options: SpawnOptions) => {
    const items: Floater[] = Array.from({ length: options.count }, () => ({
      id: idRef.current++,
      x: options.x,
      y: options.y,
      dx: (Math.random() - 0.5) * options.spread,
      rise: options.rise * (0.65 + Math.random() * 0.5),
      rot: Math.random() * 46 - 23,
      size: options.size + Math.random() * 8,
    }))
    const ids = new Set(items.map((item) => item.id))
    options.setItems((current) => [...current, ...items].slice(-options.cap))
    const timeout = window.setTimeout(() => {
      options.setItems((current) => current.filter((item) => !ids.has(item.id)))
    }, options.life)
    timeouts.current.push(timeout)
  }

  useEffect(() => {
    const timers = timeouts.current
    return () => {
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  useEffect(() => {
    if (started) return
    setBursts([])
    setTrails([])
  }, [started])

  useEffect(() => {
    if (!started) return

    let origin: { x: number; y: number; t: number; quiet: boolean } | null = null

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      origin = {
        x: event.clientX,
        y: event.clientY,
        t: performance.now(),
        quiet: isQuietTarget(event.target),
      }
    }

    const onUp = (event: PointerEvent) => {
      const start = origin
      origin = null
      if (!start || start.quiet || event.button !== 0) return
      const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y)
      if (moved > 14 || performance.now() - start.t > 650) return
      addHeart()
      spawn({
        x: start.x,
        y: start.y,
        count: reducedMotion ? 2 : 7,
        size: 16,
        spread: 110,
        rise: 120,
        cap: 36,
        life: 1100,
        setItems: setBursts,
      })
      play('tap')
    }

    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [started, addHeart, play, reducedMotion])

  useEffect(() => {
    if (!started || reducedMotion) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let last = 0
    const onMove = (event: PointerEvent) => {
      const now = performance.now()
      if (now - last < 100) return
      last = now
      spawn({
        x: event.clientX,
        y: event.clientY,
        count: 1,
        size: 10,
        spread: 18,
        rise: 42,
        cap: 8,
        life: 700,
        setItems: setTrails,
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [started, reducedMotion])

  return (
    <div className="heart-layer" aria-hidden="true">
      {ambient.map((heart) => (
        <span
          key={heart.id}
          className="ambient-heart"
          style={cssVars({
            '--left': heart.left,
            '--delay': heart.delay,
            '--duration': heart.duration,
            '--size': heart.size,
            '--opacity': heart.opacity,
            '--i': heart.i,
          })}
        >
          <HeartGlyph />
        </span>
      ))}
      {bursts.map((heart) => (
        <span key={heart.id} className="burst-heart" style={floaterStyle(heart)}>
          <HeartGlyph />
        </span>
      ))}
      {trails.map((heart) => (
        <span key={heart.id} className="trail-heart" style={floaterStyle(heart)}>
          <HeartGlyph />
        </span>
      ))}
    </div>
  )
}

function floaterStyle(heart: Floater) {
  return cssVars({
    '--x': `${heart.x}px`,
    '--y': `${heart.y}px`,
    '--dx': `${heart.dx}px`,
    '--rise': `${heart.rise}px`,
    '--rot': `${heart.rot}deg`,
    '--size': `${heart.size}px`,
  })
}
