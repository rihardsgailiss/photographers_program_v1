import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StudioBar } from '../../layouts/StudioLayout.jsx'
import StepFrame from '../../components/studio/StepFrame.jsx'
import StudioField, { FloatInput } from '../../components/studio/StudioField.jsx'
import { useProgram } from '../../context/ProgramContext.jsx'
import './Workspace.css'

/* The only onboarding step for a new customer after the camera order: name the workspace.
   Everything else (name, contact details, industry) is already known from the application. */
export default function Workspace() {
  const navigate = useNavigate()
  const { profile, signup, updateSignup } = useProgram()
  const [org, setOrg] = useState(signup.orgName || `${profile.lastName} Photography`.trim())
  const [error, setError] = useState('')

  const known = [
    ['Name', profile.fullName],
    ['Email', profile.email],
    ['Phone', profile.phone],
    ['Country', profile.country],
    ['Industry', profile.industry],
  ]

  const onSubmit = (e) => {
    e.preventDefault()
    if (!org.trim()) {
      setError('Enter a name for your workspace.')
      return
    }
    updateSignup({ orgName: org.trim(), country: profile.country, phone: profile.phone })
    navigate('/studio/organisation/photographer-program')
  }

  return (
    <>
      <StudioBar />
      <StepFrame
        eyebrow="One last thing"
        title="Name your workspace"
        intro="Your camera is ordered. Give your Content Studio workspace a name and you're in."
        onSubmit={onSubmit}
        nextLabel="Enter Content Studio"
      >
        <StudioField
          id="org"
          helper="Usually your company or team name"
          error={error}
          note="Suggested from your application – you can change it"
        >
          <FloatInput
            id="org"
            label="Organisation name"
            autoComplete="organization"
            value={org}
            onChange={(e) => {
              setOrg(e.target.value)
              if (error) setError('')
            }}
          />
        </StudioField>

        <div className="workspace__known">
          <p className="workspace__knownTitle">Already set up from your application</p>
          <dl className="workspace__list">
            {known.map(([k, v]) => (
              <div className="workspace__row" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="st-small">You can change any of these later in your settings.</p>
        </div>
      </StepFrame>
    </>
  )
}
