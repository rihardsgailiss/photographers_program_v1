import { PROGRAM_STEPS } from '../../data/programSteps.js'
import './ProgramSteps.css'

export default function ProgramSteps() {
  return (
    <section className="programSteps">
      <div className="programSteps__inner">
        <h2 className="programSteps__title">How the program works</h2>
        <div className="programSteps__grid">
          {PROGRAM_STEPS.map((s) => (
            <article className="programSteps__card" key={s.title}>
              <p className="programSteps__label">{s.label}</p>
              <h3 className="programSteps__cardTitle">{s.title}</h3>
              <p className="programSteps__body">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
