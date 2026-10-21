/*
 * Google Material Symbols — Outlined, weight 300, optical size 24, grade 0, no fill.
 * Matches the icons exported in the Figma file
 * (e.g. `arrow_outward_24dp_1F1F1F_FILL0_wght300_GRAD0_opsz24`).
 * Path data sourced from @material-symbols/svg-300/outlined.
 */

function Icon({ path, size = 24, className, title, style }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={className}
      style={style}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <path d={path} />
    </svg>
  )
}

const PATHS = {
  arrowOutward:
    'M241.62-258.69 210-290.31l413.92-414.31H241.31V-750h460v460h-45.39v-382.62l-414.3 413.93Z',
  playArrow: 'M340-238.39v-487.68l383.07 243.84L340-238.39Z',
  chevronForward:
    'M536.92-480.62 342.77-675.15l32.61-32.62 226.77 227.15-226.77 226.77-32.61-32.61 194.15-194.16Z',
  checkSmall:
    'M400-328.39 259.31-469.08l31.61-31.61L400-391.61l269.08-269.08 31.61 31.61L400-328.39Z',
}

export const ArrowOutward = (props) => <Icon path={PATHS.arrowOutward} {...props} />
export const PlayArrow = (props) => <Icon path={PATHS.playArrow} {...props} />
export const ChevronForward = (props) => <Icon path={PATHS.chevronForward} {...props} />
export const CheckSmall = (props) => <Icon path={PATHS.checkSmall} {...props} />

export default Icon

/* ---- Simple stroke icons (24px grid, 1.5px stroke) for the program flow ---- */
function Stroke({ children, size = 24, className, style, title, strokeWidth = 1.5 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

export const Close = (p) => (
  <Stroke {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Stroke>
)
export const ArrowBack = (p) => (
  <Stroke {...p} strokeWidth={1.8}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </Stroke>
)
export const ExpandMore = (p) => (
  <Stroke {...p} strokeWidth={2}>
    <path d="M6 9l6 6 6-6" />
  </Stroke>
)
export const ContentCopy = (p) => (
  <Stroke {...p}>
    <rect x="9" y="9" width="11" height="11" rx="1.5" />
    <path d="M15 9V5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15H9" />
  </Stroke>
)
export const QrCode = (p) => (
  <Stroke {...p}>
    <rect x="4" y="4" width="6" height="6" rx="1" />
    <rect x="14" y="4" width="6" height="6" rx="1" />
    <rect x="4" y="14" width="6" height="6" rx="1" />
    <path d="M14 14h2v2h-2zM18 14h2M14 18h2M18 18h2v2M18 20h-2" />
  </Stroke>
)
export const Lightbulb = (p) => (
  <Stroke {...p}>
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V17h5v-1.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z" />
  </Stroke>
)
export const InfoCircle = (p) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 8v.5" />
  </Stroke>
)
export const Check = (p) => (
  <Stroke {...p} strokeWidth={2}>
    <path d="M5 12.5l5 5 9.5-10.5" />
  </Stroke>
)
export const ArrowForward = (p) => (
  <Stroke {...p} strokeWidth={1.8}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Stroke>
)
