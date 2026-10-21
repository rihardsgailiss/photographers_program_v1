import { ArrowBack } from '../../components/icons/index.jsx'
import './Projects.css'

/* Figma "Project page – Specification" (9648:140347): one example project with its content tiles. */
const PROJECT = {
  date: 'September 24, 2020',
  title: '44-B William Henry Street Rokeby street, Liverpool L3 8BA',
  address: '38-30 Douglaston Parkway UNIT 3E, Douglaston, NY 11363',
  extraUsers: 7,
}

const TABS = [
  { label: 'Content', active: true },
  { label: 'Listing spotlight', badge: 'Beta' },
  { label: 'Property description' },
  { label: 'Share' },
  { label: 'Users' },
  { label: 'Property Data', badge: '40%', badgeTone: 'orange' },
]

const TILES = [
  { title: '3D Walkthrough', badge: 'Beta', sub: '2 active links', tone: 'ok', img: '/assets/card3-360.jpg' },
  { title: 'Marketing content', sub: '5', img: '/assets/card-01.png' },
  { title: 'Still photos', sub: '23', img: '/assets/card6-photo.jpg' },
  { title: 'Videos', sub: '5', img: '/assets/card4-video.jpg' },
  { title: 'Virtual tour', sub: 'Status', tone: 'ok', img: '/assets/vid2.png' },
  { title: 'Floor plans', sub: '5', img: '/assets/card2-floorplan.png', fit: 'contain' },
  { title: 'Property website', badge: 'Beta', sub: 'Status', tone: 'ok', img: '/assets/card5-website.png', fit: 'contain' },
  { title: '3D Floor plan', sub: '1 active link', tone: 'ok', img: '/assets/card-02.png', fit: 'contain' },
  { title: 'Point cloud', sub: 'E57 - 312.4 MB / PLY - 311.0 MB', cloud: true },
]

function Dots() {
  return (
    <svg width="18" height="4" viewBox="0 0 18 4" fill="currentColor" aria-hidden="true">
      <circle cx="2" cy="2" r="2" />
      <circle cx="9" cy="2" r="2" />
      <circle cx="16" cy="2" r="2" />
    </svg>
  )
}

export default function Projects() {
  return (
    <div className="project">
      <div className="project__bar">
        <button type="button" className="project__back" aria-label="Back to projects">
          <ArrowBack size={24} />
        </button>
        <img className="project__me" src="/assets/testi-avatar.png" alt="" width={32} height={32} />
      </div>

      <header className="project__head">
        <div className="project__titles">
          <p className="project__date">{PROJECT.date}</p>
          <h1 className="project__title">{PROJECT.title}</h1>
          <p className="project__address">{PROJECT.address}</p>
          <button type="button" className="project__chip">
            <span aria-hidden="true">+</span> Add integrations
          </button>
        </div>
        <div className="project__people">
          <div className="project__avatars" aria-label={`${PROJECT.extraUsers + 4} users`}>
            {[0, 1, 2, 3].map((i) => (
              <img key={i} src="/assets/testi-avatar.png" alt="" width={28} height={28} />
            ))}
            <span className="project__more">+{PROJECT.extraUsers}</span>
          </div>
          <button type="button" className="project__menu" aria-label="Project actions">
            <Dots />
          </button>
        </div>
      </header>

      <nav className="project__tabs" aria-label="Project sections">
        {TABS.map((t) => (
          <a key={t.label} href="#" className={`project__tab${t.active ? ' is-active' : ''}`} onClick={(e) => e.preventDefault()}>
            {t.label}
            {t.badge && <span className={`project__badge${t.badgeTone ? ` project__badge--${t.badgeTone}` : ''}`}>{t.badge}</span>}
          </a>
        ))}
      </nav>

      <div className="project__grid">
        {TILES.map((t) => (
          <article className="tile" key={t.title}>
            <div className={`tile__media${t.fit === 'contain' ? ' tile__media--contain' : ''}${t.cloud ? ' tile__media--cloud' : ''}`}>
              {t.img && <img src={t.img} alt="" loading="lazy" />}
            </div>
            <div className="tile__foot">
              <div>
                <p className="tile__title">
                  {t.title}
                  {t.badge && <span className="project__badge">{t.badge}</span>}
                </p>
                <p className={`tile__sub${t.tone ? ` tile__sub--${t.tone}` : ''}`}>{t.sub}</p>
              </div>
              <button type="button" className="tile__menu" aria-label={`${t.title} actions`}>
                <Dots />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
