import { useEffect, useRef, useState } from 'react'

/* mm:ss countdown. The end time lives in a ref so StrictMode's double effect run
   and re-renders never double-tick. */
export default function useCountdown(seconds) {
  const endRef = useRef(0)
  const [left, setLeft] = useState(seconds)
  const [run, setRun] = useState(0)

  useEffect(() => {
    endRef.current = Date.now() + seconds * 1000
    setLeft(seconds)
    const id = setInterval(() => {
      const s = Math.max(0, Math.round((endRef.current - Date.now()) / 1000))
      setLeft(s)
      if (s === 0) clearInterval(id)
    }, 250)
    return () => clearInterval(id)
  }, [seconds, run])

  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  return { left, label: `${mm}:${ss}`, restart: () => setRun((r) => r + 1) }
}
