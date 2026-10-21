import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StudioBar } from '../../layouts/StudioLayout.jsx'
import StepFrame from '../../components/studio/StepFrame.jsx'
import StudioField, { FloatInput } from '../../components/studio/StudioField.jsx'
import { InfoCircle } from '../../components/icons/index.jsx'
import { useProgram } from '../../context/ProgramContext.jsx'
import { digitsOnly, formatCard, formatExpiry } from '../../utils/format.js'
import './CameraOrder.css'

const EMPTY_ADDRESS = { street: '', city: '', state: '', zip: '' }

/* Demo values for the prototype autofill (published test card number, sample address). */
const DEMO_CARD = { number: '4242 4242 4242 4242', expiry: '12/29', cvc: '123' }
const DEMO_ADDRESS = { street: '128 Market Street', city: 'San Francisco', state: 'CA', zip: '94105' }

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
        <FloatInput id={`${prefix}-street`}  label="Street address" autoComplete="street-address" value={value.street} onChange={set('street')} />
      </StudioField>
      <div className="order__row order__row--3">
        <StudioField id={`${prefix}-city`} error={errors[`${prefix}.city`]}>
          <FloatInput id={`${prefix}-city`}  label="City" autoComplete="address-level2" value={value.city} onChange={set('city')} />
        </StudioField>
        <StudioField id={`${prefix}-state`} error={errors[`${prefix}.state`]}>
          <FloatInput id={`${prefix}-state`}  label="State" autoComplete="address-level1" value={value.state} onChange={set('state')} />
        </StudioField>
        <StudioField id={`${prefix}-zip`} error={errors[`${prefix}.zip`]}>
          <FloatInput id={`${prefix}-zip`}  label="ZIP code" autoComplete="postal-code" inputMode="numeric" value={value.zip} onChange={set('zip')} />
        </StudioField>
      </div>
    </>
  )
}

/* New step after sign-up: card on file ($0), delivery and billing address. Card details
   stay in component state only. */
export default function CameraOrder() {
  const navigate = useNavigate()
  const { placeOrder } = useProgram()
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
    const num = digitsOnly(card.number)
    if (num.length < 13) errs.number = 'Enter a valid card number.'
    const exp = digitsOnly(card.expiry)
    const mm = Number(exp.slice(0, 2))
    if (exp.length !== 4 || mm < 1 || mm > 12) errs.expiry = 'Use MM/YY.'
    if (digitsOnly(card.cvc).length < 3) errs.cvc = 'Enter the CVC.'
    validateAddress(delivery, 'delivery', errs)
    if (!billingSame) validateAddress(billing, 'billing', errs)
    if (!consent) errs.consent = 'Please accept the terms to continue.'
    setErrors(errs)
    if (Object.keys(errs).length) return

    placeOrder({ delivery, billingSame, billing: billingSame ? delivery : billing })
    navigate('/studio/organisation/photographer-program')
  }

  return (
    <>
      <StudioBar />
      <StepFrame
        eyebrow="Photographer program"
        title="Order your free Gen5 camera"
        intro="Total $0. Your camera ships, your partner link goes live and your 6 months start when you order."
        onSubmit={onSubmit}
        nextLabel="Order camera · $0"
        footer={
          <button type="button" className="st-protoBtn" onClick={autofill}>
            Prototype: autofill with demo details
          </button>
        }
      >
        <section className="order__section" aria-labelledby="order-card">
          <h2 id="order-card" className="st-h3">Card</h2>
          <div className="order__info">
            <InfoCircle size={20} />
            <p>
              <strong>Why we need your card.</strong> Nothing is charged. We keep it on file in
              case the camera isn't returned when the partnership ends.
            </p>
          </div>
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
        </section>

        <section className="order__section" aria-labelledby="order-delivery">
          <h2 id="order-delivery" className="st-h3">Delivery address</h2>
          <AddressFields prefix="delivery" value={delivery} onChange={setDelivery} errors={errors} />
        </section>

        <section className="order__section" aria-labelledby="order-billing">
          <h2 id="order-billing" className="st-h3">Billing address</h2>
          <label className="st-check">
            <input type="checkbox" checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} />
            <span>Same as delivery address</span>
          </label>
          {!billingSame && (
            <AddressFields prefix="billing" value={billing} onChange={setBilling} errors={errors} />
          )}
        </section>

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
      </StepFrame>
    </>
  )
}
