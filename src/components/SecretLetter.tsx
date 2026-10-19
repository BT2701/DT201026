import { useEffect, useState } from 'react'
import { letterLines, letterSignature } from '../data/content'
import { useGift } from '../context/GiftProvider'
import { CuteButton } from './CuteButton'
import { Section } from './Section'

export function SecretLetter() {
  const { play, reducedMotion } = useGift()
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!open) return
    if (reducedMotion) {
      setShown(letterLines.length)
      return
    }
    setShown(1)
    const timer = window.setInterval(() => {
      setShown((count) => {
        if (count >= letterLines.length) {
          window.clearInterval(timer)
          return count
        }
        return count + 1
      })
    }, 420)
    return () => window.clearInterval(timer)
  }, [open, reducedMotion])

  function openLetter() {
    if (open) return
    setOpen(true)
    play('open')
  }

  function closeLetter() {
    setOpen(false)
    setShown(0)
    play('tap')
  }

  return (
    <Section id="thu" eyebrow="Chương 4 · Lá thư" title="Có một lá thư Trưởng giấu Dĩm ở đây...">
      <div className={`letter-scene ${open ? 'is-open' : ''}`}>
        <button
          type="button"
          className={`envelope ${open ? 'is-open' : ''}`}
          onClick={openLetter}
          aria-expanded={open}
          aria-label={open ? 'Phong bì đã mở' : 'Mở phong bì'}
          disabled={open}
        >
          <span className="flap" />
          <span className="pocket" />
          <span className="seal" aria-hidden="true">
            ♥
          </span>
        </button>
        {open ? (
          <article className="letter-sheet">
            {letterLines.slice(0, shown).map((line) => (
              <p key={line} className="letter-line">
                {line}
              </p>
            ))}
            {shown >= letterLines.length ? <p className="signature">{letterSignature}</p> : null}
            <CuteButton tone="soft" onClick={closeLetter}>
              Gấp thư lại
            </CuteButton>
          </article>
        ) : (
          <p className="hint">Chạm vào phong bì để mở thư nha.</p>
        )}
      </div>
    </Section>
  )
}
