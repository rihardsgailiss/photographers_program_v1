export const digitsOnly = (s) => String(s ?? '').replace(/\D/g, '')

/* "4242424242424242" -> "4242 4242 4242 4242" (max 19 digits) */
export function formatCard(s) {
  return digitsOnly(s).slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1 ')
}

/* "1229" -> "12/29" */
export function formatExpiry(s) {
  const d = digitsOnly(s).slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

export const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s ?? '').trim())
