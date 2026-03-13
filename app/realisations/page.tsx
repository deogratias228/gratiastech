'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1] as const

const Label = ({ children, center }: { children: React.ReactNode; center?: boolean }) => (
    <p className={`flex items-center gap-3 mb-5 text-[11px] tracking-[0.15em] uppercase font-medium ${center ? 'justify-center' : ''}`}
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-brand)' }}>
        <span className="block w-5 h-px shrink-0" style={{ background: 'var(--color-brand)' }} />
        {children}
    </p>
)

const Tag = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[10px] tracking-wide px-2.5 py-0.75 rounded-md border"
        style={{ fontFamily: 'var(--font-mono)', background: 'var(--color-ink-3)', color: 'color-mix(in srgb, var(--color-paper-3) 55%, transparent)', borderColor: 'rgba(255,255,255,0.07)' }}>
        {children}
    </span>
)

type Filter = 'all' | 'web_development' | 'software' | 'saas'

const FILTERS: { id: Filter; label: string }[] = [
    { id: 'all', label: 'Tous' },
    { id: 'web_development', label: 'Web' },
    { id: 'software', label: 'Logiciel' },
    { id: 'saas', label: 'SaaS' },
]

const PROJECTS = [
    { id: 'gt-001', title: 'Plateforme e-commerce', client: 'Boutique Mode', type: 'web_development' as Filter, desc: 'Boutique multi-catégories avec paiement Stripe, gestion des stocks et dashboard vendeur.', tags: ['Next.js', 'Laravel', 'Stripe'], year: '2024', grad: 'from-[rgba(26,111,212,0.22)] to-[rgba(26,111,212,0.04)]' },
    { id: 'gt-002', title: 'CRM métier', client: 'Agence Immobilière', type: 'software' as Filter, desc: "Gestion clients, biens et contrats. Suivi des leads et automatisation des relances.", tags: ['Laravel', 'React', 'PostgreSQL'], year: '2024', grad: 'from-[rgba(139,92,246,0.18)] to-[rgba(26,111,212,0.06)]' },
    { id: 'gt-003', title: 'Outil de facturation SaaS', client: 'PME', type: 'saas' as Filter, desc: 'Facturation multi-tenant avec abonnements, exports PDF et intégration comptable.', tags: ['Next.js', 'Stripe', 'Multi-tenant'], year: '2023', grad: 'from-[rgba(16,185,129,0.18)] to-[rgba(26,111,212,0.06)]' },
    { id: 'gt-004', title: 'Site institutionnel', client: 'ONG Togo', type: 'web_development' as Filter, desc: 'Site vitrine avec CMS headless, blog, formulaire de don et version multilingue FR/EN.', tags: ['Next.js', 'Sanity', 'Vercel'], year: '2023', grad: 'from-[rgba(245,158,11,0.18)] to-[rgba(26,111,212,0.06)]' },
    { id: 'gt-005', title: 'API logistique', client: 'Transporteur', type: 'software' as Filter, desc: 'API de suivi de livraisons en temps réel intégrée à plusieurs partenaires et applications mobiles.', tags: ['Laravel', 'REST API', 'WebSocket'], year: '2023', grad: 'from-[rgba(239,68,68,0.16)] to-[rgba(26,111,212,0.06)]' },
    { id: 'gt-006', title: 'Plateforme RH SaaS', client: 'Startup RH', type: 'saas' as Filter, desc: 'Gestion des congés, notes de frais, paie simplifiée et analytics RH pour PMEs africaines.', tags: ['Next.js', 'Laravel', 'Stripe'], year: '2024', grad: 'from-[rgba(6,182,212,0.18)] to-[rgba(26,111,212,0.06)]' },
]

