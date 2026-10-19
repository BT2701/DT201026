import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useGift } from '../context/GiftProvider'
import { ConfettiBurst } from './ConfettiBurst'
import { CuteButton } from './CuteButton'

type Phase = 'sealed' | 'teased' | 'opened'

export function GiftIntro() {
  const { enterWorld, play, reducedMotion } = useGift()
  const [phase, setPhase] = useState<Phase>('sealed')
  const [burst, setBurst] = useState(0)
  const phaseRef = useRef<Phase>('sealed')
  const lockRef = useRef(false)
  const lockTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (lockTimer.current !== null) window.clearTimeout(lockTimer.current)
    }
  }, [])

  const giftLabel =
    phase === 'opened' ? 'Hộp quà đã mở' : phase === 'teased' ? 'Mở hộp quà' : 'Làm hộp quà rung nhẹ'

  const hint =
    phase === 'sealed'
      ? 'Chạm vào hộp quà nha 🎁'
      : 'Rung rồi đó... chạm thêm một lần để mở nè!'

  function onGift() {
    if (phaseRef.current === 'opened' || lockRef.current) return
    if (phaseRef.current === 'sealed') {
      phaseRef.current = 'teased'
      setPhase('teased')
      play('tap')
      if (!reducedMotion) {
        lockRef.current = true
        lockTimer.current = window.setTimeout(() => {
          lockRef.current = false
        }, 520)
      }
      return
    }
    phaseRef.current = 'opened'
    setPhase('opened')
    setBurst(1)
    play('open')
  }

  function onEnter() {
    play('chime')
    enterWorld()
  }

  const floating = phase === 'sealed' && !reducedMotion
  const shaking = phase === 'teased' && !reducedMotion

  return (
    <div className="intro-inner">
      <motion.p className="intro-kicker" {...fadeUp(0.15, reducedMotion)}>
        💌 Một món quà nhỏ dành riêng cho Dĩm
      </motion.p>
      <motion.h1 className="intro-title" {...fadeUp(0.4, reducedMotion)}>
        Người đặc biệt nhất hôm nay đã có quà rồi nè!
      </motion.h1>
      <motion.div {...fadeUp(0.7, reducedMotion)}>
        <button
          type="button"
          className="gift-hit"
          onClick={onGift}
          disabled={phase === 'opened'}
          aria-label={giftLabel}
        >
          <motion.div
            className="gift-float"
            animate={
              floating ? { y: [0, -10, 0] } : shaking ? { rotate: [0, -8, 8, -6, 5, 0] } : { y: 0, rotate: 0 }
            }
            transition={floating ? { duration: 2.6, repeat: Infinity } : { duration: reducedMotion ? 0 : 0.5 }}
          >
            <span className="gift-shadow" />
            <div className={`gift ${phase === 'opened' ? 'is-open' : ''}`}>
              <motion.div
                className="gift-lid"
                animate={phase === 'opened' ? { rotateX: -118, y: -46 } : { rotateX: 0, y: 0 }}
                transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 16 }}
              >
                <span className="ribbon-v" />
                <span className="bow" aria-hidden="true">
                  <span className="loop left" />
                  <span className="loop right" />
                  <span className="knot" />
                  <span className="tail left" />
                  <span className="tail right" />
                </span>
              </motion.div>
              <div className="gift-box">
                <span className="ribbon-v" />
                <span className="ribbon-h" />
                <span className="gift-glow">💗</span>
              </div>
            </div>
          </motion.div>
        </button>
      </motion.div>
      {phase === 'opened' ? (
        <motion.div className="greeting" aria-live="polite" {...fadeUp(0.1, reducedMotion)}>
          <h2 className="greeting-title">Happy Women's Day 20/10 💗</h2>
          <CuteButton className="cta" onClick={onEnter}>
            Khám phá món quà của Trưởng
          </CuteButton>
        </motion.div>
      ) : (
        <p className="hint" aria-live="polite">
          {hint}
        </p>
      )}
      <ConfettiBurst burstKey={burst} count={54} />
    </div>
  )
}

function fadeUp(delay: number, reduced: boolean) {
  if (reduced) {
    return { initial: false as const, animate: { opacity: 1 }, transition: { duration: 0 } }
  }
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay },
  }
}
