import ApplicationForm from '../../components/ApplicationForm.jsx'
import { Check } from '../../components/icons/index.jsx'
import './ProgramHero.css'

const FACTS = ['Free Gen5 camera and subscription', '50 AI credits every month', 'United States and Canada']

export default function ProgramHero() {
  return (
    <section className="programHero">
      <div className="programHero__inner">
        <div className="programHero__copy">
          <p className="programHero__eyebrow">Partner program for photographers</p>
          <h1 className="programHero__heading">
            <span className="programHero__reveal">Get a free Gen5 camera. Grow with your agents.</span>
          </h1>
          <p className="programHero__sub">
            Apply below. We check every application and call you. If you're approved, you get a
            personal sign-up link for your camera.
          </p>
          <ul className="programHero__facts">
            {FACTS.map((f) => (
              <li key={f}>
                <Check size={18} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="programHero__card">
          <ApplicationForm variant="card" />
        </div>
      </div>
    </section>
  )
}
