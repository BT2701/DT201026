import { useEffect, useRef } from 'react'
import { HEART_UNLOCK, secretHeartMessage, tapHint } from '../data/content'
import { useGift } from '../context/GiftProvider'

export function HeartCounter() {
  const { hearts, play } = useGift()
  const previous = useRef(hearts)

  useEffect(() => {
    if (previous.current < HEART_UNLOCK && hearts >= HEART_UNLOCK) play('success')
    previous.current = hearts
  }, [hearts, play])

  const unlocked = hearts >= HEART_UNLOCK
  const remain = Math.max(HEART_UNLOCK - hearts, 0)
  const progress = Math.min(hearts, HEART_UNLOCK) / HEART_UNLOCK

  return (
    <section className="section" aria-labelledby="heart-count-title">
      <div className="card counter-card">
        <p className="eyebrow">Trái tim từ Trưởng</p>
        <p id="heart-count-title" className="counter-line" aria-live="polite">
          Số trái tim Dĩm nhận được từ Trưởng: {hearts} ❤️
        </p>
        <p className="muted">
          {unlocked
            ? 'Lời nhắn bí mật đã mở.'
            : `Còn ${remain} trái tim nữa để mở khóa lời nhắn bí mật.`}
        </p>
        <div className="meter" aria-hidden="true">
          <span style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="tap-hint">{tapHint}</p>
        {unlocked ? <p className="secret-banner">{secretHeartMessage}</p> : null}
      </div>
    </section>
  )
}
