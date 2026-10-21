import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useProgram } from '../../context/ProgramContext.jsx'
import { Check, ChevronForward } from '../icons/index.jsx'
import './Sidebar.css'

const NAV = [
  { label: 'Projects', to: '/studio/projects' },
  { label: 'Agent website' },
  { label: 'Analytics' },
  { label: 'Leads' },
  { label: 'Referrals' },
  { label: 'News' },
  { label: 'Help & Learn' },
]

export const CURRENT_ORG = 'Example Organization'

const ORGS = [
  { name: 'Giraffe360 Gen5', color: '#4f7fd6' },
  { name: 'Marketing-Ready', color: '#4f9a5b' },
  { name: 'Harbor & Pine Realty', color: '#e07a3f' },
  { name: 'CX-Sandbox', color: '#3f8f5e' },
  { name: CURRENT_ORG, color: '#5b6572' },
]

function OrgMenu({ onClose }) {
  const navigate = useNavigate()
  return (
    <div className="orgMenu" role="menu" aria-label="Organisation">
      <button
        type="button"
        className="orgMenu__manage"
        role="menuitem"
        onClick={() => {
          onClose()
          navigate('/studio/organisation')
        }}
      >
        Manage organization
      </button>
      <div className="orgMenu__section">
        <span className="orgMenu__label">Switch organization</span>
        {ORGS.map((o) => {
          const current = o.name === CURRENT_ORG
          return (
            <button type="button" key={o.name} className="orgMenu__item" role="menuitemradio" aria-checked={current} onClick={onClose}>
              <span className="orgMenu__check" aria-hidden="true">{current && <Check size={16} />}</span>
              <span className="orgMenu__avatar" style={{ background: o.color }} aria-hidden="true">{o.name[0]}</span>
              <span>{o.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Sidebar() {
  const { account, status } = useProgram()
  const [orgOpen, setOrgOpen] = useState(false)
  const orgRef = useRef(null)

  useEffect(() => {
    if (!orgOpen) return undefined
    const onKey = (e) => e.key === 'Escape' && setOrgOpen(false)
    const onClick = (e) => {
      if (orgRef.current && !orgRef.current.contains(e.target)) setOrgOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [orgOpen])

  return (
    <aside className="sidebar">
      <div className="sidebar__wordmark">GIRAFFE360</div>

      <div className="sidebar__org" ref={orgRef}>
        <button
          type="button"
          className={`sidebar__context sidebar__context--btn${orgOpen ? ' is-open' : ''}`}
          aria-haspopup="menu"
          aria-expanded={orgOpen}
          onClick={() => setOrgOpen((o) => !o)}
        >
          <div>
            <span className="sidebar__contextLabel">Organisation</span>
            <span className="sidebar__contextValue">{CURRENT_ORG}</span>
          </div>
          <ChevronForward size={18} className="sidebar__chevron" />
        </button>
        {orgOpen && <OrgMenu onClose={() => setOrgOpen(false)} />}
      </div>

      <button type="button" className="sidebar__context sidebar__context--btn sidebar__context--workspace">
        <span className="sidebar__avatar" aria-hidden="true">P</span>
        <div>
          <span className="sidebar__contextLabel">Workspace</span>
          <span className="sidebar__contextValue">Photographer Workspace</span>
        </div>
        <ChevronForward size={18} className="sidebar__chevron" />
      </button>

      <nav className="sidebar__nav" aria-label="Content Studio">
        {NAV.map((item) =>
          item.to ? (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => `sidebar__item${isActive ? ' is-active' : ''}`}
            >
              <span>{item.label}</span>
            </NavLink>
          ) : (
            <a key={item.label} href="#" className="sidebar__item" onClick={(e) => e.preventDefault()}>
              <span>{item.label}</span>
            </a>
          ),
        )}
      </nav>

      {account === 'demo' && status !== 'ordered' && (
        <div className="sidebar__plan">
          <span className="sidebar__contextLabel">Demo account</span>
          <span className="sidebar__contextValue">Free plan</span>
          <Link to="/studio/plan" className="st-btn st-btn--primary sidebar__planBtn">Manage plan</Link>
        </div>
      )}
    </aside>
  )
}
