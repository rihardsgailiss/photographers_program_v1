import { useRef, useState } from 'react'

/* One-time-code input: N single-digit boxes with auto-advance, backspace-back and paste. */
export default function useCodeInput(length = 6, onComplete) {
  const [digits, setDigits] = useState(() => Array(length).fill(''))
  const refs = useRef([])

  const commit = (next) => {
    setDigits(next)
    if (next.every(Boolean)) onComplete?.(next.join(''))
  }

  const onChange = (i) => (e) => {
    const v = e.target.value.replace(/\D/g, '')
    const next = [...digits]
    if (!v) {
      next[i] = ''
      setDigits(next)
      return
    }
    const chars = v.split('')
    for (let k = 0; k < chars.length && i + k < length; k += 1) next[i + k] = chars[k]
    commit(next)
    refs.current[Math.min(length - 1, i + chars.length)]?.focus()
  }

  const onKeyDown = (i) => (e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus()
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus()
  }

  const onPaste = (e) => {
    const text = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, length)
    if (!text) return
    e.preventDefault()
    const next = Array.from({ length }, (_, k) => text[k] ?? '')
    commit(next)
    refs.current[Math.min(length - 1, text.length)]?.focus()
  }

  const bind = (i) => ({
    ref: (el) => {
      refs.current[i] = el
    },
    value: digits[i],
    onChange: onChange(i),
    onKeyDown: onKeyDown(i),
    onPaste,
    onFocus: (e) => e.target.select(),
    inputMode: 'numeric',
    autoComplete: i === 0 ? 'one-time-code' : 'off',
    maxLength: length,
  })

  return { digits, bind, focusFirst: () => refs.current[0]?.focus() }
}
