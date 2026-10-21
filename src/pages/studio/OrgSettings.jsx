import { Navigate, NavLink, useNavigate, useParams } from 'react-router-dom'
import { Close } from '../../components/icons/index.jsx'
import { CURRENT_ORG } from '../../components/studio/Sidebar.jsx'
import { useProgram } from '../../context/ProgramContext.jsx'
import { ACCOUNTS } from '../../data/plans.js'
import Dashboard from './Dashboard.jsx'
import Billing from './Billing.jsx'
import './OrgSettings.css'

/* Figma "Organisation – Specification" (5355:12575). Tabs depend on the account:
   - paid plan without camera: Billing (→ Manage your plan)
   - demo account: no Billing; upgrades only via Manage your plan
   - once the camera is ordered: Photographer program replaces Billing. */
function tabsFor(account, status) {
  const acct = ACCOUNTS[account] ?? ACCOUNTS.new
  const enrolled = status === 'ordered'
  return [
    { id: 'workspaces', label: 'Workspaces' },
    ...(enrolled ? [{ id: 'photographer-program', label: 'Photographer program' }] : []),
    ...(!enrolled && acct.hasBilling ? [{ id: 'billing', label: 'Billing' }] : []),
    { id: 'users', label: 'All users' },
    { id: 'cameras', label: 'All cameras' },
    { id: 'projects', label: 'All projects' },
  ]
}

export default function OrgSettings() {
  const { tab } = useParams()
  const navigate = useNavigate()
  const { account, status } = useProgram()
  const tabs = tabsFor(account, status)
  const current = tabs.find((t) => t.id === tab)
  if (!current) {
    const fallback = tabs.find((t) => t.id === 'photographer-program') ?? tabs.find((t) => t.id === 'billing') ?? tabs[0]
    return <Navigate to={`/studio/organisation/${fallback.id}`} replace />
  }
  const acct = ACCOUNTS[account] ?? ACCOUNTS.new

  return (
    <div className="studio orgSettings">
      <button type="button" className="orgSettings__close" aria-label="Close organisation settings" onClick={() => navigate('/studio/projects')}>
        <Close size={24} />
      </button>

      <header className="orgSettings__head">
        <p className="orgSettings__eyebrow">Manage organisation</p>
        <h1 className="orgSettings__title">{CURRENT_ORG}</h1>
        <nav className="orgSettings__tabs" aria-label="Organisation settings">
          {tabs.map((t) => (
            <NavLink
              key={t.id}
              to={`/studio/organisation/${t.id}`}
              className={({ isActive }) => `orgSettings__tab${isActive ? ' is-active' : ''}`}
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <div className="orgSettings__body">
        {current.id === 'photographer-program' && <Dashboard embedded />}
        {current.id === 'billing' && <Billing planId={acct.planId} />}
        {current.id !== 'photographer-program' && current.id !== 'billing' && (
          <div className="orgSettings__placeholder">
            <h2 className="st-h2">{current.label}</h2>
            <p className="st-p">
              {account === 'demo' && current.id === 'workspaces'
                ? 'Demo accounts have no billing section. Upgrade from Manage your plan in the sidebar.'
                : 'This tab is not part of the Photographer program prototype.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