export default function RealisationsPage() {
    const [active, setActive] = useState<Filter>('all')
    const visible = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.type === active)

    return (
        <div className="min-h-screen" style={{ paddingTop: 'calc(var(--spacing-nav) + 4rem)', paddingBottom: '6rem', background: 'var(--color-ink)' }}>
            <div className="max-w-290 mx-auto px-5 md:px-10">

                {/* Header */}
                <motion.div className="max-w-2xl mb-14"
                    initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EXPO }}>
                    <Label>Portfolio</Label>
                    <h1 className="font-bold leading-[0.93] tracking-tight mb-5"
                        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', color: 'var(--color-paper)' }}>
                        Ce qu'on a<br />
                        <span className="italic" style={{ color: 'var(--color-brand-l)' }}>construit.</span>
                    </h1>
                    <p className="text-lg leading-relaxed" style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}>
                        Une sélection de projets livrés — sites, applications et produits SaaS.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div className="flex flex-wrap gap-2 mb-12"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: EXPO }}>
                    {FILTERS.map(({ id, label }) => (
                        <button key={id} onClick={() => setActive(id)}
                            className="text-[10px] tracking-widest uppercase px-4 py-2 rounded-xl border transition-all duration-200 cursor-pointer"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                background: active === id ? 'var(--color-brand)' : 'transparent',
                                color: active === id ? '#fff' : 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)',
                                borderColor: active === id ? 'var(--color-brand)' : 'rgba(255,255,255,0.08)',
                            }}>
                            {label}
                        </button>
                    ))}
                </motion.div>

                {/* Grid */}
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" layout>
                    <AnimatePresence mode="popLayout">
                        {visible.map(({ id, title, client, desc, tags, year, grad }) => (
                            <motion.div key={id} layout
                                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.3, ease: EXPO }}
                                className="flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1"
                                style={{ background: 'var(--color-ink-2)', borderColor: 'rgba(255,255,255,0.06)' }}
                                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(26,111,212,0.25)')}
                                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>

                                {/* Accent */}
                                <div className={`h-24 bg-linear-to-br ${grad} relative shrink-0`}>
                                    <div className="absolute bottom-3 right-4 text-[10px] tracking-widest"
                                        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.22)' }}>
                                        {year}
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6 flex flex-col gap-4 flex-1">
                                    <div>
                                        <p className="text-[10px] tracking-widest uppercase mb-1.5"
                                            style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 25%, transparent)' }}>
                                            {client}
                                        </p>
                                        <h3 className="font-semibold text-xl mb-2"
                                            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)' }}>
                                            {title}
                                        </h3>
                                        <p className="text-sm leading-relaxed"
                                            style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}>
                                            {desc}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                        {tags.map(t => <Tag key={t}>{t}</Tag>)}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-6 pb-5 pt-4 flex justify-end"
                                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Link href={`/realisations/${id}`}
                                        className="flex items-center gap-1.5 text-sm font-medium no-underline transition-colors duration-200 group"
                                        style={{ color: 'color-mix(in srgb, var(--color-paper-3) 40%, transparent)' }}
                                        onMouseOver={e => (e.currentTarget.style.color = 'var(--color-brand-l)')}
                                        onMouseOut={e => (e.currentTarget.style.color = 'color-mix(in srgb, var(--color-paper-3) 40%, transparent)')}>
                                        Voir le détail
                                        <ArrowUpRight size={13} />
                                    </Link>
                                </div>

                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* CTA */}
                <motion.div className="mt-20 text-center"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ delay: 0.2 }}>
                    <p className="text-base mb-6" style={{ color: 'color-mix(in srgb, var(--color-paper-3) 38%, transparent)' }}>
                        Votre projet pourrait être ici.
                    </p>
                    <Link href="/contact"
                        className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-2xl no-underline transition-all duration-300 hover:opacity-90 hover:shadow-(--shadow-brand)"
                        style={{ background: 'var(--color-brand)', fontSize: '0.9375rem' }}>
                        Démarrer un projet <ArrowUpRight size={16} />
                    </Link>
                </motion.div>

            </div>
        </div>
    )
}

/* ── Detail ── */
export function RealisationDetailPage({ id }: { id: string }) {
    const project = PROJECTS.find(p => p.id === id)
    if (!project) return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-ink)' }}>
            <div className="text-center">
                <p className="mb-4" style={{ color: 'color-mix(in srgb, var(--color-paper-3) 45%, transparent)' }}>Projet introuvable.</p>
                <Link href="/realisations" className="text-sm no-underline" style={{ color: 'var(--color-brand)' }}>← Retour</Link>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen" style={{ paddingTop: 'calc(var(--spacing-nav) + 3rem)', paddingBottom: '6rem', background: 'var(--color-ink)' }}>
            <div className="max-w-205 mx-auto px-5 md:px-10">

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Link href="/realisations"
                        className="inline-flex items-center gap-2 text-sm no-underline mb-12 transition-colors duration-200"
                        style={{ color: 'color-mix(in srgb, var(--color-paper-3) 35%, transparent)' }}
                        onMouseOver={e => (e.currentTarget.style.color = 'var(--color-paper)')}
                        onMouseOut={e => (e.currentTarget.style.color = 'color-mix(in srgb, var(--color-paper-3) 35%, transparent)')}>
                        ← Retour aux réalisations
                    </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EXPO }}>

                    {/* Header accent */}
                    <div className={`h-52 rounded-2xl bg-linear-to-br ${project.grad} relative overflow-hidden mb-8`}>
                        <div className="absolute inset-0"
                            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
                        <div className="absolute bottom-7 left-8">
                            <p className="text-[10px] tracking-widest uppercase mb-1.5"
                                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}>
                                {project.client} · {project.year}
                            </p>
                            <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)' }}>
                                {project.title}
                            </h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                        <div className="md:col-span-2 rounded-2xl p-7" style={{ background: 'var(--color-ink-2)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <p className="text-[10px] tracking-widest uppercase mb-3"
                                style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 25%, transparent)' }}>Description</p>
                            <p className="leading-relaxed text-[1.0625rem]"
                                style={{ color: 'color-mix(in srgb, var(--color-paper-3) 65%, transparent)' }}>
                                {project.desc}
                            </p>
                        </div>
                        <div className="rounded-2xl p-7 flex flex-col gap-5" style={{ background: 'var(--color-ink-2)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div>
                                <p className="text-[10px] tracking-widest uppercase mb-2.5"
                                    style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 25%, transparent)' }}>Technologies</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tags.map(t => <Tag key={t}>{t}</Tag>)}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] tracking-widest uppercase mb-1"
                                    style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 25%, transparent)' }}>Année</p>
                                <p className="font-semibold" style={{ color: 'var(--color-paper)' }}>{project.year}</p>
                            </div>
                        </div>
                    </div>

                    <Link href="/contact"
                        className="flex items-center justify-between px-8 py-5 rounded-2xl no-underline transition-all duration-300 hover:-translate-y-0.5 group"
                        style={{ background: 'var(--color-ink-2)', border: '1px solid rgba(255,255,255,0.06)' }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(26,111,212,0.25)')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                        <span className="font-semibold" style={{ color: 'var(--color-paper)' }}>Projet similaire ? Discutons-en.</span>
                        <ArrowUpRight size={18} style={{ color: 'var(--color-brand)' }} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>

                </motion.div>
            </div>
        </div>
    )
}