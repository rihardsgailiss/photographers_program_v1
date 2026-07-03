import './Trusted.css'

const LOGOS = ['berkshire', 'howard', 'compass', 'exp', 'kw', 'remax', 'cbre', 'c21', 'coldwell']

function LogoGroup() {
  return (
    <div className="trusted__logoGroup">
      {LOGOS.map((name) => (
        <img key={name} className="trusted__logo" src={`/assets/logos/${name}.svg`} alt={name} />
      ))}
    </div>
  )
}

export default function Trusted() {
  return (
    <section className="trusted">
      <div className="trusted__card">
        <div className="trusted__row">
          <p className="trusted__headline">
            Trusted by over 10,000 real estate photographers, agents, and brokerages around the world
          </p>
          <div className="trusted__trustpilot">
            <span className="trusted__tpText">Trustpilot 4.8</span>
            <img src="/assets/trustpilot-star.svg" alt="" width={20} height={20} />
          </div>
        </div>

        <div className="trusted__divider" />

        <div className="trusted__logos">
          <div className="trusted__marquee">
            <LogoGroup />
            <LogoGroup />
          </div>
        </div>
      </div>
    </section>
  )
}
