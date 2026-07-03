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
