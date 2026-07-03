import { useRef } from 'react'
import { PlayArrow, ChevronForward } from '../../components/icons/index.jsx'
import './PhotographersAgents.css'

const VIDEOS = [
  { img: 'vid1.png', title: 'Is This The Only Camera You Need For Real Estate Media?', author: 'Cole connor' },
  { img: 'vid2.png', title: 'How Giraffe360 Keeps 99% of Our Clients', author: 'Levi Glasner' },
  { img: 'vid3.png', title: 'I Thought Giraffe360 Was a 3D Tour Camera. I Was Wrong.', author: 'as it goes reviews' },
  { img: 'vid4.jpg', title: 'Make $$ With Real Estate Photography Packages', author: 'Agent Casey G' },
  { img: 'vid5.png', title: 'Giraffe Pro Camera Review. Property Photography Just Got CLEVER!', author: 'Nick Powell Photography' },
  { img: 'vid6.jpg', title: 'Real Estate Media PRO - Social Media is Changing the Business', author: 'Giraffe360 / Agent Casey G' },
  { img: 'vid7.jpg', title: 'Giraffe Pro Camera asset review with Realtor Mike Martin', author: 'Sparks media group' },
]

const STEP = 603 + 40

export default function PhotographersAgents() {
  const rowRef = useRef(null)
  const scrollBy = (dir) => {
    rowRef.current?.scrollBy({ left: dir * STEP, behavior: 'smooth' })
  }

  return (
    <section className="pa">
      <h2 className="pa__heading">Hear from photographers and agents using Giraffe360.</h2>

      <div className="pa__row" ref={rowRef}>
        {VIDEOS.map((v) => (
          <article className="pa__card" key={v.title}>
            <div className="pa__thumb">
              <img src={`/assets/${v.img}`} alt="" />
              <button className="pa__play" type="button" aria-label="Play video">
                <PlayArrow size={24} />
              </button>
            </div>
            <div className="pa__text">
              <p className="pa__title">{v.title}</p>
              <p className="pa__author">{v.author}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="pa__nav">
        <button className="pa__navBtn" type="button" aria-label="Previous" onClick={() => scrollBy(-1)}>
          <ChevronForward size={24} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button className="pa__navBtn" type="button" aria-label="Next" onClick={() => scrollBy(1)}>
          <ChevronForward size={24} />
        </button>
      </div>
    </section>
  )
}
