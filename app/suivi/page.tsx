'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CheckCircle2, Circle, Clock, AlertCircle, Loader2, ArrowLeft } from 'lucide-react'
import { api, type ProjectTracking, type ProjectStep } from '@/lib/api'
import { EXPO, ProjectCard } from './shared'

const Label = ({ children }: { children: React.ReactNode }) => (
    <p className="flex items-center gap-3 mb-5 text-[11px] tracking-[0.15em] uppercase font-medium"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-brand)' }}>
        <span className="block w-5 h-px shrink-0" style={{ background: 'var(--color-brand)' }} />
        {children}
    </p>
);

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
        try { setProject(await api.tracking(t)) }
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

