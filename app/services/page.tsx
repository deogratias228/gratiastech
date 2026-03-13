'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Globe, Code2, Layers, Wrench, ArrowUpRight, Check } from 'lucide-react'

const EXPO = [0.16, 1, 0.3, 1] as const

const Label = ({ children }: { children: React.ReactNode }) => (
    <p className="flex items-center gap-3 mb-5 text-[11px] tracking-[0.15em] uppercase font-medium"
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

const SERVICES = [
    {
        Icon: Globe, id: 'web',
        title: 'Développement web',
        desc: 'De la landing page au portail complexe — des expériences web performantes, accessibles et optimisées pour la conversion.',
        points: ['Sites vitrines & landing pages', 'Plateformes e-commerce', 'Applications web sur mesure', 'Portails clients & back-offices', 'Intégration CMS headless'],
        tags: ['Next.js', 'React', 'Laravel', 'WordPress', 'Tailwind CSS'],
    },
    {
        Icon: Code2, id: 'logiciel',
        title: 'Solutions logicielles',
        desc: "Outils métier qui automatisent vos processus et s'intègrent à vos systèmes existants.",
        points: ['Applications métier sur mesure', 'APIs REST & intégrations', 'Automatisation de processus', 'Tableaux de bord & reporting', 'Migrations de systèmes legacy'],
        tags: ['Laravel', 'Node.js', 'PostgreSQL', 'REST API', 'Docker'],
    },
    {
        Icon: Layers, id: 'saas',
        title: 'Produits SaaS',
        desc: 'Du concept au lancement — architecture solide, facturation, onboarding et tableau de bord.',
        points: ['Architecture multi-tenant', 'Facturation Stripe', 'Authentification & rôles', 'Dashboard client', 'Emails transactionnels'],
        tags: ['Next.js', 'Laravel', 'Stripe', 'Resend', 'Vercel'],
    },
    {
        Icon: Wrench, id: 'maintenance',
        title: 'Maintenance & Support',
        desc: 'Un partenariat technique durable pour garder vos outils rapides, sûrs et à jour.',
        points: ['Mises à jour de sécurité', 'Monitoring & alertes', 'Corrections & optimisations', 'Sauvegardes automatisées', 'Support réactif'],
        tags: ['Monitoring', 'CI/CD', 'Sécurité', 'Support', 'Hébergement'],
    },
]

export default function ServicesPage() {
    return (
        <div className="min-h-screen" style={{ paddingTop: 'calc(var(--spacing-nav) + 4rem)', paddingBottom: '6rem', background: 'var(--color-ink)' }}>
            <div className="max-w-290 mx-auto px-5 md:px-10">

                {/* Header */}
                <motion.div className="max-w-2xl mb-20"
                    initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EXPO }}>
                    <Label>Nos services</Label>
                    <h1 className="font-bold leading-[0.95] tracking-tight mb-5"
                        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', color: 'var(--color-paper)' }}>
                        Ce que nous<br />
                        <span className="italic" style={{ color: 'var(--color-brand-l)' }}>savons faire.</span>
                    </h1>
                    <p className="text-lg leading-relaxed"
                        style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}>
                        Quatre domaines d'intervention, une seule ambition : livrer des solutions qui fonctionnent vraiment et qui durent.
                    </p>
                </motion.div>

                {/* Services */}
                <div className="flex flex-col gap-px rounded-3xl overflow-hidden border"
                    style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.05)' }}>
                    {SERVICES.map(({ Icon, id, title, desc, points, tags }, i) => (
                        <motion.div key={id} id={id}
                            className="p-8 md:p-12 transition-colors duration-300"
                            style={{ background: 'var(--color-ink)' }}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: i * 0.06, ease: EXPO }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-ink-2)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-ink)')}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
                                <div>
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ background: 'rgba(26,111,212,0.1)', border: '1px solid rgba(26,111,212,0.2)' }}>
                                            <Icon size={22} strokeWidth={1.5} style={{ color: 'var(--color-brand)' }} />
                                        </div>
                                        <h2 className="font-semibold text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)' }}>{title}</h2>
                                    </div>
                                    <p className="text-base leading-relaxed mb-5" style={{ color: 'color-mix(in srgb, var(--color-paper-3) 55%, transparent)' }}>{desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map(t => <Tag key={t}>{t}</Tag>)}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {points.map(point => (
                                        <div key={point} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                                style={{ background: 'rgba(26,111,212,0.1)', border: '1px solid rgba(26,111,212,0.2)' }}>
                                                <Check size={11} strokeWidth={2.5} style={{ color: 'var(--color-brand)' }} />
                                            </div>
                                            <span className="text-sm" style={{ color: 'color-mix(in srgb, var(--color-paper-3) 70%, transparent)' }}>{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div className="mt-20 text-center"
                    initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6, ease: EXPO }}>
                    <p className="text-lg mb-6" style={{ color: 'color-mix(in srgb, var(--color-paper-3) 45%, transparent)' }}>
                        Vous ne savez pas par où commencer ?
                    </p>
                    <Link href="/contact"
                        className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-2xl no-underline transition-all duration-300 hover:opacity-90 hover:shadow-(--shadow-brand)"
                        style={{ background: 'var(--color-brand)', fontSize: '0.9375rem' }}>
                        Discutons de votre projet <ArrowUpRight size={16} />
                    </Link>
                </motion.div>

            </div>
        </div>
    )
}