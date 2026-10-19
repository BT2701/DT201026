import { useState } from 'react'
import { dateIdeas, type DateIdeaId } from '../data/content'
import { cssVars } from '../lib/cssVars'
import { useGift } from '../context/GiftProvider'
import { HeartGlyph } from './HeartGlyph'
import { Section } from './Section'

type EffectState = {
  id: DateIdeaId
  nonce: number
}

export function DateIdeas() {
  const { play } = useGift()
  const [fx, setFx] = useState<EffectState | null>(null)

  function playIdea(id: DateIdeaId) {
    setFx((current) => ({
      id,
      nonce: current?.id === id ? current.nonce + 1 : 1,
    }))
    play('chime')
  }

  return (
    <Section id="hen-ho" eyebrow="Chương 5 · Những điều dễ thương" title="Những điều Trưởng muốn làm cùng Dĩm">
      <div className="idea-grid">
        {dateIdeas.map((idea) => {
          const active = fx?.id === idea.id
          return (
            <button
              key={idea.id}
              type="button"
              className={`card idea-card ${active ? 'is-on' : ''}`}
              onClick={() => playIdea(idea.id)}
              aria-pressed={active}
            >
              <div className="idea-art">
                {idea.id === 'flowers' ? <Flowers active={active} nonce={fx?.nonce ?? 0} /> : null}
                {idea.id === 'cake' ? <Cake active={active} nonce={fx?.nonce ?? 0} /> : null}
                {idea.id === 'hug' ? <Bear active={active} nonce={fx?.nonce ?? 0} /> : null}
                {idea.id === 'night' ? <NightSky active={active} nonce={fx?.nonce ?? 0} /> : null}
              </div>
              <h3>{idea.title}</h3>
              <p className="muted">{idea.tease}</p>
              {active ? <p className="idea-result">{idea.result}</p> : null}
            </button>
          )
        })}
      </div>
    </Section>
  )
}

function Flowers({ active, nonce }: { active: boolean; nonce: number }) {
  return (
    <div key={nonce} className={`bloom ${active ? 'is-open' : ''}`} aria-hidden="true">
      <span className="stem" />
      {Array.from({ length: 6 }, (_, index) => (
        <span key={index} className="petal" style={cssVars({ '--a': `${index * 60}deg` })} />
      ))}
      <span className="bloom-core" />
    </div>
  )
}

function Cake({ active, nonce }: { active: boolean; nonce: number }) {
  return (
    <div key={nonce} className={`cake ${active ? 'is-ready' : ''}`} aria-hidden="true">
      <span className="cherry" />
      <span className="frost" />
      <span className="sponge" />
      <span className="plate" />
    </div>
  )
}

function Bear({ active, nonce }: { active: boolean; nonce: number }) {
  return (
    <div key={nonce} className={`bear ${active ? 'is-hugging' : ''}`} aria-hidden="true">
      <span className="ear left" />
      <span className="ear right" />
      <span className="bear-head" />
      <span className="bear-body" />
      <span className="bear-heart">
        <HeartGlyph />
      </span>
    </div>
  )
}

function NightSky({ active, nonce }: { active: boolean; nonce: number }) {
  const stars = [
    [12, 22],
    [28, 48],
    [46, 18],
    [63, 40],
    [78, 16],
    [18, 70],
    [40, 62],
    [70, 68],
    [86, 48],
    [54, 34],
  ]
  return (
    <div key={nonce} className={`night ${active ? 'is-night' : ''}`} aria-hidden="true">
      <span className="moon" />
      {active
        ? stars.map(([left, top], index) => (
            <span
              key={`${nonce}-${index}`}
              className="star"
              style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${index * 0.12}s` }}
            />
          ))
        : null}
    </div>
  )
}
