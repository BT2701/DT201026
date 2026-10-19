import { AnimatePresence, motion } from 'framer-motion'
import { DateIdeas } from './components/DateIdeas'
import { FinalSurprise } from './components/FinalSurprise'
import { FloatingHearts } from './components/FloatingHearts'
import { GiftIntro } from './components/GiftIntro'
import { HeartCounter } from './components/HeartCounter'
import { HeartMiniGame } from './components/HeartMiniGame'
import { LoveMessage } from './components/LoveMessage'
import { OurMoment } from './components/OurMoment'
import { LoveSlider } from './components/LoveSlider'
import { ScrollToTop } from './components/ScrollToTop'
import { SecretLetter } from './components/SecretLetter'
import { SiteHeader } from './components/SiteHeader'
import { SoundToggle } from './components/SoundToggle'
import { GiftProvider, useGift } from './context/GiftProvider'
function Shell() {
  const { started, introKey, reducedMotion } = useGift()
  const transition = { duration: reducedMotion ? 0 : 0.45 }

  return (
    <>
      <div className="sky" aria-hidden="true" />
      <FloatingHearts />
      <SoundToggle />
      <AnimatePresence mode="wait">
        {started ? (
          <motion.div
            key="world"
            className="world"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <SiteHeader />
            <main>
              <HeartCounter />
              <LoveMessage />
              <OurMoment />
              <HeartMiniGame />
              <LoveSlider />
              <SecretLetter />
              <DateIdeas />
              <FinalSurprise />
            </main>
            <footer className="footer">
              <p>Một thế giới nhỏ làm riêng cho ngày 20/10</p>
              <p className="signature">Trưởng ♡ Dĩm</p>
            </footer>
            <ScrollToTop />
          </motion.div>
        ) : (
          <motion.div
            key={`intro-${introKey}`}
            className="intro"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <GiftIntro />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <GiftProvider>
      <Shell />
    </GiftProvider>
  )
}
