import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductMenu from './ProductMenu.jsx'
import useHeaderScroll from '../hooks/useScrolledPastFold.js'
import './Header.css'

const NAV = [
  { label: 'Product', menu: true },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Newsroom', to: '#' },
  { label: 'Contacts', to: '#' },
]

export default function Header() {
  const { scrolled, pastFold } = useHeaderScroll()
  const [productOpen, setProductOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header
      className={`header${scrolled ? ' header--scrolled' : ''}${pastFold ? ' header--pastfold' : ''}`}
    >
      <div className="header__content">
        <Link to="/" className="header__logo" aria-label="Giraffe360 home">
          <img src="/assets/logo-giraffe360.svg" alt="Giraffe360" width={91} height={12} />
        </Link>

        <nav className="header__links">
          {NAV.map((item) =>
            item.menu ? (
              <div
                key={item.label}
                className="header__navItem header__navItem--menu"
                onMouseEnter={() => setProductOpen(true)}
                onMouseLeave={() => setProductOpen(false)}
              >
                <button className="header__link" type="button">
                  {item.label}
                </button>
                <div className={`header__dropdown${productOpen ? ' is-open' : ''}`}>
                  <ProductMenu onNavigate={() => setProductOpen(false)} />
                </div>
              </div>
            ) : item.to?.startsWith('/') ? (
              <Link key={item.label} to={item.to} className="header__navItem header__link">
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.to} className="header__navItem header__link">
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="header__ctas">
          <a href="#" className="header__link header__login">Log in</a>
          <div className="header__buttons">
            <button className="btn btn--primary" type="button">Free demo</button>
            <button
              className="btn btn--secondary"
              type="button"
              onClick={() => navigate('/pricing')}
            >
              Order now
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
