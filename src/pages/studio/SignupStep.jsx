import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { StudioBar } from '../../layouts/StudioLayout.jsx'
import StepFrame from '../../components/studio/StepFrame.jsx'
import StudioField, { FloatInput } from '../../components/studio/StudioField.jsx'
import RadioList from '../../components/studio/RadioList.jsx'
import { useProgram } from '../../context/ProgramContext.jsx'
import { COUNTRIES, HEARD_ABOUT, INDUSTRIES } from '../../context/programDefaults.js'
import './SignupStep.css'

const TITLES = [
  'How should we call you?',
  'Which best describes your industry?',
  'Where did you hear about us?',
  'Set up your workspace',
  'Invite coworkers to join',
]

const NOTE = 'Filled in from the application'
const flagFor = (country) => (country === 'Canada' ? '🇨🇦' : '🇺🇸')

/* Figma "Sign-up" steps 1–5 (2032:1883 … 2032:2012). Known answers are prefilled from the
   application. One component per step, keyed by step so local state resets on navigation. */
export default function SignupStep() {
  const { n } = useParams()
  const step = Number(n)
  if (!(step >= 1 && step <= 5)) return <Navigate to="/signup/step/1" replace />
  return <Step key={step} step={step} />
}

function Step({ step }) {
  const navigate = useNavigate()
  const { profile, signup, updateApplication, updateSignup } = useProgram()

  const [first, setFirst] = useState(profile.firstName)
  const [last, setLast] = useState(profile.lastName)
  const [industry, setIndustry] = useState(profile.industry)
  const [heard, setHeard] = useState(signup.heardAbout)
  const [org, setOrg] = useState(signup.orgName || `${profile.lastName} Photography`.trim())
  const [country, setCountry] = useState(signup.country || profile.country)
  const [phone, setPhone] = useState(signup.phone || profile.phone)
  const [invites, setInvites] = useState(signup.invites)
  const [errors, setErrors] = useState({})

  const go = (next) => navigate(next < 6 ? `/signup/step/${next}` : '/studio/organisation/photographer-program')

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (step === 1) {
      if (!first.trim()) errs.first = 'Enter your first name.'
      if (!last.trim()) errs.last = 'Enter your last name.'
    }
    if (step === 2 && !industry) errs.industry = 'Pick the option that fits best.'
    if (step === 3 && !heard) errs.heard = 'Pick one option.'
    if (step === 4) {
      if (!org.trim()) errs.org = 'Enter your organisation name.'
      if (!phone.trim()) errs.phone = 'Enter your phone number.'
    }
    setErrors(errs)
    if (Object.keys(errs).length) return

    if (step === 1) updateApplication({ firstName: first.trim(), lastName: last.trim() })
    if (step === 2) updateApplication({ industry })
    if (step === 3) updateSignup({ heardAbout: heard })
    if (step === 4) updateSignup({ orgName: org.trim(), country, phone: phone.trim() })
    if (step === 5) updateSignup({ invites: invites.trim() })
    go(step + 1)
  }

  const prefilled = step === 1 ? Boolean(first || last) : step === 2 ? Boolean(industry) : step === 4

  return (
    <>
      <StudioBar />
      <StepFrame
        step={step}
        title={TITLES[step - 1]}
        intro={step === 1 ? 'Your camera is ordered. A few details to set up your Content Studio workspace.' : undefined}
        onSubmit={onSubmit}
        nextLabel={step === 5 && !invites.trim() ? 'Skip' : 'Next'}
      >
        {step === 1 && (
          <>
            <StudioField id="first" error={errors.first}>
              <FloatInput id="first"  label="First name" autoComplete="given-name" value={first} onChange={(e) => setFirst(e.target.value)} />
            </StudioField>
            <StudioField id="last" error={errors.last} note={prefilled ? NOTE : undefined}>
              <FloatInput id="last"  label="Last name" autoComplete="family-name" value={last} onChange={(e) => setLast(e.target.value)} />
            </StudioField>
          </>
        )}

        {step === 2 && (
          <StudioField error={errors.industry} note={prefilled ? NOTE : undefined}>
            <RadioList name="industry" options={INDUSTRIES} value={industry} onChange={setIndustry} />
          </StudioField>
        )}

        {step === 3 && (
          <StudioField error={errors.heard}>
            <RadioList name="heard" options={HEARD_ABOUT} value={heard} onChange={setHeard} />
          </StudioField>
        )}

        {step === 4 && (
          <>
            <StudioField id="org" helper="Usually your company or team name" error={errors.org} note="Suggested from your application – you can change it">
              <FloatInput id="org"  label="Organisation name" autoComplete="organization" value={org} onChange={(e) => setOrg(e.target.value)} />
            </StudioField>
            <StudioField id="country">
              <div className="st-selectWrap">
                <span className="st-selectWrap__label">Country</span>
                <select id="country" className="st-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </StudioField>
            <StudioField id="phone" error={errors.phone} note="Country and phone filled in from the application">
              <div className="st-phone">
                <span className="st-phone__prefix">
                  <span aria-hidden="true">{flagFor(country)}</span>
                  +1
                </span>
                <FloatInput id="phone"  type="tel" label="Phone number" autoComplete="tel-national" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </StudioField>
          </>
        )}

        {step === 5 && (
          <StudioField id="invites">
            <FloatInput id="invites"  label="Email, comma seperated" value={invites} onChange={(e) => setInvites(e.target.value)} />
          </StudioField>
        )}
      </StepFrame>
    </>
  )
}
