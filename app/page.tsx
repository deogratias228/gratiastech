'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowUpRight, ArrowRight, Globe, Code2, Layers, Wrench,
  ScanLine, CheckCircle2, MessageSquare, Rocket, ChevronDown,
} from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1] as const

/* ── helpers ── */
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="flex items-center gap-3 mb-5 text-[11px] tracking-[0.15em] uppercase font-medium"
    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-brand)' }}>
    <span className="block w-5 h-px shrink-0" style={{ background: 'var(--color-brand)' }} />
    {children}
  </p>
)

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] tracking-wide px-2.5 py-0.75 rounded-md border"
    style={{
      fontFamily: 'var(--font-mono)',
      background: 'var(--color-ink-3)',
      color: 'color-mix(in srgb, var(--color-paper-3) 55%, transparent)',
      borderColor: 'rgba(255,255,255,0.07)',
    }}>
    {children}
  </span>
)

/* ── Marquee ── */
const TECH = ['Next.js', '·', 'Laravel', '·', 'React', '·', 'SaaS', '·', 'API REST', '·', 'PostgreSQL', '·', 'Stripe', '·', 'Vercel', '·', 'TypeScript', '·']
function Marquee() {
  const items = [...TECH, ...TECH]
  return (
    <div className="overflow-hidden py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'var(--color-ink-2)' }}>
      <div className="flex gap-10 w-max marquee">
        {items.map((item, i) => (
          <span key={i}
            className="text-[10px] tracking-[0.18em] uppercase whitespace-nowrap select-none"
            style={{
              fontFamily: 'var(--font-mono)',
              color: item === '·' ? 'var(--color-brand)' : 'color-mix(in srgb, var(--color-paper-3) 28%, transparent)',
            }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Hero ── */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: 'var(--spacing-nav)' }}>

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }} />

      {/* Glow */}
      <motion.div className="absolute pointer-events-none rounded-full"
        style={{
          top: '40%', left: '50%', width: 720, height: 720,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(26,111,212,0.11) 0%, transparent 65%)',
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating orbs */}
      <motion.div className="absolute pointer-events-none rounded-full blur-3xl"
        style={{ top: '22%', right: '22%', width: 180, height: 180, background: 'rgba(26,111,212,0.06)' }}
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div className="max-w-290 mx-auto px-5 md:px-10 relative z-10 pb-24"
        style={{ y, opacity }}>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EXPO }}>
          <Label>Développement & Ingénierie</Label>
        </motion.div>

        <div className="mb-7 overflow-hidden">
          {[
            { text: 'Des solutions', italic: false, accent: false },
            { text: 'digitales qui', italic: true, accent: false },
            { text: 'fonctionnent.', italic: false, accent: true },
          ].map(({ text, italic, accent }, i) => (
            <div key={text} className="overflow-hidden">
              <motion.h1
                className={`block leading-[0.93] tracking-tight ${italic ? 'italic' : ''}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem,9vw,6.5rem)',
                  fontWeight: accent ? 800 : 700,
                  color: accent ? 'var(--color-brand-l)' : 'var(--color-paper)',
                }}
                initial={{ y: '115%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.06 + i * 0.1, ease: EXPO }}>
                {text}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.p className="text-lg md:text-xl max-w-lg leading-relaxed mb-10"
          style={{ color: 'color-mix(in srgb, var(--color-paper-3) 55%, transparent)' }}
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: EXPO }}>
          Nous concevons et développons des sites web, applications et produits SaaS sur mesure — pour les entreprises qui veulent aller vite sans sacrifier la qualité.
        </motion.p>

        <motion.div className="flex flex-wrap gap-4 items-center mb-20"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52, ease: EXPO }}>
          <Link href="/contact"
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-2xl no-underline transition-all duration-300 hover:opacity-90 hover:shadow-(--shadow-brand) group"
            style={{ background: 'var(--color-brand)', fontSize: '0.9375rem' }}>
            Démarrer un projet
            <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link href="/realisations"
            className="inline-flex items-center gap-2 font-medium no-underline transition-colors duration-200 group"
            style={{ color: 'color-mix(in srgb, var(--color-paper-3) 55%, transparent)', fontSize: '0.9375rem' }}
            onMouseOver={e => (e.currentTarget.style.color = 'var(--color-paper)')}
            onMouseOut={e => (e.currentTarget.style.color = 'color-mix(in srgb, var(--color-paper-3) 55%, transparent)')}>
            Voir nos réalisations
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div className="flex flex-wrap w-fit rounded-2xl overflow-hidden border"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.66, ease: EXPO }}>
          {[
            { value: '10+', label: 'Projets livrés' },
            { value: '100%', label: 'Satisfaction client' },
            { value: '24h', label: 'Délai de réponse' },
          ].map(({ value, label }, i) => (
            <motion.div key={label}
              className="px-8 py-5 border-r last:border-r-0"
              style={{ background: 'var(--color-ink-2)', borderColor: 'rgba(255,255,255,0.06)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.74 + i * 0.07 }}>
              <div className="text-4xl font-extrabold leading-none mb-1"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-brand-l)' }}>
                {value}
              </div>
              <div className="text-[10px] tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 30%, transparent)' }}>
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>

      {/* Scroll cue */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'color-mix(in srgb, var(--color-paper-3) 20%, transparent)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        <span className="text-[9px] tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ── Services ── */
const SERVICES = [
  { Icon: Globe, id: 'web', title: 'Développement web', desc: 'Sites, plateformes e-commerce et apps web — conçus pour performer et convertir.', tags: ['Next.js', 'Laravel', 'WordPress'] },
  { Icon: Code2, id: 'logiciel', title: 'Solutions logicielles', desc: 'Applications métier, APIs et intégrations systèmes — architecturés pour durer.', tags: ['API REST', 'Microservices', 'Cloud'] },
  { Icon: Layers, id: 'saas', title: 'Produits SaaS', desc: "De l'idée au lancement : multi-tenant, facturation, onboarding, dashboards.", tags: ['Multi-tenant', 'Stripe', 'Auth'] },
  { Icon: Wrench, id: 'maintenance', title: 'Maintenance & Support', desc: 'Suivi continu, sécurité, performances. Votre partenaire technique de confiance.', tags: ['Support', 'Monitoring', 'Sécurité'] },
]

function ServicesSection() {
  return (
    <section className="py-28 lg:py-36" style={{ background: 'var(--color-ink)' }}>
      <div className="max-w-290 mx-auto px-5 md:px-10">
        <div className="flex justify-between items-end flex-wrap gap-6 mb-14">
          <div>
            <Label>Ce que nous faisons</Label>
            <h2 className="text-[clamp(1.875rem,4vw,2.875rem)] font-bold leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)' }}>
              Nos domaines<br className="hidden sm:block" /> d'expertise
            </h2>
          </div>
          <Link href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium no-underline transition-colors duration-200 group"
            style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}
            onMouseOver={e => (e.currentTarget.style.color = 'var(--color-paper)')}
            onMouseOut={e => (e.currentTarget.style.color = 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)')}>
            Tous les services
            <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-2xl overflow-hidden border"
          style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.05)' }}>
          {SERVICES.map(({ Icon, id, title, desc, tags }, i) => (
            <motion.div key={id}
              className="flex flex-col gap-5 p-8 cursor-default transition-colors duration-300"
              style={{ background: 'var(--color-ink)' }}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EXPO }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-ink-2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-ink)')}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(26,111,212,0.1)', border: '1px solid rgba(26,111,212,0.2)' }}>
                <Icon size={20} strokeWidth={1.5} style={{ color: 'var(--color-brand)' }} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)' }}>{title}</h3>
                <p className="text-sm leading-relaxed"
                  style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}>{desc}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Process ── */
const STEPS = [
  { Icon: MessageSquare, num: '01', title: 'Échange initial', desc: 'On discute de votre projet, vos objectifs et contraintes. Réponse sous 24h, sans engagement.' },
  { Icon: CheckCircle2, num: '02', title: 'Proposition claire', desc: 'Devis détaillé, planning et jalons définis. Pas de frais cachés, pas de mauvaises surprises.' },
  { Icon: Rocket, num: '03', title: 'Livraison & suivi', desc: 'Développement itératif avec visibilité complète. Vous suivez chaque étape en temps réel.' },
]

function ProcessSection() {
  return (
    <section className="py-28 lg:py-36" style={{ background: 'var(--color-ink-2)' }}>
      <div className="max-w-290 mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, ease: EXPO }}>
              <Label>Comment on travaille</Label>
            </motion.div>
            <motion.h2
              className="text-[clamp(2rem,4vw,2.875rem)] font-bold leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08, ease: EXPO }}>
              Simple, transparent,<br />
              <span className="italic" style={{ color: 'var(--color-brand-l)' }}>sans surprise.</span>
            </motion.h2>
            <motion.p className="mt-5 text-base leading-relaxed max-w-sm"
              style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.2 }}>
              Pas de jargon. Pas de surprises en cours de route. Juste un travail sérieux livré dans les délais.
            </motion.p>
          </div>

          <div className="flex flex-col">
            {STEPS.map(({ Icon, num, title, desc }, i) => (
              <motion.div key={num}
                className="flex gap-5 py-7 group"
                style={{ borderBottom: i < STEPS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EXPO }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{
                    background: 'var(--color-ink)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,111,212,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,111,212,0.3)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-ink)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)' }}>
                  <Icon size={18} strokeWidth={1.5} style={{ color: 'var(--color-brand)' }} />
                </div>
                <div className="pt-0.5">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-[10px] tracking-widest"
                      style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 22%, transparent)' }}>
                      {num}
                    </span>
                    <span className="font-semibold text-[0.9375rem]"
                      style={{ color: 'var(--color-paper)' }}>{title}</span>
                  </div>
                  <p className="text-sm leading-relaxed"
                    style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Tracking ── */
const MOCK_STEPS = [
  { label: 'Cahier des charges', s: 'done' },
  { label: 'Design UI/UX', s: 'done' },
  { label: 'Développement backend', s: 'active' },
  { label: 'Développement frontend', s: 'pending' },
  { label: 'Mise en production', s: 'pending' },
]

function TrackingSection() {
  return (
    <section className="py-28 lg:py-36" style={{ background: 'var(--color-ink)' }}>
      <div className="max-w-290 mx-auto px-5 md:px-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center rounded-3xl p-8 md:p-12 overflow-hidden relative"
          style={{ background: 'var(--color-ink-2)', border: '1px solid rgba(255,255,255,0.05)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EXPO }}>

          {/* bg glow */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(26,111,212,0.07) 0%, transparent 65%)' }} />

          {/* Left */}
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
              style={{ background: 'rgba(26,111,212,0.1)', border: '1px solid rgba(26,111,212,0.2)' }}>
              <ScanLine size={22} strokeWidth={1.5} style={{ color: 'var(--color-brand)' }} />
            </div>
            <Label>Transparence totale</Label>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)' }}>
              Suivez votre projet<br />
              <span className="italic" style={{ color: 'var(--color-brand-l)' }}>en temps réel.</span>
            </h2>
            <p className="text-base leading-relaxed mb-7 max-w-sm"
              style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}>
              Chaque client reçoit un code unique. Consultez l'avancement, les étapes et les prochaines phases — sans compte nécessaire.
            </p>
            <Link href="/suivi"
              className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl no-underline text-sm transition-all duration-300 hover:opacity-90"
              style={{ background: 'var(--color-brand)' }}>
              Suivre mon projet <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Card mock */}
          <motion.div className="rounded-2xl p-6 relative z-10"
            style={{ background: 'var(--color-ink-3)', border: '1px solid rgba(255,255,255,0.06)' }}
            whileHover={{ scale: 1.015 }} transition={{ duration: 0.3 }}>

            <div className="flex justify-between items-center mb-5">
              <span className="text-[10px] tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 28%, transparent)' }}>
                Code de suivi
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-lg"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-brand)',
                  background: 'rgba(26,111,212,0.1)',
                  border: '1px solid rgba(26,111,212,0.2)',
                }}>
                GT-2024-001
              </span>
            </div>

            <p className="font-semibold mb-1" style={{ color: 'var(--color-paper)' }}>
              Site vitrine e-commerce
            </p>
            <p className="text-[10px] tracking-widest uppercase mb-5"
              style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 28%, transparent)' }}>
              Développement web
            </p>

            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 28%, transparent)' }}>
                  Avancement
                </span>
                <span className="text-sm font-bold"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-brand)' }}>40%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-ink-4)' }}>
                <motion.div className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--color-brand), var(--color-brand-l))' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '40%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: EXPO }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {MOCK_STEPS.map(({ label, s }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${s === 'active' ? 'pulseglow' : ''}`}
                    style={{
                      background: s === 'done' ? 'var(--color-success)'
                        : s === 'active' ? 'var(--color-brand)'
                          : 'rgba(255,255,255,0.1)',
                    }} />
                  <span className="text-sm"
                    style={{
                      color: s === 'active' ? 'var(--color-paper)'
                        : s === 'done' ? 'color-mix(in srgb, var(--color-paper-3) 35%, transparent)'
                          : 'color-mix(in srgb, var(--color-paper-3) 22%, transparent)',
                      textDecoration: s === 'done' ? 'line-through' : 'none',
                      fontWeight: s === 'active' ? 500 : 400,
                    }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── CTA ── */
function ContactCTA() {
  return (
    <section className="py-28 lg:py-36" style={{ background: 'var(--color-ink-2)' }}>
      <div className="max-w-290 mx-auto px-5 md:px-10">
        <motion.div className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EXPO }}>
          <Label>Votre projet</Label>
          <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] mb-5"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)' }}>
            Une idée en tête ?<br />
            <span className="italic" style={{ color: 'var(--color-brand-l)' }}>Parlons-en.</span>
          </h2>
          <p className="text-lg leading-relaxed mb-10 max-w-lg mx-auto"
            style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}>
            Décrivez votre projet. Nous vous répondons sous 24h avec une proposition claire, sans engagement.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact"
              className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-2xl no-underline transition-all duration-300 hover:opacity-90 hover:shadow-(--shadow-brand)"
              style={{ background: 'var(--color-brand)', fontSize: '0.9375rem' }}>
              Démarrer un projet <ArrowUpRight size={16} />
            </Link>
            <a href="mailto:contact@gratiastechnology.com"
              className="inline-flex items-center gap-2 font-medium px-8 py-4 rounded-2xl no-underline transition-all duration-300"
              style={{
                fontSize: '0.9375rem',
                color: 'color-mix(in srgb, var(--color-paper-3) 60%, transparent)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-paper)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = 'color-mix(in srgb, var(--color-paper-3) 60%, transparent)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)' }}>
              Envoyer un mail
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return <>
    <Hero />
    <Marquee />
    <ServicesSection />
    <ProcessSection />
    <TrackingSection />
    <ContactCTA />
  </>
}