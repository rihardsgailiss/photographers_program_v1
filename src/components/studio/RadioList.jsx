import './RadioList.css'

export default function RadioList({ name, options, value, onChange }) {
  return (
    <div className="radioList" role="radiogroup" aria-label={name}>
      {options.map((o) => (
        <label key={o} className="st-radio">
          <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} />
          <span>{o}</span>
        </label>
      ))}
    </div>
  )
}
