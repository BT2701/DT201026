import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useGift } from '../context/GiftProvider'

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, children }: SectionProps) {
  const { reducedMotion } = useGift()

  return (
    <motion.section
      id={id}
      className="section"
      initial={reducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: reducedMotion ? 0 : 0.55 }}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {children}
    </motion.section>
  )
}
