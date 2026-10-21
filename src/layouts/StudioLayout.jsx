import { Outlet } from 'react-router-dom'
import { ArrowBack, ExpandMore } from '../components/icons/index.jsx'

/* Top bar used by the Content Studio log-in / sign-up screens. */
export function StudioBar({ back = false, onBack }) {
  return (
    <div className="studioBar">
      {back ? (
        <button type="button" className="studioBar__back" aria-label="Back" onClick={onBack}>
          <ArrowBack size={24} />
        </button>
      ) : (
        <a className="studioBar__logo" href="/" aria-label="Giraffe360">
          <img src="/assets/logo-giraffe360.svg" alt="Giraffe360" />
        </a>
      )}
      <button type="button" className="studioBar__lang" aria-haspopup="listbox">
        English
        <ExpandMore size={18} />
      </button>
    </div>
  )
}

/* Product surface wrapper (white page, product tokens). Pages render their own StudioBar. */
export default function StudioLayout() {
  return (
    <div className="studio">
      <Outlet />
    </div>
  )
}
