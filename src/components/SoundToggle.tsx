import { Volume2, VolumeX } from 'lucide-react'
import { useGift } from '../context/GiftProvider'

export function SoundToggle() {
  const { soundOn, toggleSound } = useGift()

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={toggleSound}
      aria-pressed={soundOn}
      aria-label={soundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
    >
      {soundOn ? <Volume2 size={22} aria-hidden="true" /> : <VolumeX size={22} aria-hidden="true" />}
    </button>
  )
}
