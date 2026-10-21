import { useEffect } from 'react'
import ProgramHero from '../sections/program/ProgramHero.jsx'
import ProgramSteps from '../sections/program/ProgramSteps.jsx'
import Faq from '../sections/pricing/Faq.jsx'

const PROGRAM_FAQ = [
  {
    q: 'Is the Gen5 camera really free?',
    a: 'Yes. While you meet the program target, the camera and your Content Studio subscription are free, and you get 50 AI credits every month. We keep a card on file in case the camera is not returned when the partnership ends; nothing is charged.',
  },
  {
    q: 'Who can apply?',
    a: 'Real estate photographers and media providers working in the United States or Canada. We check every application and call you before anything is set up.',
  },
  {
    q: 'What counts as an active subscription?',
    a: 'An agent who joined Giraffe360 through your partner link and has a paid, active plan. Suspended or cancelled subscriptions do not count toward the 20.',
  },
  {
    q: 'What happens if I drop below 20?',
    a: 'After the first 6 months we check every quarter. If you fall below 20 active subscriptions, you have up to 3 months to recover before the partnership ends.',
  },
]

export default function PhotographerProgram() {
  useEffect(() => {
    document.body.classList.add('page--darkHero')
    return () => document.body.classList.remove('page--darkHero')
  }, [])

  return (
    <div className="programPage">
      <ProgramHero />
      <ProgramSteps />
      <Faq title="Program questions" items={PROGRAM_FAQ} compact />
    </div>
  )
}
