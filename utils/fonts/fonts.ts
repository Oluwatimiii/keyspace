import { Allura, Bebas_Neue, Inter, Playfair_Display, Roboto_Mono, Urbanist } from 'next/font/google'
 
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const allura = Allura({
  subsets: ['latin'],
  weight: "400",
  display: 'swap',
  variable: '--font-allura',
})

export const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-urbanist',
})
 
export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  weight: "400",
  display: 'swap',
  variable: '--font-bebas-neue',
})

export const playfair_display = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
})