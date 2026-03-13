import type { Metadata } from 'next'
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const sora = Sora({
  variable: '--font-sora',
  subsets:  ['latin'],
  weight:   ['300', '400', '600', '700', '800'],
  display:  'swap',
})

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  display:  'swap',
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets:  ['latin'],
  weight:   ['400', '500'],
  display:  'swap',
})

export const metadata: Metadata = {
  title:       { default: 'Gratias Technology', template: '%s — Gratias Technology' },
  description: 'Développement web, solutions logicielles et produits SaaS sur mesure. Votre partenaire digital à Lomé.',
  metadataBase: new URL('https://gratiastechnology.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${sora.variable} ${jakarta.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}