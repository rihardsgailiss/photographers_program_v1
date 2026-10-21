/* Field wrapper for Content Studio forms: optional label, helper, prefill note and error. */
export default function StudioField({ id, label, helper, note, error, children, className = '' }) {
  return (
    <div className={`st-field${error ? ' st-field--invalid' : ''} ${className}`.trim()}>
      {label && (
        <label className="st-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {error ? (
        <span className="st-error" role="alert">{error}</span>
      ) : (
        helper && <span className="st-helper">{helper}</span>
      )}
      {note && <span className="st-note">{note}</span>}
    </div>
  )
}

/* Input with a floating label: reads as a placeholder when empty, sits top-left once filled
   (same pattern as the Country select in the Figma sign-up). */
export function FloatInput({ id, label, className = '', ...props }) {
  return (
    <div className="st-float">
      <input id={id} className={`st-input st-float__input ${className}`.trim()} placeholder=" " {...props} />
      <label className="st-float__label" htmlFor={id}>{label}</label>
    </div>
  )
}
