import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StudioBar } from '../../layouts/StudioLayout.jsx'
import GoogleG from '../../components/studio/GoogleG.jsx'
import { FloatInput } from '../../components/studio/StudioField.jsx'
import { useProgram } from '../../context/ProgramContext.jsx'
import { isEmail } from '../../utils/format.js'
import './Login.css'

/* Figma "Welcome page" (2032:1527). Email is prefilled when opened from the sign-up link. */
export default function Login() {
  const [params] = useSearchParams()
  const fromLink = params.get('email') || ''
  const { setEmail } = useProgram()
  const navigate = useNavigate()
  const [email, setValue] = useState(fromLink)
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!isEmail(email)) {
      setError('Enter a valid email address.')
      return
    }
    setEmail(email.trim())
    navigate('/signup/code')
  }

  return (
    <div className="login">
      <div className="login__left">
        <StudioBar />
        <form className="login__form" onSubmit={onSubmit} noValidate>
          <h1 className="st-h1 login__title">
            Welcome to
            <br />
            Content Studio
          </h1>
          <p className="st-p">
            Log in or create an account to try and explore the possibilities of Giraffe360
            ecosystem.
          </p>

          <button type="button" className="st-btn st-btn--outline st-btn--block login__google">
            <GoogleG />
            Continue with Google
          </button>
          <p className="login__or">or</p>

          <div className={`st-field${error ? ' st-field--invalid' : ''}`}>
            <FloatInput
              id="login-email"
              type="email"
              label="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setValue(e.target.value)
                if (error) setError('')
              }}
            />
            {error ? (
              <span className="st-error" role="alert">{error}</span>
            ) : (
              fromLink && <span className="st-helper">Filled in from your sign-up link.</span>
            )}
          </div>

          <button type="submit" className="st-btn st-btn--primary st-btn--block">Continue</button>

          <p className="st-small login__terms">
            By continuing, I agree to the{' '}
            <a className="st-link" href="#" onClick={(e) => e.preventDefault()}>Demo Terms and Conditions</a> and the{' '}
            <a className="st-link" href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          </p>
        </form>
      </div>

      <div className="login__photo" aria-hidden="true">
        <img src="/assets/howitworks-camera.jpg" alt="" />
      </div>
    </div>
  )
}
