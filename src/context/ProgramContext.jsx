import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_APPLICATION,
  PARTNER_LINK_BASE,
  addDays,
  addMonths,
  slugify,
  startOfDay,
} from './programDefaults.js'

/*
 * Prototype state for the Photographer program flow. Persisted to sessionStorage so a
 * refresh or a deep link keeps the submitted application; falls back to demo defaults
 * so every route renders cold.
 */
const KEY = 'g360.program.v1'

const INITIAL = {
  account: 'new', // 'new' (website sign-up) | 'demo' (Free, no billing) | 'plus' (paid plan, no camera)
  application: null,
  status: 'none', // 'none' | 'submitted' | 'loggedIn' | 'ordered'
  signup: { heardAbout: '', orgName: '', country: '', phone: '', invites: '' },
  order: {
    delivery: { street: '', city: '', state: '', zip: '' },
    billingSame: true,
    billing: { street: '', city: '', state: '', zip: '' },
    orderedAt: null,
  },
}

function load() {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return INITIAL
    const parsed = JSON.parse(raw)
    return { ...INITIAL, ...parsed, signup: { ...INITIAL.signup, ...parsed.signup }, order: { ...INITIAL.order, ...parsed.order } }
  } catch {
    return INITIAL
  }
}

const ProgramContext = createContext(null)

export function ProgramProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable: keep in-memory state only */
    }
  }, [state])

  const submitApplication = useCallback((data) => {
    setState((s) => ({
      ...s,
      application: { ...data, submittedAt: new Date().toISOString() },
      status: 'submitted',
      signup: { ...s.signup, country: data.country, phone: data.phone },
    }))
  }, [])

  const setEmail = useCallback((email) => {
    setState((s) => ({
      ...s,
      application: { ...(s.application ?? DEFAULT_APPLICATION), email },
    }))
  }, [])

  const updateApplication = useCallback((patch) => {
    setState((s) => ({
      ...s,
      application: { ...(s.application ?? DEFAULT_APPLICATION), ...patch },
    }))
  }, [])

  const setStatus = useCallback((status) => setState((s) => ({ ...s, status })), [])

  const updateSignup = useCallback((patch) => {
    setState((s) => ({ ...s, signup: { ...s.signup, ...patch } }))
  }, [])

  const placeOrder = useCallback((order) => {
    setState((s) => ({
      ...s,
      status: 'ordered',
      order: { ...s.order, ...order, orderedAt: new Date().toISOString() },
    }))
  }, [])

  /* Prototype: switch the account type (new / demo / paid) without losing the flow state. */
  const setAccount = useCallback((account) => setState((s) => ({ ...s, account })), [])

  /* Reset the flow but keep the chosen account type. */
  const reset = useCallback(() => setState((s) => ({ ...INITIAL, account: s.account })), [])

  const profile = useMemo(() => {
    const app = state.application ?? DEFAULT_APPLICATION
    const fullName = `${app.firstName} ${app.lastName}`.trim()
    const startDate = startOfDay(state.order.orderedAt ? new Date(state.order.orderedAt) : new Date())
    const endDate = addMonths(startDate, 6)
    const submitted = app.submittedAt ? new Date(app.submittedAt) : new Date()
    return {
      ...app,
      fullName,
      slug: slugify(fullName) || 'your-name',
      partnerLink: PARTNER_LINK_BASE + (slugify(fullName) || 'your-name'),
      startDate,
      endDate,
      linkExpiry: addDays(submitted, 14),
      signup: state.signup,
    }
  }, [state.application, state.order.orderedAt, state.signup])

  const value = useMemo(
    () => ({ ...state, profile, submitApplication, setEmail, updateApplication, setStatus, updateSignup, placeOrder, setAccount, reset }),
    [state, profile, submitApplication, setEmail, updateApplication, setStatus, updateSignup, placeOrder, setAccount, reset],
  )

  return <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>
}

export function useProgram() {
  const ctx = useContext(ProgramContext)
  if (!ctx) throw new Error('useProgram must be used inside <ProgramProvider>')
  return ctx
}
