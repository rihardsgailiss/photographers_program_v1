import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StudioBar } from '../../layouts/StudioLayout.jsx'
import { useProgram } from '../../context/ProgramContext.jsx'
import useCountdown from '../../hooks/useCountdown.js'
import useCodeInput from '../../hooks/useCodeInput.js'
import './EmailCode.css'

/* Figma "Email verification" (2032:1318). Any 6 digits are accepted in the prototype. */
export default function EmailCode() {
  const navigate = useNavigate()
  const { profile, status, account, setStatus } = useProgram()
  const { left, label, restart } = useCountdown(599)
  const { digits, bind, focusFirst } = useCodeInput(6, () => {
    // Already in the program (camera ordered): plain log-in goes straight to the program page.
    if (status === 'ordered') {
      navigate('/studio/organisation/photographer-program')
      return
    }
    if (account !== 'new') {
      // Existing account (demo or paid): no sign-up steps. Approved applicants go straight to the
      // camera order; everyone else lands in Content Studio.
      if (status === 'submitted') {
        setStatus('loggedIn')
        navigate('/signup/order')
      } else {
        navigate('/studio/projects')
      }
      return
    }
    setStatus('loggedIn')
    navigate('/signup/step/1')
  })

  useEffect(() => {
    focusFirst()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <StudioBar back onBack={() => navigate('/signup/login')} />
      <div className="studioCol code">
        <h1 className="st-h1">Check your email</h1>
        <p className="st-p code__sub">
          We sent you a sign in code to: <strong>{profile.email}</strong>
          <br />
          Paste or type it below to continue.
        </p>

        <div className="code__boxes">
          {digits.map((_, i) => (
            <input key={i} className="st-input code__box" aria-label={`Digit ${i + 1}`} {...bind(i)} />
          ))}
        </div>

        <p className="st-p code__resend">
          {left > 0 ? (
            `Resend code in ${label}`
          ) : (
            <button type="button" className="st-link code__resendBtn" onClick={restart}>
              Resend code
            </button>
          )}
        </p>
        <p className="st-small code__hint">Prototype: any 6 digits work.</p>
      </div>
    </>
  )
}
