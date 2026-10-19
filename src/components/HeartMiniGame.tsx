import { useState } from 'react'
import { heartNotes } from '../data/content'
import { useGift } from '../context/GiftProvider'
import { ConfettiBurst } from './ConfettiBurst'
import { CuteButton } from './CuteButton'
import { HeartGlyph } from './HeartGlyph'
import { Section } from './Section'

export function HeartMiniGame() {
  const { play } = useGift()
  const [picked, setPicked] = useState<number | null>(null)
  const [burst, setBurst] = useState(0)
  const note = picked === null ? null : heartNotes[picked]

  function choose(index: number) {
    if (picked !== null) return
    setPicked(index)
    setBurst((value) => value + 1)
    play('chime')
  }

  function reset() {
    setPicked(null)
    play('tap')
  }

  return (
    <Section
      id="trai-tim"
      eyebrow="Chương 2 · Trái tim may mắn"
      title="Dĩm chọn một trái tim để nhận lời nhắn bí mật từ Trưởng nhé!"
    >
      <div className="heart-grid">
        {heartNotes.map((message, index) => {
          const selected = picked === index
          const dimmed = picked !== null && !selected
          return (
            <button
              key={message}
              type="button"
              className={`heart-pick ${selected ? 'is-picked' : ''} ${dimmed ? 'is-dim' : ''}`}
              onClick={() => choose(index)}
              disabled={picked !== null}
              aria-label={`Trái tim số ${index + 1}`}
            >
              <HeartGlyph />
            </button>
          )
        })}
      </div>
      {note ? (
        <div className="card note-card" role="status">
          <p className="note-text">{note}</p>
          <CuteButton tone="soft" onClick={reset}>
            Chọn lại
          </CuteButton>
        </div>
      ) : (
        <p className="hint">Sáu trái tim, sáu lời nhắn. Dĩm chọn một cái nha.</p>
      )}
      <ConfettiBurst burstKey={burst} count={24} />
    </Section>
  )
}
