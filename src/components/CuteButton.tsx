import type { ButtonHTMLAttributes } from 'react'

type CuteButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: 'solid' | 'soft'
}

export function CuteButton({
  tone = 'solid',
  className = '',
  type = 'button',
  ...props
}: CuteButtonProps) {
  return <button type={type} className={`cute-btn ${tone} ${className}`.trim()} {...props} />
}
