import { Link } from 'react-router-dom'
import { useProgram } from '../context/ProgramContext.jsx'
import { fmtDate } from '../context/programDefaults.js'
import { ArrowBack } from '../components/icons/index.jsx'
import './ApprovalEmail.css'

/* Prototype-only: the approval email customer support sends after the call. */
export default function ApprovalEmail() {
  const { profile } = useProgram()
  const loginHref = `/signup/login?email=${encodeURIComponent(profile.email)}`

  return (
    <div className="email">
      <Link to="/photographer-program" className="email__back">
        <ArrowBack size={20} />
        Back to site
      </Link>

      <p className="email__proto">Prototype · This is the email the photographer receives after approval</p>

      <article className="email__frame">
        <header className="email__meta">
          <div className="email__metaRow">
            <span className="email__metaLabel">From</span>
            <span>Giraffe360 &lt;partners@giraffe360.com&gt;</span>
          </div>
          <div className="email__metaRow">
            <span className="email__metaLabel">To</span>
            <span>{profile.email}</span>
          </div>
          <div className="email__metaRow">
            <span className="email__metaLabel">Subject</span>
            <span className="email__subject">You're approved! Order your free Gen5 camera</span>
          </div>
        </header>

        <div className="email__body">
          <img className="email__logo" src="/assets/logo-giraffe360.svg" alt="Giraffe360" width={91} height={12} />
          <h1 className="email__title">Welcome to the program, {profile.firstName}!</h1>
          <p>Log in or sign up with this email. Then add:</p>
          <ol className="email__list">
            <li>Your card. Nothing is charged.</li>
            <li>Your delivery and billing address</li>
          </ol>
          <p>
            When you submit, your camera ships and your partner link goes live. Your 6 months
            start that day.
          </p>
          <Link to={loginHref} className="btn btn--primary email__cta">Complete sign-up</Link>
          <p className="email__fine">This link works once and is valid until {fmtDate(profile.linkExpiry)}.</p>
        </div>
      </article>
    </div>
  )
}
