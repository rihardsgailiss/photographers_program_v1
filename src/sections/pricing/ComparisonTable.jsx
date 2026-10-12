import { useState } from 'react'
import './ComparisonTable.css'

const PLANS = ['Content Studio', 'Content Studio Plus', 'Content Studio & Camera']

/* cell helpers: check (optional subtext), cross, or a text value */
const chk = (sub) => ({ t: 'check', sub })
const no = () => ({ t: 'close' })
const val = (v) => ({ t: 'text', v })

const SECTIONS = [
  {
    title: "What's included",
    rows: [
      { name: 'Content Studio', sub: 'Edit, stage, host and share content', cells: [chk(), chk(), chk()] },
      { name: 'Camera & field kit', sub: 'Giraffe360 camera, auto-height tripod and carry kit', cells: [no(), no(), chk()] },
    ],
  },
  {
    title: 'Content',
    rows: [
      { name: 'Photos', cells: [chk('external uploads only'), chk('external uploads only'), chk('external & Giraffe360 camera uploads')] },
      { name: 'Marketing content', cells: [chk(), chk(), chk()] },
      { name: 'Agent website', cells: [chk(), chk(), chk('with custom domain')] },
      { name: 'Property website', cells: [chk(), chk(), chk()] },
      { name: 'AI videos', cells: [chk(), chk(), chk()] },
      { name: 'Videos & reels', cells: [no(), no(), chk()] },
      { name: 'Virtual tour', cells: [no(), no(), chk()] },
      { name: 'Floor plans', cells: [no(), no(), chk()] },
      { name: 'Point cloud', cells: [no(), no(), chk()] },
    ],
  },
  {
    title: 'Limits',
    rows: [
      { name: 'Projects per year', cells: [val('24'), val('60'), val('192')] },
      { name: 'Externally uploaded photos per project', sub: 'Photos from your phone or any non-Giraffe360 camera', cells: [val('100'), val('200'), val('10')] },
      { name: 'Users', sub: 'Team members with their own login, from viewer to admin', cells: [val('1'), val('15'), val('Unlimited')] },
      { name: 'Workspaces', sub: 'Manage your organisation in separate teams', cells: [val('1'), val('5'), val('Unlimited')] },
      { name: 'AI credits per month', sub: 'Free credits awarded every month', cells: [val('50'), val('200'), val('50')] },
    ],
  },
  {
    title: 'Extras',
    rows: [
      { name: 'Integrations', sub: 'Social media connection & Reapit, Apimo, Apex27, Propstack, Street.co.uk', cells: [chk(), chk(), chk()] },
      { name: 'API access', sub: 'Access all your project data via API keys', cells: [no(), chk(), chk()] },
      { name: 'Priority processing', sub: 'Your projects are processed ahead of the queue', cells: [no(), chk(), chk()] },
      { name: 'Priority support', sub: 'Your support requests are received and solved first', cells: [no(), chk(), chk()] },
    ],
  },
]

function Check() {
  return (
    <svg className="ct__icon ct__icon--check" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5 10 17.5 19.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function Cross() {
  return (
    <svg className="ct__icon ct__icon--close" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6 18 18M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function Chevron({ dir = 'right' }) {
  return (
    <svg
      className="ct__chevron"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={dir === 'left' ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path d="M9 5 16 12 9 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ValueCell({ cell, col }) {
  return (
    <div className="ct__valCell" data-col={col}>
      {cell.t === 'text' ? (
        <span className="ct__valText">{cell.v}</span>
      ) : (
        <>
          {cell.t === 'check' ? <Check /> : <Cross />}
          {cell.sub && <span className="ct__valSub">{cell.sub}</span>}
        </>
      )}
    </div>
  )
}

export default function ComparisonTable() {
  const [plan, setPlan] = useState(0)

  return (
    <section className="ct">
      <div className={`ct__table ct--plan-${plan}`}>
        {/* Sticky header: plan columns (desktop) / plan switcher (mobile) */}
        <div className="ct__header">
          <div className="ct__headRow ct__headRow--desktop">
            <div className="ct__headCell ct__headCell--feature" />
            {PLANS.map((name) => (
              <div className="ct__headCell" key={name}>{name}</div>
            ))}
          </div>

          <div className="ct__headRow ct__headRow--mobile">
            <button
              type="button"
              className="ct__switchBtn"
              aria-label="Previous plan"
              disabled={plan === 0}
              onClick={() => setPlan((p) => Math.max(0, p - 1))}
            >
              <Chevron dir="left" />
            </button>
            <div className="ct__headCell ct__headCell--current">{PLANS[plan]}</div>
            <button
              type="button"
              className="ct__switchBtn"
              aria-label="Next plan"
              disabled={plan === PLANS.length - 1}
              onClick={() => setPlan((p) => Math.min(PLANS.length - 1, p + 1))}
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>

        {SECTIONS.map((section) => (
          <div className="ct__section" key={section.title}>
            <div className="ct__sectionRow">{section.title}</div>
            {section.rows.map((row) => (
              <div className="ct__row" key={row.name}>
                <div className="ct__featCell">
                  <span className="ct__featName">{row.name}</span>
                  {row.sub && <span className="ct__featSub">{row.sub}</span>}
                </div>
                {row.cells.map((cell, col) => (
                  <ValueCell cell={cell} col={col} key={col} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
