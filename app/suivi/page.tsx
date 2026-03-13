'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CheckCircle2, Circle, Clock, AlertCircle, Loader2, ArrowLeft } from 'lucide-react'
import { api, type ProjectTracking, type ProjectStep } from '@/lib/api'

const EXPO = [0.16, 1, 0.3, 1] as const

const Label = ({ children }: { children: React.ReactNode }) => (
    <p className="flex items-center gap-3 mb-5 text-[11px] tracking-[0.15em] uppercase font-medium"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-brand)' }}>
        <span className="block w-5 h-px shrink-0" style={{ background: 'var(--color-brand)' }} />
        {children}
    </p>
)

const STATUS_LABEL: Record<string, string> = {
    draft: 'Brouillon', in_progress: 'En cours', on_hold: 'En pause', completed: 'Terminé', cancelled: 'Annulé',
}
const STATUS_STYLE: Record<string, React.CSSProperties> = {
    draft: { background: 'rgba(255,255,255,0.05)', color: 'color-mix(in srgb, var(--color-paper-3) 45%, transparent)', border: '1px solid rgba(255,255,255,0.08)' },
    in_progress: { background: 'rgba(26,111,212,0.1)', color: 'var(--color-brand)', border: '1px solid rgba(26,111,212,0.2)' },
    on_hold: { background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' },
    completed: { background: 'rgba(52,211,153,0.1)', color: 'var(--color-success)', border: '1px solid rgba(52,211,153,0.2)' },
    cancelled: { background: 'rgba(248,113,113,0.1)', color: 'var(--color-danger)', border: '1px solid rgba(248,113,113,0.2)' },
}
const TYPE_LABEL: Record<string, string> = {
    web_development: 'Développement web', software: 'Solution logicielle',
    saas: 'Produit SaaS', maintenance: 'Maintenance', other: 'Autre',
}

const fmtDate = (d: string | null) => d
    ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

function ProgressRing({ value }: { value: number }) {
    const r = 34, cx = 42, circ = 2 * Math.PI * r
    return (
        <svg width={84} height={84} className="shrink-0">
            <circle cx={cx} cy={cx} r={r} fill="none" strokeWidth={5} style={{ stroke: 'var(--color-ink-4)' }} />
            <motion.circle cx={cx} cy={cx} r={r} fill="none" strokeWidth={5} strokeLinecap="round"
                style={{ stroke: 'var(--color-brand)' }}
                strokeDasharray={`0 ${circ}`}
                transform={`rotate(-90 ${cx} ${cx})`}
                animate={{ strokeDasharray: `${(value / 100) * circ} ${circ}` }}
                transition={{ duration: 1.2, ease: EXPO, delay: 0.3 }}
            />
            <text x={cx} y={cx + 5} textAnchor="middle"
                style={{ fontSize: 15, fontFamily: 'var(--font-display)', fontWeight: 700, fill: 'var(--color-brand)' }}>
                {value}%
            </text>
        </svg>
    )
}

function StepIcon({ status }: { status: string }) {
    if (status === 'completed') return <CheckCircle2 size={17} style={{ color: 'var(--color-success)' }} />
    if (status === 'in_progress') return <Loader2 size={17} className="animate-spin" style={{ color: 'var(--color-brand)' }} />
    if (status === 'skipped') return <AlertCircle size={17} style={{ color: 'color-mix(in srgb, var(--color-paper-3) 25%, transparent)' }} />
    return <Circle size={17} style={{ color: 'rgba(255,255,255,0.12)' }} />
}

function ProjectCard({ project }: { project: ProjectTracking }) {
    return (
        <motion.div className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EXPO }}>

            {/* Header */}
            <div className="rounded-2xl p-6 md:p-8"
                style={{ background: 'var(--color-ink-2)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex justify-between items-start flex-wrap gap-5 mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="text-[10px] tracking-widest"
                                style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 28%, transparent)' }}>
                                {project.tracking_code}
                            </span>
                            <span className="text-[10px] tracking-wide px-2.5 py-0.75 rounded-lg"
                                style={{ fontFamily: 'var(--font-mono)', ...(STATUS_STYLE[project.status] ?? STATUS_STYLE.in_progress) }}>
                                {STATUS_LABEL[project.status]}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-1"
                            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)' }}>
                            {project.title}
                        </h2>
                        <p className="text-[10px] tracking-widest uppercase"
                            style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 28%, transparent)' }}>
                            {TYPE_LABEL[project.type] ?? project.type}
                        </p>
                    </div>
                    <ProgressRing value={project.progress} />
                </div>

                {(project.started_at || project.estimated_end_at) && (
                    <div className="flex flex-wrap gap-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        {project.started_at && (
                            <div>
                                <p className="text-[10px] tracking-widest uppercase mb-1"
                                    style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 22%, transparent)' }}>Début</p>
                                <p className="text-sm font-semibold" style={{ color: 'var(--color-paper)' }}>{fmtDate(project.started_at)}</p>
                            </div>
                        )}
                        {project.estimated_end_at && (
                            <div>
                                <p className="text-[10px] tracking-widest uppercase mb-1"
                                    style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 22%, transparent)' }}>Livraison estimée</p>
                                <p className="text-sm font-semibold" style={{ color: 'var(--color-paper)' }}>{fmtDate(project.estimated_end_at)}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Steps */}
            {project.steps.length > 0 && (
                <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-ink-2)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <p className="text-[10px] tracking-widest uppercase"
                            style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 25%, transparent)' }}>
                            Étapes du projet
                        </p>
                    </div>
                    {project.steps.map((step: ProjectStep, i: number) => (
                        <div key={i}
                            className="flex gap-4 items-start px-6 py-5"
                            style={{
                                borderBottom: i < project.steps.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                background: step.status === 'in_progress' ? 'rgba(26,111,212,0.04)' : 'transparent',
                            }}>
                            <div className="pt-0.5 shrink-0"><StepIcon status={step.status} /></div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center gap-3 flex-wrap">
                                    <span className="text-[0.9375rem]"
                                        style={{
                                            fontWeight: step.status === 'in_progress' ? 600 : 400,
                                            color: step.status === 'in_progress' ? 'var(--color-paper)'
                                                : step.status === 'completed' ? 'color-mix(in srgb, var(--color-paper-3) 32%, transparent)'
                                                    : 'color-mix(in srgb, var(--color-paper-3) 22%, transparent)',
                                            textDecoration: ['completed', 'skipped'].includes(step.status) ? 'line-through' : 'none',
                                        }}>
                                        {step.title}
                                    </span>
                                    <div className="flex items-center gap-2.5">
                                        {step.status === 'in_progress' && (
                                            <span className="text-[10px] tracking-wide px-2.5 py-0.75 rounded-md"
                                                style={{ fontFamily: 'var(--font-mono)', background: 'rgba(26,111,212,0.1)', color: 'var(--color-brand)', border: '1px solid rgba(26,111,212,0.2)' }}>
                                                EN COURS
                                            </span>
                                        )}
                                        {step.completed_at && (
                                            <span className="flex items-center gap-1 text-[10px]"
                                                style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 22%, transparent)' }}>
                                                <Clock size={10} /> {fmtDate(step.completed_at)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {step.description && (
                                    <p className="text-sm mt-1.5 leading-relaxed"
                                        style={{ color: 'color-mix(in srgb, var(--color-paper-3) 38%, transparent)' }}>
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    )
}

const inputBase = [
    'w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200',
    'bg-[var(--color-ink-3)] border border-[rgba(255,255,255,0.07)] text-[var(--color-paper)]',
    'placeholder:text-[color-mix(in_srgb,var(--color-paper-3)_22%,transparent)]',
    'focus:border-[rgba(26,111,212,0.45)] focus:ring-2 focus:ring-[rgba(26,111,212,0.08)]',
].join(' ')

export default function SuiviPage() {
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [project, setProject] = useState<ProjectTracking | null>(null)
    const [error, setError] = useState<string | null>(null)

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        const t = code.trim().toUpperCase()
        if (!t) return
        setLoading(true); setError(null); setProject(null)
        try { setProject(await api.tracking.get(t)) }
        catch { setError('Code introuvable. Vérifiez le code fourni par Gratias Technology.') }
        finally { setLoading(false) }
    }

    return (
        <div className="min-h-screen" style={{ paddingTop: 'calc(var(--spacing-nav) + 4rem)', paddingBottom: '6rem', background: 'var(--color-ink)' }}>
            <div className="max-w-180 mx-auto px-5 md:px-10">

                <motion.div className="mb-12"
                    initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EXPO }}>
                    <Label>Suivi de projet</Label>
                    <h1 className="font-bold leading-[0.93] tracking-tight mb-4"
                        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,5vw,3.5rem)', color: 'var(--color-paper)' }}>
                        Où en est<br />
                        <span className="italic" style={{ color: 'var(--color-brand-l)' }}>votre projet ?</span>
                    </h1>
                    <p className="text-base leading-relaxed max-w-md"
                        style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}>
                        Entrez le code de suivi reçu au démarrage de votre projet.
                    </p>
                </motion.div>

                <motion.form onSubmit={handleSearch} className="flex gap-3 flex-wrap mb-8"
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: EXPO }}>
                    <div className="flex-1 min-w-50 relative">
                        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: 'color-mix(in srgb, var(--color-paper-3) 22%, transparent)' }} />
                        <input type="text" value={code}
                            onChange={e => setCode(e.target.value.toUpperCase())}
                            placeholder="GT-2024-001"
                            className={`${inputBase} pl-11`}
                            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }} />
                    </div>
                    <button type="submit" disabled={loading || !code.trim()}
                        className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-xl transition-all duration-200"
                        style={{
                            background: loading || !code.trim() ? 'var(--color-ink-3)' : 'var(--color-brand)',
                            color: loading || !code.trim() ? 'color-mix(in srgb, var(--color-paper-3) 25%, transparent)' : '#fff',
                            cursor: loading || !code.trim() ? 'not-allowed' : 'pointer',
                            border: 'none',
                        }}>
                        {loading ? <><Loader2 size={14} className="animate-spin" /> Recherche...</> : <><Search size={14} /> Rechercher</>}
                    </button>
                </motion.form>

                <AnimatePresence>
                    {error && (
                        <motion.div className="flex items-center gap-3 px-5 py-4 rounded-xl mb-8"
                            style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.18)' }}
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <AlertCircle size={14} style={{ color: 'var(--color-danger)', flexShrink: 0 }} />
                            <p className="text-sm" style={{ color: 'var(--color-danger)' }}>{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {project && <ProjectCard project={project} />}
                </AnimatePresence>

            </div>
        </div>
    )
}

