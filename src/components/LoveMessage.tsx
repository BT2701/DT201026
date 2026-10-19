import { useEffect, useRef, useState } from 'react'
import { hugMessage, wishParagraphs, wishTitle } from '../data/content'
import { useGift } from '../context/GiftProvider'
import { CuteButton } from './CuteButton'
import { HeartGlyph } from './HeartGlyph'
import { Section } from './Section'

export function LoveMessage() {
  const { play, reducedMotion } = useGift()
  const [paraIndex, setParaIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [hugging, setHugging] = useState(false)
  const hugTimer = useRef<number | null>(null)

  const text = wishParagraphs[paraIndex] ?? ''
  const paragraphDone = charCount >= text.length
  const finished = showAll || (paragraphDone && paraIndex >= wishParagraphs.length - 1)

  useEffect(() => {
    if (showAll || paragraphDone) return
    const timeout = window.setTimeout(
      () => {
        setCharCount((count) => count + (reducedMotion ? text.length || 1 : 1))
      },
      reducedMotion ? 0 : 22,
    )
    return () => window.clearTimeout(timeout)
  }, [showAll, paragraphDone, charCount, reducedMotion, text.length])

  useEffect(() => {
    return () => {
      if (hugTimer.current !== null) window.clearTimeout(hugTimer.current)
    }
  }, [])

  function readNext() {
    if (!paragraphDone) {
      setCharCount(text.length)
      return
    }
    if (paraIndex < wishParagraphs.length - 1) {
      setParaIndex((index) => index + 1)
      setCharCount(0)
    }
  }

  function onHug() {
    play('chime')
    if (hugTimer.current !== null) window.clearTimeout(hugTimer.current)
    if (hugging) {
      setHugging(false)
      hugTimer.current = window.setTimeout(() => setHugging(true), reducedMotion ? 0 : 50)
      return
    }
    setHugging(true)
  }

  return (
    <Section id="loi-chuc" eyebrow="Chương 1 · Lời chúc" title={wishTitle}>
      <div className="card prose">
        {wishParagraphs.map((paragraph, index) => {
          if (showAll || index < paraIndex) return <p key={paragraph}>{paragraph}</p>
          if (index === paraIndex) {
            return (
              <p key={paragraph}>
                {paragraph.slice(0, charCount)}
                {!paragraphDone ? <span className="caret" aria-hidden="true" /> : null}
              </p>
            )
          }
          return null
        })}
        {finished ? null : (
          <div className="actions">
            <CuteButton tone="soft" onClick={readNext}>
              Đọc tiếp
            </CuteButton>
            <CuteButton tone="soft" onClick={() => setShowAll(true)}>
              Hiện tất cả
            </CuteButton>
          </div>
        )}
      </div>
      <div className="card hug-card">
        <h3>Một cái ôm gửi qua màn hình</h3>
        <div className={`hug-stage ${hugging ? 'is-hugging' : ''}`}>
          <Chibi name="Trưởng" tone="truong" />
          {hugging ? (
            <div className="hug-pop" aria-hidden="true">
              <HeartGlyph />
              <HeartGlyph />
              <HeartGlyph />
            </div>
          ) : null}
          <Chibi name="Dĩm" tone="dim" />
        </div>
        <div className="actions center">
          <CuteButton onClick={onHug}>Ôm Trưởng một cái nè 🧸</CuteButton>
        </div>
        {hugging ? (
          <p className="hug-note" role="status">
            {hugMessage}
          </p>
        ) : null}
      </div>
    </Section>
  )
}

function Chibi({ name, tone }: { name: string; tone: 'truong' | 'dim' }) {
  return (
    <div className={`chibi chibi-${tone}`}>
      <div className="chibi-hair" />
      <div className="chibi-head">
        {tone === 'dim' ? <span className="mini-bow" /> : null}
        <span className="eye e1" />
        <span className="eye e2" />
        <span className="blush bl" />
        <span className="blush br" />
        <span className="smile" />
      </div>
      <div className="chibi-body" />
      <span className="chibi-arm" />
      <p className="chibi-name">{name}</p>
    </div>
  )
}
