import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'

export function useGsapTyping(rootRef, { active = true, selector = '[data-gsap-typing]', speed = 0.018, delay = 0 } = {}) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !active) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = [...root.querySelectorAll(selector)]
    if (!elements.length) return undefined

    const ctx = gsap.context(() => {
      elements.forEach((element) => {
        if (!element.dataset.typingText) {
          element.dataset.typingText = element.textContent || ''
        }
        element.textContent = reduceMotion ? element.dataset.typingText : ''
      })

      if (reduceMotion) return

      const timeline = gsap.timeline({ delay })
      elements.forEach((element, index) => {
        const text = element.dataset.typingText || ''
        const proxy = { length: 0 }

        timeline.to(proxy, {
          length: text.length,
          duration: Math.max(text.length * speed, 0.35),
          ease: 'none',
          onUpdate: () => {
            element.textContent = text.slice(0, Math.round(proxy.length))
          },
        }, index === 0 ? 0 : '+=0.12')
      })
    }, root)

    return () => ctx.revert()
  }, [active, delay, rootRef, selector, speed])
}
