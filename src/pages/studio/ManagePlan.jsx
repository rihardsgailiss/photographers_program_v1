import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgram } from '../../context/ProgramContext.jsx'
import { ACCOUNTS, PLANS } from '../../data/plans.js'
import { Check, Close } from '../../components/icons/index.jsx'
import Modal from '../../components/Modal.jsx'
import ApplicationForm from '../../components/ApplicationForm.jsx'
import './ManagePlan.css'

/* Figma "Manage your plan" (5697:9318) plus the website's Agent / Photographer split. Demo
   accounts can only upgrade from here; paid accounts also reach it from the Billing tab. */
const AUDIENCES = [
  { id: 'agent', label: 'Real estate agent' },
  { id: 'photographer', label: 'Photographer' },
]

function Value({ v }) {
  return v === true ? <Check size={16} className="plan__check" /> : <span>{v}</span>
}

function PlanCard({ plan, current, rank, photographer, requestSent, onApply, onReset }) {
  const program = photographer && plan.program ? plan.program : null
  const isCurrent = current === plan.id
  const isUpgrade = plan.rank > rank

  let action
  if (program) {
    action = requestSent ? (
      <>
        <button type="button" className="st-btn st-btn--outline st-btn--block" disabled>Request sent</button>
        <button type="button" className="st-protoBtn plan__proto" onClick={onReset}>Prototype: reset and apply again</button>
      </>
    ) : (
      <button type="button" className="st-btn st-btn--primary st-btn--block" onClick={onApply}>Apply</button>
    )
  } else if (isCurrent) {
    action = null
  } else if (isUpgrade) {
    action = <button type="button" className="st-btn st-btn--primary st-btn--block">Upgrade</button>
  } else {
    action = <button type="button" className="st-btn st-btn--outline st-btn--block plan__downgrade">Downgrade</button>
  }

  return (
    <article className={`plan${isCurrent ? ' plan--current' : ''}${program ? ' plan--program' : ''}`}>
      {isCurrent && <span className="plan__tag">Current plan</span>}
      <h2 className="plan__name">{plan.name}</h2>
      <p className="plan__price">
        {program ? (
          <>
            <strong>$0</strong> <span>{program.unit}</span>
          </>
        ) : (
          <>
            <strong>${plan.price}</strong> <span>/ month</span>
          </>
        )}
      </p>
      <p className="plan__desc">{plan.desc}</p>
      {program && <p className="plan__note">{program.note}</p>}
      <div className="plan__action">{action}</div>

      {plan.cameras && !program && (
        <div className="plan__group">
          <div className="plan__row"><span>Cameras included in plan</span><Value v={String(plan.cameras)} /></div>
          <button type="button" className="st-btn st-btn--outline st-btn--block plan__addCam">Add more cameras</button>
        </div>
      )}
      {plan.groups.map((rows, i) => (
        <div className="plan__group" key={i}>
          {rows.map(([label, v]) => (
            <div className="plan__row" key={label}>
              <span>{label}</span>
              <Value v={v} />
            </div>
          ))}
        </div>
      ))}
    </article>
  )
}

export default function ManagePlan() {
  const navigate = useNavigate()
  const { account, status, reset } = useProgram()
  const acct = ACCOUNTS[account] ?? ACCOUNTS.demo
  const [audience, setAudience] = useState('agent')
  const [applyOpen, setApplyOpen] = useState(false)
  const requestSent = status !== 'none'

  return (
    <div className="studio managePlan">
      <button type="button" className="orgSettings__close" aria-label="Close" onClick={() => navigate(-1)}>
        <Close size={24} />
      </button>

      <header className="managePlan__head">
        <h1 className="managePlan__title">Manage your plan</h1>
        {acct.planId && acct.planId !== 'free' && (
          <button type="button" className="st-btn st-btn--outline">Cancel subscription</button>
        )}
      </header>

      <div className="managePlan__audience">
        <span className="managePlan__audienceLabel">I am a</span>
        <div className="planToggle" role="tablist" aria-label="Plan audience">
          {AUDIENCES.map((a) => (
            <button
              key={a.id}
              type="button"
              role="tab"
              aria-selected={audience === a.id}
              className={`planToggle__opt${audience === a.id ? ' is-active' : ''}`}
              onClick={() => setAudience(a.id)}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="managePlan__grid">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            current={acct.planId}
            rank={acct.rank}
            photographer={audience === 'photographer'}
            requestSent={requestSent}
            onApply={() => setApplyOpen(true)}
            onReset={reset}
          />
        ))}
      </div>

      <section className="managePlan__enterprise">
        <div>
          <h2 className="st-h3">Enterprise</h2>
          <p className="st-p">For creating high-quality, versatile property media via repeatable workflows</p>
        </div>
        <button type="button" className="st-btn st-btn--primary">Book a call</button>
      </section>

      <Modal open={applyOpen} onClose={() => setApplyOpen(false)} title="Apply to the Photographer program" theme="studio">
        <ApplicationForm variant="modal" title="Apply to the Photographer program" />
      </Modal>
    </div>
  )
}
