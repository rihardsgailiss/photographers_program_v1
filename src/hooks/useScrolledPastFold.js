import { useEffect, useState } from 'react'

/*
 * Header scroll state:
 *  - scrolled:  true as soon as the user starts scrolling — drives the frosted
 *               background fading in.
 *  - pastFold:  true after roughly the first fold — reveals the right-corner
 *               CTA buttons.
 */
export default function useHeaderScroll(foldRatio = 0.85) {
  const [state, setState] = useState({ scrolled: false, pastFold: false })

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setState({
        scrolled: y > 8,
        pastFold: y > window.innerHeight * foldRatio,
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [foldRatio])

  return state
}
