import './StepFrame.css'

/* Centred 410px form column used by the sign-up steps and the camera order step. */
export default function StepFrame({
  step,
  total = 5,
  eyebrow,
  title,
  intro,
  children,
  onSubmit,
  nextLabel = 'Next',
  secondaryLabel,
  onSecondary,
  wide = false,
  footer,
}) {
  return (
    <div className={`studioCol stepFrame${wide ? ' studioCol--wide' : ''}`}>
      <p className="st-eyebrow stepFrame__label">{eyebrow ?? `Step ${step} of ${total}`}</p>
      <h1 className="st-h1 stepFrame__title">{title}</h1>
      {intro && <p className="st-p stepFrame__intro">{intro}</p>}
      <form className="stepFrame__form" onSubmit={onSubmit} noValidate>
        {children}
        <div className="stepFrame__actions">
          {secondaryLabel && (
            <button type="button" className="st-btn st-btn--outline st-btn--next" onClick={onSecondary}>
              {secondaryLabel}
            </button>
          )}
          <button type="submit" className="st-btn st-btn--primary st-btn--next">
            {nextLabel}
          </button>
        </div>
        {footer}
      </form>
    </div>
  )
}
