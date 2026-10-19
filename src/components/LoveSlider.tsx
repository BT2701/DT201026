import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { fullHeartMessage } from '../data/content'
import { useGift } from '../context/GiftProvider'
import { cssVars } from '../lib/cssVars'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { ConfettiBurst } from './ConfettiBurst'
import { CuteButton } from './CuteButton'
import { HeartGlyph } from './HeartGlyph'
import { Section } from './Section'

export function LoveSlider() {
  const { play } = useGift()
  const [value, setValue] = useState(0)
  const [celebrate, setCelebrate] = useState(false)
  const [burst, setBurst] = useState(0)
  const wasFull = useRef(false)
  const returnFocus = useRef<HTMLElement | null>(null)

  function onChange(next: number) {
    setValue(next)
    if (next === 100 && !wasFull.current) {
      wasFull.current = true
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      setBurst((current) => current + 1)
      setCelebrate(true)
      play('success')
    }
    if (next < 100) wasFull.current = false
  }

  function closeCelebrate() {
    setCelebrate(false)
    returnFocus.current?.focus()
  }

  const filled = Math.round((value / 100) * 12)
  const strong = value >= 78

  return (
    <Section id="thuong" eyebrow="Chương 3 · Một câu hỏi dễ thương" title="Dĩm thương Trưởng bao nhiêu nè? 🥺">
      <div className={`card love-panel ${strong ? 'is-strong' : ''}`} style={{ background: panelBackground(value) }}>
        <p className="love-percent" aria-hidden="true">
          {value}%
        </p>
        <div className="love-hearts" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <HeartGlyph key={index} className={index < filled ? 'on' : strong ? 'off-light' : 'off'} />
          ))}
        </div>
        <label className="slider-label" htmlFor="love-range">
          Kéo thanh này từ từ nha
        </label>
        <input
          id="love-range"
          className="love-range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={`${value}%`}
          style={cssVars({ '--p': `${value}%` })}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <p className="muted love-caption">Trò chơi vui thôi, không có câu trả lời sai đâu.</p>
      </div>
      {celebrate ? (
        <ProofScreen burstKey={burst} onClose={closeCelebrate} />
      ) : null}
    </Section>
  )
}

function ProofScreen({ burstKey, onClose }: { burstKey: number; onClose: () => void }) {
  useBodyScrollLock(true)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <div className="proof" role="dialog" aria-modal="true" aria-labelledby="proof-title" data-quiet>
      <ConfettiBurst burstKey={burstKey} count={60} />
      <div className="proof-card">
        <p className="proof-percent">100%</p>
        <h3 id="proof-title">{fullHeartMessage}</h3>
        <CuteButton onClick={onClose}>Chụp xong rồi nè</CuteButton>
      </div>
    </div>,
    document.body,
  )
}

function panelBackground(value: number): string {
  const soft = mixHex('#fff8f0', '#ff8aab', value / 100)
  const deep = mixHex('#ffe4ec', '#ff5c8a', value / 100)
  return `linear-gradient(165deg, ${soft}, ${deep})`
}

function mixHex(from: string, to: string, amount: number): string {
  const parse = (hex: string) => ({
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  })
  const start = parse(from)
  const end = parse(to)
  const mix = (a: number, b: number) => Math.round(a + (b - a) * amount)
  return `rgb(${mix(start.r, end.r)} ${mix(start.g, end.g)} ${mix(start.b, end.b)})`
}
