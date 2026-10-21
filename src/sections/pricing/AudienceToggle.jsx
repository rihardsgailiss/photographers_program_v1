import './AudienceToggle.css'

const OPTIONS = [
  { id: 'agent', label: 'Real estate agent' },
  { id: 'photographer', label: 'Photographer' },
]

/* "I am a: Agent / Photographer" switch above the plan cards. Reuses the .planSwitch pill. */
export default function AudienceToggle({ value, onChange }) {
  return (
    <div className="audienceToggle">
      <span className="audienceToggle__label" id="audience-label">I am a</span>
      <div className="planSwitch planSwitch--audience" role="tablist" aria-labelledby="audience-label">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            role="tab"
            aria-selected={value === o.id}
            className={`planSwitch__opt${value === o.id ? ' is-active' : ''}`}
            onClick={() => onChange(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
