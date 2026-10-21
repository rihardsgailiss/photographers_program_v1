import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useProgram } from '../context/ProgramContext.jsx'
import { ACCOUNTS } from '../data/plans.js'
import './ProtoNav.css'

/* Prototype-only navigator: a tiny dot in the top-left corner that expands into a map of
   every screen in the Photographer program flow. Not part of the product UI. */
const GROUPS = [
  {
    title: 'Website',
    items: [
      { label: 'Home', to: '/' },
      { label: 'Pricing (Agent / Photographer)', to: '/pricing' },
      { label: 'Photographer program landing', to: '/photographer-program' },
    ],
  },
  {
    title: 'Email',
    items: [{ label: 'Approval email', to: '/email/approved' }],
  },
  {
    title: 'Content Studio',
    items: [
      { label: 'Log in', to: '/signup/login', match: (p) => p === '/signup/login' },
      { label: 'Email code', to: '/signup/code' },
      { label: 'Order the camera', to: '/signup/order' },
      { label: 'Step 1 · Name', to: '/signup/step/1' },
      { label: 'Step 2 · Industry', to: '/signup/step/2' },
      { label: 'Step 3 · Heard about us', to: '/signup/step/3' },
      { label: 'Step 4 · Workspace', to: '/signup/step/4' },
      { label: 'Step 5 · Invite coworkers', to: '/signup/step/5' },
      { label: 'Dashboard · Projects', to: '/studio/projects' },
      { label: 'Manage your plan (in-app upgrade)', to: '/studio/plan' },
      { label: 'Organisation · Billing (paid plans)', to: '/studio/organisation/billing' },
      { label: 'Organisation · Photographer program', to: '/studio/organisation/photographer-program' },
    ],
  },
]

const STATUS_LABEL = {
  none: 'not applied',
  submitted: 'application sent',
  loggedIn: 'signed in',
  ordered: 'camera ordered',
}

export default function ProtoNav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { status, profile, account, setAccount, reset } = useProgram()
  const rootRef = useRef(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const onReset = () => {
    reset()
    setOpen(false)
    navigate('/photographer-program')
  }

  return (
    <div className={`protoNav${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="protoNav__dot"
        aria-label={open ? 'Close prototype map' : 'Open prototype map'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      />

      {open && (
        <nav className="protoNav__panel" aria-label="Prototype map">
          <div className="protoNav__head">
            <span className="protoNav__title">Prototype map</span>
            <span className="protoNav__status">
              {profile.firstName} · {STATUS_LABEL[status] ?? status}
            </span>
          </div>

          <div className="protoNav__group">
            <span className="protoNav__groupTitle">Account</span>
            <div className="protoNav__accounts" role="radiogroup" aria-label="Prototype account type">
              {Object.entries(ACCOUNTS).map(([id, a]) => (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={account === id}
                  className={`protoNav__account${account === id ? ' is-active' : ''}`}
                  onClick={() => setAccount(id)}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {GROUPS.map((g) => (
            <div className="protoNav__group" key={g.title}>
              <span className="protoNav__groupTitle">{g.title}</span>
              {g.items.map((item) => {
                const active = item.match ? item.match(pathname) : pathname === item.to
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`protoNav__item${active ? ' is-active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          ))}

          <button type="button" className="protoNav__reset" onClick={onReset}>
            Reset demo and start over
          </button>
        </nav>
      )}
    </div>
  )
}
