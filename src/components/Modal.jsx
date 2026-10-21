import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Close } from './icons/index.jsx'
import './Modal.css'

/* Website-style dialog: portal to <body>, backdrop click / Escape close, body scroll lock,
   focus moves into the panel and returns to the opener on close. */
export default function Modal({ open, onClose, title, children, theme }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const opener = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    panelRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      if (opener instanceof HTMLElement) opener.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className={`modal${theme ? ` modal--${theme}` : ''}`}>
      <div className="modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={panelRef}
      >
        <button type="button" className="modal__close icon-btn" aria-label="Close" onClick={onClose}>
          <Close size={24} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
