import { navLinks } from '../data/content'
import { useGift } from '../context/GiftProvider'
import { HeartGlyph } from './HeartGlyph'

export function SiteHeader() {
  const { hearts } = useGift()

  return (
    <header className="topbar">
      <div className="topbar-row">
        <p className="brand">Trưởng ♡ Dĩm</p>
        <p className="count-pill" aria-label={`Số trái tim Dĩm nhận được từ Trưởng: ${hearts}`}>
          <HeartGlyph />
          <span aria-hidden="true">{hearts}</span>
        </p>
      </div>
      <nav className="nav-scroll" aria-label="Các phần quà">
        {navLinks.map((link) => (
          <a key={link.href} className="nav-link" href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