/* ── Detail page ── */
export function ProjectDetailPage({ code }: { code: string }) {
    const [project, setProject] = useState<ProjectTracking | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useState(() => {
        api.tracking.get(code)
            .then(setProject)
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    })

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-ink)' }}>
            <Loader2 size={24} className="animate-spin" style={{ color: 'var(--color-brand)' }} />
        </div>
    )
    if (error || !project) return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-ink)' }}>
            <div className="text-center">
                <p className="mb-4" style={{ color: 'color-mix(in srgb, var(--color-paper-3) 45%, transparent)' }}>Projet introuvable.</p>
                <a href="/suivi" className="text-sm no-underline" style={{ color: 'var(--color-brand)' }}>Retour au suivi</a>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen" style={{ paddingTop: 'calc(var(--spacing-nav) + 3rem)', paddingBottom: '6rem', background: 'var(--color-ink)' }}>
            <div className="max-w-180 mx-auto px-5 md:px-10">
                <motion.a href="/suivi"
                    className="inline-flex items-center gap-2 text-sm no-underline mb-10 transition-colors duration-200"
                    style={{ color: 'color-mix(in srgb, var(--color-paper-3) 35%, transparent)' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <ArrowLeft size={14} /> Retour au suivi
                </motion.a>
                <ProjectCard project={project} />
            </div>
        </div>
    )
}