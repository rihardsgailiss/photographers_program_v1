import { useState } from 'react'
import './AiFeature.css'

const PILLS = [
  'Virtual staging',
  'Virtual drone-style shots',
  'Twilight sky',
  'Realistic floor plans',
  'Video clips',
  'Object removal',
]

export default function AiFeature() {
  const [active, setActive] = useState(0)

  return (
    <section className="aifeature">
      <div className="aifeature__inner">
        <div className="aifeature__block">
          <h2 className="aifeature__heading">
            Built-in AI tools to edit, stage, and create more from every capture.
          </h2>
          <div className="aifeature__box">
            <img src="/assets/aifeature-box.png" alt="AI editing tools preview" />
          </div>
        </div>

        <div className="aifeature__tags">
          <div className="aifeature__pills">
            {PILLS.map((p, i) => (
              <button
                key={p}
                type="button"
                className={`aifeature__pill${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                {p}
              </button>
            ))}
          </div>
          <span className="aifeature__more">And more...</span>
        </div>
      </div>
    </section>
  )
}
