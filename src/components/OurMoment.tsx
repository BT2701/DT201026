import { useState } from 'react'
import photo from '../assets/holding-hands.jpg'
import { momentHint, momentNote, momentTitle } from '../data/content'
import { useGift } from '../context/GiftProvider'
import { Section } from './Section'

export function OurMoment() {
  const { play } = useGift()
  const [held, setHeld] = useState(false)

  function hold() {
    setHeld((current) => !current)
    play('chime')
  }

  return (
    <Section id="khoanh-khac" eyebrow="Một tấm ảnh thật" title={momentTitle}>
      <div className="moment">
        <button
          type="button"
          className={`polaroid ${held ? 'is-held' : ''}`}
          onClick={hold}
          aria-pressed={held}
        >
          <span className="tape" aria-hidden="true" />
          <img
            src={photo}
            alt="Trưởng và Dĩm nắm tay. Dĩm đeo vòng hạt xanh, Trưởng đeo vòng hạt gỗ."
          />
          <span className="polaroid-caption">Trưởng ♡ Dĩm</span>
          {held ? (
            <span className="photo-sticker" aria-hidden="true">
              💗
            </span>
          ) : null}
        </button>
        <p className="moment-note">{held ? momentNote : momentHint}</p>
      </div>
    </Section>
  )
}
