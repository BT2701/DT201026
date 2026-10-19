import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import photo from '../assets/holding-hands.jpg'
import { finalLines } from '../data/content'
import { useGift } from '../context/GiftProvider'
import { cssVars } from '../lib/cssVars'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { ConfettiBurst } from './ConfettiBurst'
import { CuteButton } from './CuteButton'
import { HeartGlyph } from './HeartGlyph'
import { Section } from './Section'

export function FinalSurprise() {
  const { play, replay, reducedMotion } = useGift()
  const [open, setOpen] = useState(false)
  const [burst, setBurst] = useState(0)

  function reveal() {
    setBurst((value) => value + 1)
    setOpen(true)
    play('success')
  }

  return (
    <Section id="bat-ngo" eyebrow="Chương 6 · Điều cuối cùng" title="Một món quà còn được giấu kỹ">
      <div className="finale-wrap">
        <p className="muted">Dĩm đã đi hết khu vườn nhỏ này rồi. Phần ngọt nhất Trưởng để dành ở nút bên dưới.</p>
        <CuteButton className="cta finale-launch" onClick={reveal}>
          💝 Nhấn vào đây để nhận món quà cuối cùng
        </CuteButton>
      </div>
      {open ? (
        <FinaleOverlay
          burstKey={burst}
          reducedMotion={reducedMotion}
          onReplay={() => {
            setOpen(false)
            replay()
          }}
        />
      ) : null}
    </Section>
  )
}

function FinaleOverlay({
  burstKey,
  reducedMotion,
  onReplay,
}: {
  burstKey: number
  reducedMotion: boolean
  onReplay: () => void
}) {
  useBodyScrollLock(true)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onReplay()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onReplay])

  const sparks = [8, 18, 30, 44, 58, 70, 82, 22, 76, 50, 36, 64]

  return createPortal(
    <div className="finale" role="dialog" aria-modal="true" aria-labelledby="finale-title">
      <div className="sparkles" aria-hidden="true">
        {sparks.map((left, index) => (
          <span
            key={left}
            className="sparkle"
            style={cssVars({
              '--l': `${left}%`,
              '--t': `${12 + ((index * 17) % 48)}%`,
              '--d': `${index * 0.12}s`,
            })}
          />
        ))}
      </div>
      <div className={`finale-heart ${reducedMotion ? 'is-still' : ''}`} aria-hidden="true">
        <HeartGlyph />
      </div>
      <div className="finale-card">
        <img className="finale-photo" src={photo} alt="Trưởng và Dĩm nắm tay" />
        <Sparkles className="sparkle-icon" aria-hidden="true" />
        <h3 id="finale-title">{finalLines[0]}</h3>
        <p>{finalLines[1]}</p>
        <p>{finalLines[2]}</p>
        <CuteButton onClick={onReplay}>Xem lại món quà từ đầu</CuteButton>
      </div>
      <ConfettiBurst burstKey={burstKey} count={64} />
    </div>,
    document.body,
  )
}
