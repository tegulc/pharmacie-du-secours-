import { useEffect, useRef } from 'react'

export function useScrollReveal(selector = '.reveal, .reveal-left, .reveal-right') {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [selector])
}

export function useCounter(end, duration = 2000) {
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const el = ref.current
        if (!el) return
        let start = 0
        const step = Math.ceil(end / (duration / 30))
        const timer = setInterval(() => {
          start = Math.min(start + step, end)
          el.textContent = start.toLocaleString()
          if (start >= end) clearInterval(timer)
        }, 30)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])

  return ref
}
