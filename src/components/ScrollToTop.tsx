import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useGift } from '../context/GiftProvider'

export function ScrollToTop() {
  const { reducedMotion } = useGift()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      className="to-top"
      aria-label="Lên đầu trang"
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
    >
      <ChevronUp size={22} aria-hidden="true" />
    </button>
  )
}
