import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Piece = {
  id: number
  left: number
  delay: number
  duration: number
  color: string
  size: number
  round: boolean
}

const COLORS = ['#FF5C8A', '#FFB6C9', '#DCD6FF', '#FFF8F0', '#FFD1E0', '#B9A8FF']

type ConfettiBurstProps = {
  burstKey: number
  count?: number
}

export function ConfettiBurst({ burstKey, count = 46 }: ConfettiBurstProps) {
  const reduced = usePrefersReducedMotion()
  const [pieces, setPieces] = useState<Piece[]>([])

  useEffect(() => {
    if (burstKey === 0 || reduced) return
    const next: Piece[] = Array.from({ length: count }, (_, id) => ({
      id,
      left: Math.random() * 100,
      delay: Math.random() * 0.28,
      duration: 1.5 + Math.random() * 1.15,
      color: COLORS[id % COLORS.length] ?? '#FF5C8A',
      size: 7 + Math.random() * 8,
      round: id % 3 === 0,
    }))
    setPieces(next)
    const timeout = window.setTimeout(() => setPieces([]), 2800)
    return () => window.clearTimeout(timeout)
  }, [burstKey, count, reduced])

  if (pieces.length === 0) return null

  return createPortal(
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={`${burstKey}-${piece.id}`}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.round ? piece.size : piece.size * 1.5,
            background: piece.color,
            borderRadius: piece.round ? '50%' : '2px',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}
    </div>,
    document.body,
  )
}
