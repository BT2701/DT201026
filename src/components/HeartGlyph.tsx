type HeartGlyphProps = {
  className?: string
}

export function HeartGlyph({ className }: HeartGlyphProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.1 20.6c-.2.1-.4.1-.6 0C8.2 18.7 2 14.2 2 8.9 2 6 4.2 4 7 4c1.6 0 3 .7 4 1.9C12 4.7 13.4 4 15 4c2.8 0 5 2 5 4.9 0 5.3-6.2 9.8-7.9 11.7z"
      />
    </svg>
  )
}
