'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const NAV = [
  { href: '/services',     label: 'Services'     },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/blog',         label: 'Blog'          },
  { href: '/suivi',        label: 'Suivi projet' },
]

const EXPO = [0.16, 1, 0.3, 1] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const active = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[color-mix(in_srgb,var(--color-ink)_88%,transparent)] backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent',
        ].join(' ')}
        style={{ height: 'var(--spacing-nav)' }}
      >
        <div className="max-w-290 mx-auto px-5 md:px-10 h-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group no-underline">
            <div
              className="w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:shadow-(--shadow-brand-sm)"
              style={{ background: 'var(--color-brand)' }}
            >
              <span
                className="text-white font-bold text-[17px] leading-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >G</span>
            </div>
            <span style={{ fontFamily: 'var(--font-display)' }}
              className="font-semibold tracking-tight text-[1.05rem] text-(--color-paper)">
              Gratias
              <span className="font-light ml-1.5 text-sm" style={{ color: 'var(--color-brand)' }}>
                Technology
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(({ href, label }) => (
              <Link key={href} href={href} className={`nav-link ${active(href) ? 'active' : ''}`}>
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link href="/contact"
              className="inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl no-underline transition-all duration-300 hover:opacity-90 hover:shadow-(--shadow-brand-sm)"
              style={{ background: 'var(--color-brand)' }}>
              Démarrer un projet
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg transition-colors duration-200 hover:bg-white/5"
            style={{ color: 'var(--color-paper)' }}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open
                ? <motion.div key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={22} />
                  </motion.div>
                : <motion.div key="m"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={22} />
                  </motion.div>
              }
            </AnimatePresence>
          </button>

        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col backdrop-blur-xl"
            style={{ top: 'var(--spacing-nav)', background: 'color-mix(in srgb, var(--color-ink) 97%, transparent)' }}
          >
            <motion.div
              className="max-w-290 mx-auto px-5 py-6 flex flex-col flex-1"
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {NAV.map(({ href, label }) => (
                <motion.div key={href}
                  variants={{
                    hidden:  { x: -20, opacity: 0 },
                    visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: EXPO } },
                  }}>
                  <Link href={href}
                    className="flex items-center justify-between py-5 no-underline group"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span
                      className={`text-3xl font-bold transition-colors duration-200 ${active(href) ? '' : 'opacity-50 group-hover:opacity-100'}`}
                      style={{ fontFamily: 'var(--font-display)', color: active(href) ? 'var(--color-brand-l)' : 'var(--color-paper)' }}>
                      {label}
                    </span>
                    <ArrowUpRight size={20}
                      style={{ color: active(href) ? 'var(--color-brand)' : 'rgba(255,255,255,0.15)' }}
                      className="group-hover:text-(--color-brand) transition-colors" />
                  </Link>
                </motion.div>
              ))}

              <motion.div className="mt-auto py-6"
                variants={{
                  hidden:  { y: 12, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.22 } },
                }}>
                <Link href="/contact"
                  className="flex items-center justify-center gap-2 text-white font-semibold py-4 rounded-2xl text-base no-underline"
                  style={{ background: 'var(--color-brand)' }}>
                  Démarrer un projet <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}