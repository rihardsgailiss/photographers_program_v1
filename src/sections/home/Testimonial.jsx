import './Testimonial.css'

function Human() {
  return (
    <div className="testi__human">
      <img className="testi__avatar" src="/assets/testi-avatar.png" alt="" width={64} height={64} />
      <div className="testi__name">
        <span className="testi__person">Samantha Rivers</span>
        <span className="testi__role">Photographer / LosAngeles Photography</span>
      </div>
    </div>
  )
}

export default function Testimonial() {
  return (
    <section className="testi">
      <div className="testi__quotes">
        <div className="testi__row">
          <div className="testi__block">
            <p className="testi__quote">
              Since adopting Giraffe360, my average sale timeline dropped to about a week —and
              buyers can explore listings remotely in a way that simply was not possible before.
            </p>
            <Human />
          </div>
          <img className="testi__mark" src="/assets/testi-quote.svg" alt="" width={56} height={48} />
        </div>

        <div className="testi__block testi__block--right">
          <p className="testi__quote">
            Over the past few years with Giraffe360, I’ve scaled my private photography business
            into an eight-person team working on high-end properties across multiple states.
          </p>
          <Human />
        </div>
      </div>
    </section>
  )
}
