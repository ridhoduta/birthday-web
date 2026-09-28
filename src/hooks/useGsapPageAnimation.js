import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapPageAnimation(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clickCleanups = []
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set('[data-gsap]', { clearProps: 'all' })
        return
      }

      const curtain = root.querySelector('[data-gsap="curtain"]')
      const text = root.querySelectorAll('[data-gsap~="text"]')
      const images = root.querySelectorAll('[data-gsap~="image"]')
      const stagger = root.querySelectorAll('[data-gsap~="stagger"]')
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (curtain) {
        intro.to(curtain, { scaleX: 0, transformOrigin: 'right center', duration: 0.65, ease: 'power4.inOut' })
      }

      if (text.length) {
        intro.fromTo(text, { y: 28, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.08, duration: 0.65 }, '-=0.35')
      }

      if (images.length) {
        intro.fromTo(images, { y: 24, opacity: 0, scale: 1.08, filter: 'blur(14px)' }, { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.9 }, '-=0.5')
      }

      if (stagger.length) {
        intro.fromTo(stagger, { y: 18, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.55 }, '-=0.5')
      }

      gsap.utils.toArray('[data-gsap~="parallax"]').forEach((element) => {
        gsap.to(element, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      root.querySelectorAll('[data-gsap-click]').forEach((element) => {
        const animateClick = () => {
          gsap.fromTo(element, { scale: 0.94 }, { scale: 1, duration: 0.45, ease: 'back.out(2)' })
          gsap.fromTo('[data-gsap="click-wipe"]', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', duration: 0.22, yoyo: true, repeat: 1 })
        }
        element.addEventListener('click', animateClick)
        clickCleanups.push(() => element.removeEventListener('click', animateClick))
      })
    }, root)

    return () => {
      clickCleanups.forEach((cleanup) => cleanup())
      ctx.revert()
    }
  }, [rootRef])
}
