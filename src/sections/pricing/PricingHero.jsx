import { useState } from 'react'
import { CheckSmall } from '../../components/icons/index.jsx'
import './PricingHero.css'

const PLANS = [
  {
    id: 'studio',
    title: 'Content Studio',
    desc: 'For those who manage and sell properties',
    quarterly: 150,
    features: ['Content Studio', 'Unlimited projects', '50 AI credits included each month'],
    cta: 'Order now',
    ctaVariant: 'secondary',
    variant: 'white',
  },
  {
    id: 'pro',
    title: 'PRO Camera & Content Studio',
    desc: 'For creating high-quality, versatile property media via repeatable workflows',
    quarterly: 360,
    features: [
      'PRO Camera',
      'Auto-height tripod & field kit',
      'Content Studio',
      'Unlimited projects',
      '50 AI credits included each month',
    ],
    cta: 'Order now',
    ctaVariant: 'dark',
    variant: 'highlight',
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    desc: 'For businesses with custom needs, multiple teams, large project volumes, or regional rollout requirements',
    price: null,
    cta: 'Book a call',
    ctaVariant: 'secondary',
    variant: 'white',
    enterprise: true,
  },
]

function Feature({ children }) {
  return (
    <div className="planCard__feature">
      <span className="planCard__check">
        <CheckSmall size={18} />
      </span>
      <span className="planCard__featureText">{children}</span>
    </div>
  )
}

function PlanCard({ plan, annual }) {
  const price = plan.price === null ? null : annual ? Math.round(plan.quarterly * 0.7) : plan.quarterly
  return (
    <div className={`planCard planCard--${plan.variant}${plan.enterprise ? ' planCard--enterprise' : ''}`}>
      <div className="planCard__head">
        <div className="planCard__intro">
          <h3 className="planCard__title">{plan.title}</h3>
          <p className="planCard__desc">{plan.desc}</p>
        </div>
        {price !== null && (
          <p className="planCard__price">
            <span className="planCard__priceValue">${price}</span>
            <span className="planCard__priceUnit">/ month</span>
          </p>
        )}
      </div>

      {plan.features && (
        <div className="planCard__features">
          {plan.features.map((f) => (
            <Feature key={f}>{f}</Feature>
          ))}
        </div>
      )}

      <button className={`btn btn--${plan.ctaVariant} planCard__cta`} type="button">
        {plan.cta}
      </button>
    </div>
  )
}

export default function PricingHero() {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="pricingHero">
      <div className="pricingToggle" role="tablist">
        <button
          className={`pricingToggle__opt${!annual ? ' is-active' : ''}`}
          type="button"
          onClick={() => setAnnual(false)}
        >
          Billed quarterly
        </button>
        <button
          className={`pricingToggle__opt${annual ? ' is-active' : ''}`}
          type="button"
          onClick={() => setAnnual(true)}
        >
          Billed annually
          <span className="pricingToggle__badge">save 30%</span>
        </button>
      </div>

      <div className="pricingHero__cards">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} annual={annual} />
        ))}
      </div>
    </section>
  )
}
