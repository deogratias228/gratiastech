'use client';

import { motion } from 'framer-motion';
import { ProjectStep, ProjectTracking } from "@/lib/api"
import { AlertCircle, CheckCircle2, Circle, Clock, Loader2 } from "lucide-react"

export const STATUS_LABEL: Record<string, string> = {
    draft: 'Brouillon', in_progress: 'En cours', on_hold: 'En pause', completed: 'Terminé', cancelled: 'Annulé',
}
export const STATUS_STYLE: Record<string, React.CSSProperties> = {
    draft: { background: 'rgba(255,255,255,0.05)', color: 'color-mix(in srgb, var(--color-paper-3) 45%, transparent)', border: '1px solid rgba(255,255,255,0.08)' },
    in_progress: { background: 'rgba(26,111,212,0.1)', color: 'var(--color-brand)', border: '1px solid rgba(26,111,212,0.2)' },
    on_hold: { background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' },
    completed: { background: 'rgba(52,211,153,0.1)', color: 'var(--color-success)', border: '1px solid rgba(52,211,153,0.2)' },
    cancelled: { background: 'rgba(248,113,113,0.1)', color: 'var(--color-danger)', border: '1px solid rgba(248,113,113,0.2)' },
}
export const TYPE_LABEL: Record<string, string> = {
    web_development: 'Développement web', software: 'Solution logicielle',
    saas: 'Produit SaaS', maintenance: 'Maintenance', other: 'Autre',
}

export const fmtDate = (d: string | null) => d
    ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

export function ProgressRing({ value }: { value: number }) {
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


export function StepIcon({ status }: { status: string }) {
    if (status === 'completed') return <CheckCircle2 size={17} style={{ color: 'var(--color-success)' }} />
    if (status === 'in_progress') return <Loader2 size={17} className="animate-spin" style={{ color: 'var(--color-brand)' }} />
    if (status === 'skipped') return <AlertCircle size={17} style={{ color: 'color-mix(in srgb, var(--color-paper-3) 25%, transparent)' }} />
    return <Circle size={17} style={{ color: 'rgba(255,255,255,0.12)' }} />
}

export function ProjectCard({ project }: { project: ProjectTracking }) {
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

export const EXPO = [0.16, 1, 0.3, 1] as const