export type SoundKind = 'tap' | 'open' | 'chime' | 'success'

let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const extended = window as Window & { webkitAudioContext?: typeof AudioContext }
  const AudioCtor = window.AudioContext ?? extended.webkitAudioContext
  if (!AudioCtor) return null
  if (!audioContext) audioContext = new AudioCtor()
  return audioContext
}

function tone(
  audio: AudioContext,
  frequency: number,
  when: number,
  duration: number,
  volume: number,
): void {
  const oscillator = audio.createOscillator()
  const gain = audio.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(frequency, when)
  gain.gain.setValueAtTime(0.0001, when)
  gain.gain.exponentialRampToValueAtTime(volume, when + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration)
  oscillator.connect(gain)
  gain.connect(audio.destination)
  oscillator.start(when)
  oscillator.stop(when + duration + 0.02)
}

export async function playSound(kind: SoundKind, enabled: boolean): Promise<void> {
  if (!enabled) return
  try {
    const audio = getAudioContext()
    if (!audio) return
    if (audio.state === 'suspended') await audio.resume()
    const now = audio.currentTime
    if (kind === 'tap') {
      tone(audio, 640, now, 0.08, 0.025)
      return
    }
    if (kind === 'open') {
      tone(audio, 523, now, 0.16, 0.035)
      tone(audio, 659, now + 0.09, 0.18, 0.035)
      tone(audio, 784, now + 0.18, 0.26, 0.04)
      return
    }
    if (kind === 'chime') {
      tone(audio, 880, now, 0.16, 0.03)
      tone(audio, 1175, now + 0.08, 0.2, 0.028)
      return
    }
    tone(audio, 523, now, 0.18, 0.035)
    tone(audio, 659, now + 0.1, 0.2, 0.035)
    tone(audio, 784, now + 0.2, 0.28, 0.04)
  } catch {
    // Âm thanh chỉ là phần điểm xuyết, trang vẫn dùng được nếu trình duyệt chặn audio.
  }
}
