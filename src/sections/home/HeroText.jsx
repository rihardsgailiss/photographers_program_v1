import './HeroText.css'

export default function HeroText() {
  return (
    <section className="heroText">
      <div className="heroText__text">
        <h1 className="heroText__heading">
          <span className="heroText__reveal">
            Real estate camera and AI software for versatile listing media
          </span>
        </h1>
        <p className="heroText__desc">
          Capture a property once with Giraffe360 and receive HDR photos, floor plans, 360
          virtual tours, property videos, websites, and real estate marketing assets.
        </p>
      </div>
      <div className="heroText__cta">
        <button className="btn btn--primary" type="button">Free demo</button>
        <button className="btn btn--white" type="button">Order now</button>
      </div>
    </section>
  )
}
