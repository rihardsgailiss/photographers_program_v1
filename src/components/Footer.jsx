import { ArrowOutward } from './icons/index.jsx'
import './Footer.css'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      'PRO Camera',
      'Content Studio',
      'HDR real estate photos',
      'Floor plans',
      '360 virtual tours',
      'Real estate videos',
      'Property websites',
      'Real estate marketing assets',
      'Pricing',
    ],
  },
  { title: 'Company', links: ['About', 'Contacts', 'Newsroom', 'Careers'] },
  { title: 'Industries', links: ['Photographers & media providers', 'Real estate agents', 'Brokerages & teams'] },
  { title: 'Legal', links: ['Privacy policy', 'Terms of service', 'Accessibility statement', 'Cookie notice'] },
]

const SOCIALS = ['social-0', 'social-1', 'social-2', 'social-3']

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__left">
            <div className="footer__langPill">
              <img className="footer__langIcon" src="/assets/footer-language.svg" alt="" width={24} height={24} />
              <span>United Kingdom</span>
              <span>/</span>
              <span>English</span>
            </div>

            <div className="footer__newsletter">
              <h3 className="footer__newsHeading">
                Receive product news and tips
                <br />
                from Giraffe360
              </h3>
              <form className="footer__field" onSubmit={(e) => e.preventDefault()}>
                <input className="footer__input" type="email" placeholder="Enter your email..." />
                <button className="footer__submit icon-btn" type="submit" aria-label="Subscribe">
                  <ArrowOutward size={24} />
                </button>
              </form>
            </div>
          </div>

          <div className="footer__columns">
            {COLUMNS.map((col) => (
              <div key={col.title} className="footer__col">
                <span className="footer__colTitle">{col.title}</span>
                <div className="footer__colLinks">
                  {col.links.map((link) => (
                    <a key={link} href="#" className="footer__colLink">{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">©️2026 Giraffe360. All Rights Reserved.</p>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a key={s} href="#" className="footer__social" aria-label="Social link">
                <img src={`/assets/${s}.svg`} alt="" width={24} height={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
