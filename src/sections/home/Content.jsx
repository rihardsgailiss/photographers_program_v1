import { useEffect, useRef, useState } from 'react'
import { ArrowOutward } from '../../components/icons/index.jsx'
import './Content.css'

/* Card copy (matches Figma nodes 1:318 – 1:363) */
const CARDS = [
  {
    id: '01',
    title: 'HDR real estate photos',
    desc: 'Edited, portal-ready property photos with HDR processing, colour profiles, and tools for staging, sky replacement, object removal, and more.',
  },
  {
    id: '02',
    title: 'Floor plans',
    desc: 'Clear 2D and 3D floor plans from real capture data, prepared to support local measurement standards.',
  },
  {
    id: '03',
    title: '360 virtual tours',
    desc: 'Polished HDR 360 virtual tours that help buyers explore the property from any device.',
  },
  {
    id: '04',
    title: 'Real estate videos',
    desc: 'Create listing videos, short social clips, and virtual drone-style walkthroughs without a separate video shoot.',
  },
  {
    id: '05',
    title: 'Property websites',
    desc: 'A hosted listing page that brings photos, tours, floor plans, videos, property details, and enquiries together.',
  },
  {
    id: '06',
    title: 'Real estate marketing assets',
    desc: 'Turn listing media into ready-to-use social posts, emails, flyers, brochures, and campaign content.',
  },
]

/* Row = 6 cards (912) + 5 gaps (170) = 6322px. Visible span inside the 1920
   canvas from the 504px left inset to the 40px right gutter = 1376px. */
const MAX_TRANSLATE = 6322 - (1920 - 504 - 40) // 4946
const SLIDER_TRAVEL = 912 - 120 // active bar travel

function CardMedia({ card }) {
  switch (card.id) {
    case '01':
      return <img className="ccard__flat" src="/assets/card-01.png" alt="" />
    case '02':
      return (
        <div className="ccard__media ccard__media--white">
          <img className="ccard__floorplan" src="/assets/card2-floorplan.png" alt="" />
        </div>
      )
    case '03':
      return (
        <div className="ccard__media ccard__media--grey">
          <img className="ccard__cover" style={{ width: 938, height: 625, left: -13, top: -56 }} src="/assets/card3-360.jpg" alt="" />
        </div>
      )
    case '04':
      return (
        <div className="ccard__media ccard__media--grey">
          <img className="ccard__cover" style={{ width: 919, height: 612, left: -5, top: -50 }} src="/assets/card4-video.jpg" alt="" />
        </div>
      )
    case '05':
      return (
        <div className="ccard__media ccard__media--white">
          <img className="ccard__website" src="/assets/card5-website.png" alt="" />
        </div>
      )
    case '06':
      return (
        <div className="ccard__media ccard__media--white">
          <div className="ig ig--side ig--left">
            <img src="/assets/card6-photo.jpg" alt="" />
          </div>
          <div className="ig ig--side ig--right">
            <img src="/assets/card6-photo.jpg" alt="" />
          </div>
          <div className="ig ig--center">
            <div className="ig__header">
              <span className="ig__logo" />
              <span className="ig__user">
                <b>Giraffe360</b>
                <i>Wichita, Kansas</i>
              </span>
            </div>
            <div className="ig__post">
              <img src="/assets/card6-photo.jpg" alt="" />
            </div>
            <div className="ig__banner">
              <img src="/assets/ig-heart.svg" alt="" width={23} height={23} />
              <img src="/assets/ig-chat.svg" alt="" width={23} height={23} />
              <img src="/assets/ig-send.svg" alt="" width={23} height={23} />
              <img className="ig__bookmark" src="/assets/ig-bookmark.svg" alt="" width={23} height={23} />
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}

export default function Content({ previewProgress = null }) {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(previewProgress ?? 0)
  const isPreview = previewProgress != null

  useEffect(() => {
    if (isPreview) return
    let raf = 0
    const update = () => {
      raf = 0
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // rect.height/top are post-zoom (real viewport px) — keeps math zoom-safe.
      const scrollable = rect.height - window.innerHeight
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0
      setProgress(p)
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
      className="content"
      ref={sectionRef}
      style={{
        height: isPreview
          ? 'calc(100vh / var(--zoom, 1))'
          : `calc(100vh / var(--zoom, 1) + ${MAX_TRANSLATE}px)`,
      }}
    >
      <div className="content__sticky">
        <div className="content__viewport">
          <div
            className="content__track"
            style={{ transform: `translateX(${-progress * MAX_TRANSLATE}px)` }}
          >
            {CARDS.map((card) => (
              <article className="ccard" key={card.id}>
                <div className="ccard__container">
                  <CardMedia card={card} />
                  {card.id !== '01' && (
                    <button className="ccard__arrow" type="button" aria-label={card.title}>
                      <ArrowOutward size={24} />
                    </button>
                  )}
                </div>
                <div className="ccard__text">
                  <h3 className="ccard__title">{card.title}</h3>
                  <p className="ccard__desc">{card.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="content__slider">
            <div
              className="content__sliderActive"
              style={{ transform: `translateX(${progress * SLIDER_TRAVEL}px)` }}
            />
            <div className="content__sliderFill" />
          </div>
        </div>
      </div>
    </section>
  )
}
