import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StudioBar } from '../../layouts/StudioLayout.jsx'
import StepFrame from '../../components/studio/StepFrame.jsx'
import StudioField, { FloatInput } from '../../components/studio/StudioField.jsx'
import { useProgram } from '../../context/ProgramContext.jsx'

/* The only onboarding step for a new customer after the camera order: name the workspace.
   Everything else is already known from the application and editable later in settings. */
export default function Workspace() {
  const navigate = useNavigate()
  const { profile, signup, updateSignup } = useProgram()
  const [org, setOrg] = useState(signup.orgName || `${profile.lastName} Photography`.trim())
  const [error, setError] = useState('')


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
      </StepFrame>
    </>
  )
}
