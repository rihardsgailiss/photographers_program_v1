import { useEffect, useRef, useState } from 'react'
import { ArrowOutward } from '../../components/icons/index.jsx'
import './HowItWorks.css'

const ITEMS = [
  {
    title: 'Real Estate Camera',
    desc: 'Use guided capture to collect the visual, 360, and LiDAR data needed for photos, floor plans, virtual tours, videos, and more.',
    image: '/assets/howitworks-camera.jpg',
  },
  {
    title: 'Content Studio',
    desc: 'Edit, stage, host, and share listing media — turn a single capture into portal-ready photos, tours, videos, and websites.',
    image: '/assets/card5-website.png',
  },
]

export default function HowItWorks({ previewActive = null }) {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(previewActive ?? 0)
  const isPreview = previewActive != null

  useEffect(() => {
    if (isPreview) return
    let raf = 0
    const update = () => {
      raf = 0
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0
      setActive(p < 0.5 ? 0 : 1)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [isPreview])

  return (
    <section
      className="hiw"
      ref={sectionRef}
      style={{
        height: isPreview ? 'calc(100vh / var(--zoom, 1))' : 'calc(200vh / var(--zoom, 1))',
      }}
    >
      <div className="hiw__sticky">
        <div className="hiw__viewport">
          <div className="hiw__content">
            <h2 className="hiw__heading">
              Capture the property once. Finish the listing media in Content Studio.
            </h2>

            <div className="hiw__items">
              {ITEMS.map((item, i) => (
                <div key={item.title}>
                  {i > 0 && <div className="hiw__divider" />}
                  <button
                    type="button"
                    className={`hiw__item${active === i ? ' is-active' : ''}`}
                    onClick={() => !isPreview && setActive(i)}
                  >
                    <span className="hiw__itemHead">
                      <span className="hiw__itemTitle">{item.title}</span>
                      {active === i && <span className="hiw__dot" />}
                    </span>
                    <span className="hiw__itemDesc">
                      <span className="hiw__itemDescInner">{item.desc}</span>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="hiw__panel">
            {ITEMS.map((item, i) => (
              <img
                key={item.title}
                className={`hiw__panelImg${active === i ? ' is-active' : ''}`}
                src={item.image}
                alt=""
              />
            ))}
            <button className="hiw__explore" type="button">
              <span>Explore</span>
              <ArrowOutward size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
