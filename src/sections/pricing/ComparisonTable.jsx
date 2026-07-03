import { CheckSmall } from '../../components/icons/index.jsx'
import './ComparisonTable.css'

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
      <path d="m251-218-33-33 229-229-229-229 33-33 229 229 229-229 33 33-229 229 229 229-33 33-229-229-229 229Z" />
    </svg>
  )
}

/* Cell shapes: {t:'text',v}, {t:'check',v?}, {t:'close'} */
const GROUPS = [
  {
    title: 'Features',
    rows: [
      ['User limit', { t: 'text', v: 'Unlimited' }, { t: 'text', v: '16 per workspace' }],
      ['AI credits', { t: 'check', v: '50 per month for free' }, { t: 'check' }],
      ['Camera', { t: 'check' }, { t: 'close' }],
      ['User limit', { t: 'text', v: 'Unlimited' }, { t: 'text', v: '16 per workspace' }],
      ['AI credits', { t: 'check', v: '50 per month for free' }, { t: 'check' }],
      ['User limit', { t: 'text', v: 'Unlimited' }, { t: 'text', v: '16 per workspace' }],
      ['Camera', { t: 'check' }, { t: 'close' }],
      ['AI credits', { t: 'check', v: '50 per month for free' }, { t: 'check' }],
    ],
  },
  {
    title: 'Hardware',
    rows: [
      ['User limit', { t: 'text', v: 'Unlimited' }, { t: 'close' }],
      ['AI credits', { t: 'check', v: '50 per month for free' }, { t: 'close' }],
      ['Camera', { t: 'check' }, { t: 'close' }],
      ['User limit', { t: 'text', v: 'Unlimited' }, { t: 'close' }],
    ],
  },
  {
    title: 'Support',
    rows: [
      ['User limit', { t: 'text', v: 'Unlimited' }, { t: 'close' }],
      ['AI credits', { t: 'check', v: '50 per month for free' }, { t: 'close' }],
      ['Camera', { t: 'check' }, { t: 'close' }],
      ['User limit', { t: 'text', v: 'Unlimited' }, { t: 'close' }],
    ],
  },
]

function ValueCell({ cell }) {
  if (cell.t === 'text') return <span className="ct__value">{cell.v}</span>
  if (cell.t === 'check') {
    return (
      <span className="ct__valueRow">
        <span className="ct__check"><CheckSmall size={18} /></span>
        {cell.v && <span className="ct__value">{cell.v}</span>}
      </span>
    )
  }
  return (
    <span className="ct__valueRow">
      <span className="ct__close"><CloseIcon /></span>
    </span>
  )
}

export default function ComparisonTable() {
  return (
    <section className="ct">
      {GROUPS.map((group) => (
        <div className="ct__group" key={group.title}>
          <div className="ct__headRow">
            <div className="ct__headCell">{group.title}</div>
            <div className="ct__headCell">PRO Camera &amp; Content Studio</div>
            <div className="ct__headCell">Content Studio</div>
          </div>
          <div className="ct__rows">
            {group.rows.map((row, i) => (
              <div className="ct__row" key={i}>
                <div className="ct__cell"><span className="ct__feat">{row[0]}</span></div>
                <div className="ct__cell"><ValueCell cell={row[1]} /></div>
                <div className="ct__cell"><ValueCell cell={row[2]} /></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
