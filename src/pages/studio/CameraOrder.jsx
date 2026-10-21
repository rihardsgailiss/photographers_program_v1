import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StudioBar } from '../../layouts/StudioLayout.jsx'
import StudioField, { FloatInput } from '../../components/studio/StudioField.jsx'
import { Check } from '../../components/icons/index.jsx'
import { useProgram } from '../../context/ProgramContext.jsx'
import { digitsOnly, formatCard, formatExpiry } from '../../utils/format.js'
import './CameraOrder.css'

const EMPTY_ADDRESS = { street: '', city: '', state: '', zip: '' }

/* Demo values for the prototype autofill (published test card number, sample address). */
const DEMO_CARD = { number: '4242 4242 4242 4242', expiry: '12/29', cvc: '123' }
const DEMO_ADDRESS = { street: '128 Market Street', city: 'San Francisco', state: 'CA', zip: '94105' }

const PERKS = [
  'Your Gen5 camera ships to you',
  'Your partner link goes live today',
  '6 months to reach 20 active agents',
]

function validateAddress(a, prefix, errs) {
  if (!a.street.trim()) errs[`${prefix}.street`] = 'Enter the street address.'
  if (!a.city.trim()) errs[`${prefix}.city`] = 'Enter the city.'
  if (!a.state.trim()) errs[`${prefix}.state`] = 'Enter the state.'
  if (!a.zip.trim()) errs[`${prefix}.zip`] = 'Enter the ZIP code.'
}

function AddressFields({ prefix, value, onChange, errors }) {
  const set = (k) => (e) => onChange({ ...value, [k]: e.target.value })
  return (
    <>
      <StudioField id={`${prefix}-street`} error={errors[`${prefix}.street`]}>
        <FloatInput id={`${prefix}-street`} label="Street address" autoComplete="street-address" value={value.street} onChange={set('street')} />
      </StudioField>
      <div className="order__row order__row--3">
        <StudioField id={`${prefix}-city`} error={errors[`${prefix}.city`]}>
          <FloatInput id={`${prefix}-city`} label="City" autoComplete="address-level2" value={value.city} onChange={set('city')} />
        </StudioField>
        <StudioField id={`${prefix}-state`} error={errors[`${prefix}.state`]}>
          <FloatInput id={`${prefix}-state`} label="State" autoComplete="address-level1" value={value.state} onChange={set('state')} />
        </StudioField>
        <StudioField id={`${prefix}-zip`} error={errors[`${prefix}.zip`]}>
          <FloatInput id={`${prefix}-zip`} label="ZIP code" autoComplete="postal-code" inputMode="numeric" value={value.zip} onChange={set('zip')} />
        </StudioField>
      </div>
    </>
  )
}

/* First step after the email code: welcome, order the free camera ($0), then (new accounts)
   set up the workspace. Card details stay in component state only. */
export default function CameraOrder() {
  const navigate = useNavigate()
  const { placeOrder, account, profile } = useProgram()
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' })
  const [delivery, setDelivery] = useState(EMPTY_ADDRESS)
  const [billingSame, setBillingSame] = useState(true)
  const [billing, setBilling] = useState(EMPTY_ADDRESS)
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState({})

  const autofill = () => {
    setCard(DEMO_CARD)
    setDelivery(DEMO_ADDRESS)
    setBillingSame(true)
    setConsent(true)
    setErrors({})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    validateAddress(delivery, 'delivery', errs)
    if (!billingSame) validateAddress(billing, 'billing', errs)
    const num = digitsOnly(card.number)
    if (num.length < 13) errs.number = 'Enter a valid card number.'
    const exp = digitsOnly(card.expiry)
    const mm = Number(exp.slice(0, 2))
    if (exp.length !== 4 || mm < 1 || mm > 12) errs.expiry = 'Use MM/YY.'
    if (digitsOnly(card.cvc).length < 3) errs.cvc = 'Enter the CVC.'
    if (!consent) errs.consent = 'Please accept the terms to continue.'
    setErrors(errs)
    if (Object.keys(errs).length) return

    placeOrder({ delivery, billingSame, billing: billingSame ? delivery : billing })
    // New accounts set up their workspace next; existing accounts are upgraded in place.
    navigate(account === 'new' ? '/signup/workspace' : '/studio/organisation/photographer-program')
  }

  return (
    <>
      <StudioBar />
      <div className="order">
        <header className="order__hero">
          <p className="st-eyebrow">Photographer program</p>
          <h1 className="st-h1 order__title">Welcome to the Giraffe360 Photographer program, {profile.firstName}</h1>
          <p className="st-p order__lead">
            Order your free Gen5 camera and start your journey. Nothing is charged today.
          </p>
          <ul className="order__perks">
            {PERKS.map((p) => (
              <li key={p}>
                <Check size={18} />
                {p}
              </li>
            ))}
          </ul>
        </header>

        <form className="order__form" onSubmit={onSubmit} noValidate>
          <div className="order__cols">
            <section className="order__section" aria-labelledby="order-delivery">
              <h2 id="order-delivery" className="st-h3">Where should we send it?</h2>
              <AddressFields prefix="delivery" value={delivery} onChange={setDelivery} errors={errors} />
              <label className="st-check st-check--small">
                <input type="checkbox" checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} />
                <span>Billing address is the same as delivery</span>
              </label>
            </section>

            <section className="order__section" aria-labelledby="order-card">
              <h2 id="order-card" className="st-h3">Your card</h2>
              <StudioField id="card-number" error={errors.number}>
                <FloatInput
                  id="card-number"
                  label="Card number"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })}
                />
              </StudioField>
              <div className="order__row">
                <StudioField id="card-expiry" error={errors.expiry}>
                  <FloatInput
                    id="card-expiry"
                    label="Expiry (MM/YY)"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                  />
                </StudioField>
                <StudioField id="card-cvc" error={errors.cvc}>
                  <FloatInput
                    id="card-cvc"
                    label="CVC"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    maxLength={4}
                    value={card.cvc}
                    onChange={(e) => setCard({ ...card, cvc: digitsOnly(e.target.value).slice(0, 4) })}
                  />
                </StudioField>
              </div>
              <p className="order__why">
                <strong>Why we ask for a card.</strong> It keeps our partnership on a proper contract
                and covers only the extras you choose to add later, such as additional AI credits or
                accessories. The camera and your subscription are free.
              </p>
            </section>
          </div>

          {!billingSame && (
            <section className="order__section" aria-labelledby="order-billing">
              <h2 id="order-billing" className="st-h3">Billing address</h2>
              <AddressFields prefix="billing" value={billing} onChange={setBilling} errors={errors} />
            </section>
          )}

          <div className="order__foot">
            <div className={`st-field${errors.consent ? ' st-field--invalid' : ''}`}>
              <label className="st-check st-check--small">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>
                  I accept the <a className="st-link" href="#" onClick={(ev) => ev.preventDefault()}>Photographer program terms</a> and the{' '}
                  <a className="st-link" href="#" onClick={(ev) => ev.preventDefault()}>Terms of Service</a>.
                </span>
              </label>
              {errors.consent && <span className="st-error" role="alert">{errors.consent}</span>}
            </div>
            <div className="order__actions">
              <button type="submit" className="st-btn st-btn--primary order__submit">Order my camera · $0</button>
              <span className="st-small">
                {account === 'new' ? 'Next: name your workspace and you are in.' : 'Next: your Photographer program page.'}
              </span>
            </div>
            <button type="button" className="st-protoBtn" onClick={autofill}>
              Prototype: autofill with demo details
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
