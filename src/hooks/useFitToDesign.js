import { useEffect } from 'react'

/*
 * Scales the fixed 1920px design canvas down to fit narrower desktop windows
 * using CSS `zoom` (never upscales beyond 1:1). Also exposes the scale factor
 * as the `--zoom` custom property so the pinned scroll sections can compensate
 * their `100vh` heights (which `zoom` would otherwise shrink).
 */
const DESIGN_WIDTH = 1920

export default function useFitToDesign(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const apply = () => {
      const z = Math.min(1, window.innerWidth / DESIGN_WIDTH)
      el.style.zoom = String(z)
      el.style.setProperty('--zoom', String(z))
    }

    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [ref])
}
