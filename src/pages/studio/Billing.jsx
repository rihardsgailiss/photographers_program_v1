import { Link } from 'react-router-dom'
import { CURRENT_PLAN_CARD, INVOICES } from '../../data/plans.js'
import { ArrowOutward } from '../../components/icons/index.jsx'
import './Billing.css'

/* Organisation settings → Billing (Figma 5355:13517) for accounts on a paid plan. */
export default function Billing({ planId }) {
  const plan = CURRENT_PLAN_CARD[planId] ?? CURRENT_PLAN_CARD.plus
  return (
    <div className="billing">
      <div className="billing__top">
        <section className="dashCard billing__plan">
          <div className="billing__planHead">
            <div>
              <h2 className="st-h3">{plan.name}</h2>
              {plan.renew && <p className="st-small">{plan.renew}</p>}
            </div>
            <p className="billing__price">
              <strong>${plan.price}</strong> / month
            </p>
          </div>
          <dl className="billing__rows">
            {plan.limits.map(([k, v], i) => (
              <div className={`billing__row${i === 2 ? ' billing__row--break' : ''}`} key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <Link to="/studio/plan" className="st-btn st-btn--primary billing__manage">Manage plan</Link>
        </section>

        <section className="dashCard billing__usage">
          <div className="billing__usageRow">
            <div>
              <p className="billing__usageLabel">Free AI enhance credits</p>
              <p className="st-small">used this month</p>
            </div>
            <strong>0 of {plan.limits[4][1]}</strong>
          </div>
          <div className="billing__usageRow">
            <div>
              <p className="billing__usageLabel">Paid AI enhance credits</p>
              <p className="st-small">used this month</p>
            </div>
            <strong>0 of 100</strong>
          </div>
          <div className="billing__usageFoot">
            <button type="button" className="st-btn st-btn--outline billing__breakdown">Usage breakdown</button>
            <p className="st-small">
              Paid requests: All users
              <br />
              Spending limit: $20
            </p>
          </div>
        </section>
      </div>

      <section className="billing__invoices">
        <div className="billing__invoicesHead">
          <h2 className="st-h3">Invoices</h2>
          <select className="st-select billing__filter" aria-label="Filter invoices" defaultValue="all">
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="due">Due</option>
          </select>
        </div>
        <div className="dashCard dashTableWrap">
          <table className="dashTable">
            <thead>
              <tr>
                <th>Number</th>
                <th>Due date</th>
                <th>Status</th>
                <th className="billing__right">Invoice total</th>
                <th aria-label="Open" />
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr key={inv.number}>
                  <td>{inv.number}</td>
                  <td>{inv.due}</td>
                  <td>
                    <span className={`billing__dot billing__dot--${inv.tone}`} aria-hidden="true" />
                    {inv.status}
                  </td>
                  <td className="billing__right">{inv.total}</td>
                  <td className="billing__right">
                    <ArrowOutward size={18} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
