"use client";

import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'

const SERVICES = [
  { label: 'Développement web', href: '/services#web' },
  { label: 'Solutions logicielles', href: '/services#logiciel' },
  { label: 'Produits SaaS', href: '/services#saas' },
  { label: 'Maintenance', href: '/services#maintenance' },
]
const LINKS = [
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Suivi projet', href: '/suivi' },
]
const STACK = ['Next.js', 'Laravel', 'Nextjs', 'PostgreSQL', 'Render', 'Vercel']

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: 'var(--color-ink-2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

      {/* CTA band */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-290 mx-auto px-5 md:px-10 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="flex items-center gap-3 mb-4 text-[11px] tracking-[0.15em] uppercase font-medium"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-brand)' }}>
              <span className="block w-5 h-px" style={{ background: 'var(--color-brand)' }} />
              Prêt à démarrer ?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)' }}>
              Votre prochain projet<br />
              <span className="text-shimmer">commence ici.</span>
            </h2>
          </div>
          <Link href="/contact"
            className="shrink-0 inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-2xl no-underline transition-all duration-300 hover:opacity-90 hover:shadow-(--shadow-brand)"
            style={{ background: 'var(--color-brand)' }}>
            Discutons-en <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-290 mx-auto px-5 md:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 w-fit no-underline group">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'var(--color-brand)' }}>
                <span className="text-white font-bold text-sm leading-none"
                  style={{ fontFamily: 'var(--font-display)' }}>G</span>
              </div>
              <span className="font-semibold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)' }}>
                Gratias <span className="font-light" style={{ color: 'var(--color-brand)' }}>Technology</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-55 mb-6"
              style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}>
              Solutions digitales sur mesure pour entreprises ambitieuses.
            </p>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:contact@gratiastechnology.com"
                className="flex items-center gap-2 text-sm no-underline transition-colors duration-200"
                style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--color-paper)')}
                onMouseOut={e => (e.currentTarget.style.color = 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)')}>
                <Mail size={13} style={{ color: 'var(--color-brand)', flexShrink: 0 }} />
                contact@gratiastechnology.com
              </a>
              <span className="flex items-center gap-2 text-sm"
                style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}>
                <MapPin size={13} style={{ color: 'var(--color-brand)', flexShrink: 0 }} />
                Lomé, Togo
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-[10px] tracking-widest uppercase mb-5"
              style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 30%, transparent)' }}>
              Services
            </p>
            <ul className="flex flex-col gap-3 list-none">
              {SERVICES.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm no-underline transition-colors duration-200"
                    style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}
                    onMouseOver={e => (e.currentTarget.style.color = 'var(--color-paper)')}
                    onMouseOut={e => (e.currentTarget.style.color = 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[10px] tracking-widest uppercase mb-5"
              style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 30%, transparent)' }}>
              Navigation
            </p>
            <ul className="flex flex-col gap-3 list-none">
              {LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm no-underline transition-colors duration-200"
                    style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}
                    onMouseOver={e => (e.currentTarget.style.color = 'var(--color-paper)')}
                    onMouseOut={e => (e.currentTarget.style.color = 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <p className="text-[10px] tracking-widest uppercase mb-5"
              style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 30%, transparent)' }}>
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {STACK.map(t => (
                <span key={t}
                  className="text-[10px] tracking-wide px-2.5 py-1 rounded-md border"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'var(--color-ink-3)',
                    color: 'color-mix(in srgb, var(--color-paper-3) 45%, transparent)',
                    borderColor: 'rgba(255,255,255,0.06)',
                  }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-[11px] tracking-wide"
            style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 25%, transparent)' }}>
            © {year} Gratias Technology — Lomé, Togo
          </p>
          <p className="text-[11px] tracking-wide"
            style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 25%, transparent)' }}>
            Next.js + Laravel
          </p>
        </div>
      </div>

    </footer>
  )
}