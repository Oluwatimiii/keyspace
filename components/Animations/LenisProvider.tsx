'use client'

import { ReactNode } from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  useEffect(() => {
    const animate = (time: number) => {
      ScrollTrigger.update()
      window.requestAnimationFrame(animate)
    }

    const animationId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationId)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <ReactLenis
      root
      options={{
        duration: 2.4,  // Increased for slower, smoother scrolling
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        infinite: false
      }}
    >
      {children}
    </ReactLenis>
  )
}