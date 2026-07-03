import { useState } from 'react'
import './Faq.css'

const ITEMS = [
  {
    q: 'What is included?',
    a: 'The base plan includes the PRO Camera, auto-height tripod, cables, carrying bag, and other accessories, as well as full access to the Content Studio, core listing media outputs, free hosting, monthly AI credits, onboarding, and ongoing support.',
  },
  {
    q: 'Will I get help getting started?',
    a: 'Yes — onboarding and training are included, and our support team is available whenever you need help getting the most out of Giraffe360.',
  },
  {
    q: 'Are there extra project creation or hosting fees?',
    a: 'No. Unlimited projects and free hosting are included in your plan, so there are no per-project or hosting fees.',
  },
  {
    q: 'Is there a large upfront hardware cost?',
    a: 'No. The PRO Camera and field kit are included in your subscription, so there is no major upfront hardware investment.',
  },
  {
    q: 'What happens if Giraffe360 is not right for me?',
    a: 'You can cancel and return the equipment — talk to our team and we will make the process straightforward.',
  },
]

function PlusMinus({ open }) {
  return (
    <svg className="faq__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" />
      {!open && <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" />}
    </svg>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="faq">
      <h2 className="faq__title">Frequently asked questions</h2>
      <div className="faq__list">
        {ITEMS.map((item, i) => {
          const isOpen = open === i
          return (
            <div className={`faq__item${i === ITEMS.length - 1 ? ' faq__item--last' : ''}`} key={item.q}>
              <button
                className="faq__q"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="faq__question">{item.q}</span>
                <PlusMinus open={isOpen} />
              </button>
              <div className={`faq__answer${isOpen ? ' is-open' : ''}`}>
                <div className="faq__answerInner">{item.a}</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
