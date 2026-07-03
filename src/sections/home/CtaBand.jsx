import './CtaBand.css'

export default function CtaBand() {
  return (
    <section className="ctaBand">
      <div className="ctaBand__band">
        <div className="ctaBand__card">
          <div className="ctaBand__copy">
            <h2 className="ctaBand__heading">See what one property capture can create.</h2>
            <p className="ctaBand__sub">No major upfront hardware cost. No hosting costs.</p>
          </div>
          <div className="ctaBand__actions">
            <div className="ctaBand__buttons">
              <button className="btn btn--dark" type="button">Try demo</button>
              <button className="btn btn--white" type="button">Book a call</button>
            </div>
            <p className="ctaBand__note">Get everything for $360/month</p>
          </div>
        </div>
      </div>
    </section>
  )
}
