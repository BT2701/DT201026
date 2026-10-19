import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { playSound, type SoundKind } from '../audio/sounds'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type GiftContextValue = {
  started: boolean
  introKey: number
  enterWorld: () => void
  replay: () => void
  soundOn: boolean
  toggleSound: () => void
  play: (kind: SoundKind) => void
  hearts: number
  addHeart: () => void
  reducedMotion: boolean
}

const GiftContext = createContext<GiftContextValue | null>(null)

export function GiftProvider({ children }: { children: ReactNode }) {
  const [started, setStarted] = useState(false)
  const [introKey, setIntroKey] = useState(0)
  const [soundOn, setSoundOn] = useState(true)
  const [hearts, setHearts] = useState(0)
  const reducedMotion = usePrefersReducedMotion()
  const soundRef = useRef(soundOn)
  soundRef.current = soundOn

  const play = useCallback((kind: SoundKind) => {
    void playSound(kind, soundRef.current)
  }, [])

  const enterWorld = useCallback(() => {
    setStarted(true)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const replay = useCallback(() => {
    setStarted(false)
    setIntroKey((key) => key + 1)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      const next = !on
      if (next) void playSound('chime', true)
      return next
    })
  }, [])

  const addHeart = useCallback(() => {
    setHearts((count) => count + 1)
  }, [])

  const value = useMemo(
    () => ({
      started,
      introKey,
      enterWorld,
      replay,
      soundOn,
      toggleSound,
      play,
      hearts,
      addHeart,
      reducedMotion,
    }),
    [
      started,
      introKey,
      enterWorld,
      replay,
      soundOn,
      toggleSound,
      play,
      hearts,
      addHeart,
      reducedMotion,
    ],
  )

  return <GiftContext.Provider value={value}>{children}</GiftContext.Provider>
}

export function useGift(): GiftContextValue {
  const context = useContext(GiftContext)
  if (!context) throw new Error('useGift must be used within GiftProvider')
  return context
}
