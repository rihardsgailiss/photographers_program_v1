import { useState } from 'react'
import { CheckSmall } from './icons/index.jsx'
import './CountryToast.css'

export default function CountryToast() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="countryToast" role="dialog" aria-label="Shipping country and language">
      <p className="countryToast__label">Shipping country and language:</p>
      <div className="countryToast__buttons">
        <button className="btn btn--secondary" type="button">United Kingdom</button>
        <button className="btn btn--secondary" type="button">English</button>
        <button
          className="countryToast__confirm"
          type="button"
          aria-label="Confirm"
          onClick={() => setVisible(false)}
        >
          <CheckSmall size={24} />
        </button>
      </div>
    </div>
  )
}
