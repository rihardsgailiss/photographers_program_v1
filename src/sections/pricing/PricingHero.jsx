import { useState } from 'react'
import { useProgram } from '../../context/ProgramContext.jsx'
import ApplicationForm from '../../components/ApplicationForm.jsx'
import Modal from '../../components/Modal.jsx'
import AudienceToggle from './AudienceToggle.jsx'
import './PricingHero.css'

const PLANS = [
  {
    id: 'studio',
    variant: 'white',
    title: 'Content Studio',
    desc: 'Enhance your property photos & turn them into videos, web, and branded marketing.',
    price: '$85',
    cta: 'Subscribe now',
    ctaVariant: 'dark',
  },
  {
    id: 'plus',
    variant: 'accent',
    title: 'Content Studio Plus',
    desc: 'For teams creating more property marketing, with more capacity.',
    price: '$175',
    cta: 'Subscribe now',
    ctaVariant: 'dark',
  },
  {
    id: 'camera',
    variant: 'white',
    title: 'Content Studio & Camera',
    desc: 'Unlock all immersive contents yourself; photos, floor plans, virtual tours, and 3D videos with Giraffe360 capture.',
    price: '$360',
    cta: 'Subscribe now',
    ctaVariant: 'dark',
    toggle: true,
    /* Photographer program: same plan, $0 for approved partners in the US and Canada */
    program: {
      price: '$0',
      unit: '/ photographers program',
      note: 'Free camera and subscription for approved photographers in the US and Canada.',
      cta: 'Apply',
      ctaSent: 'Request sent',
    },
  },
  {
    id: 'enterprise',
    variant: 'white',
    title: 'Enterprise',
    desc: 'Get help choosing the right plan, or talk to us about an Enterprise subscription tailored to your business.',
    price: null,
    cta: 'Book a call',
    ctaVariant: 'secondary',
  },
]

function BillingToggle() {
  const [annual, setAnnual] = useState(false)
  return (
    <div className="planSwitch" role="tablist" aria-label="Billing period">
      <button
        type="button"
        role="tab"
        aria-selected={!annual}
        className={`planSwitch__opt${!annual ? ' is-active' : ''}`}
        onClick={() => setAnnual(false)}
      >
        Billed monthly
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={annual}
        className={`planSwitch__opt${annual ? ' is-active' : ''}`}
        onClick={() => setAnnual(true)}
      >
        Billed annually
        <span className="planSwitch__badge">save $360</span>
      </button>
    </div>
  )
}

function PlanCard({ plan, photographer, requestSent, onApply, onReset }) {
  const program = photographer && plan.program ? plan.program : null

  const price = program ? program.price : plan.price
  const unit = program ? program.unit : '/ month'
  const cta = program ? (requestSent ? program.ctaSent : program.cta) : plan.cta
  const ctaVariant = program && requestSent ? 'secondary' : plan.ctaVariant

  return (
    <article className={`planCard planCard--${plan.variant}${program ? ' planCard--program' : ''}`}>
      <div className="planCard__title">
        <h3 className="planCard__name">{plan.title}</h3>
        <p className="planCard__desc">{plan.desc}</p>
      </div>

      {plan.toggle && !program && <BillingToggle />}
      {program && <p className="planCard__programNote">{program.note}</p>}

      <div className="planCard__pricing">
        {price && (
          <p className="planCard__price">
            <span className="planCard__priceValue">{price}</span>
            <span className="planCard__priceUnit">{unit}</span>
          </p>
        )}
      </div>

      <button
        type="button"
        className={`planCard__btn planCard__btn--${ctaVariant}`}
        disabled={Boolean(program && requestSent)}
        onClick={program ? onApply : undefined}
      >
        {cta}
      </button>
      {program && requestSent && (
        <button type="button" className="planCard__proto" onClick={onReset}>
          Prototype: reset and apply again
        </button>
      )}
    </article>
  )
}

export default function PricingHero() {
  const { status, reset } = useProgram()
  const [audience, setAudience] = useState('agent')
  const [applyOpen, setApplyOpen] = useState(false)
  const requestSent = status !== 'none'

  return (
    <section className="pricingHero">
      <AudienceToggle value={audience} onChange={setAudience} />

      <div className="pricingHero__cards">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            photographer={audience === 'photographer'}
            requestSent={requestSent}
            onApply={() => setApplyOpen(true)}
            onReset={reset}
          />
        ))}
      </div>

      <Modal open={applyOpen} onClose={() => setApplyOpen(false)} title="Apply to the Photographer program">
        <ApplicationForm variant="modal" title="Apply to the Photographer program" />
      </Modal>
    </section>
  )
}
