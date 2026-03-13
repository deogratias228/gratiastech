'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Loader2, CheckCircle2, AlertCircle, Mail, MapPin, Clock } from 'lucide-react'
import { api, type ContactPayload } from '@/lib/api'

const EXPO = [0.16, 1, 0.3, 1] as const

const Label = ({ children }: { children: React.ReactNode }) => (
    <p className="flex items-center gap-3 mb-5 text-[11px] tracking-[0.15em] uppercase font-medium"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-brand)' }}>
        <span className="block w-5 h-px shrink-0" style={{ background: 'var(--color-brand)' }} />
        {children}
    </p>
)

const SERVICES_OPTIONS = [
    { value: '', label: 'Choisir un service...' },
    { value: 'web', label: 'Développement web' },
    { value: 'logiciel', label: 'Solution logicielle' },
    { value: 'saas', label: 'Produit SaaS' },
    { value: 'maintenance', label: 'Maintenance & Support' },
    { value: 'autre', label: 'Autre' },
]

type Field = 'name' | 'email' | 'subject' | 'message'
type FormState = { name: string; email: string; phone: string; company: string; service_interest: string; subject: string; message: string }
const INIT: FormState = { name: '', email: '', phone: '', company: '', service_interest: '', subject: '', message: '' }

function validate(f: FormState): Partial<Record<Field, string>> {
    const e: Partial<Record<Field, string>> = {}
    if (!f.name.trim()) e.name = 'Votre nom est requis.'
    if (!f.email.trim()) e.email = 'Votre email est requis.'
    else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'Format email invalide.'
    if (!f.subject.trim()) e.subject = 'Objet requis.'
    if (f.message.trim().length < 20) e.message = 'Message trop court (20 car. minimum).'
    return e
}

/* ── Reusable input wrapper ── */
function FieldWrap({ label, error, required, children }: {
    label: string; error?: string; required?: boolean; children: React.ReactNode
}) {
    return (
        <label className="flex flex-col gap-1.5 cursor-text">
            <span className="text-sm font-medium" style={{ color: 'color-mix(in srgb, var(--color-paper-3) 70%, transparent)' }}>
                {label}{required && <span style={{ color: 'var(--color-brand)' }}> *</span>}
            </span>
            {children}
            <AnimatePresence>
                {error && (
                    <motion.span className="flex items-center gap-1.5 text-xs"
                        style={{ color: 'var(--color-danger)' }}
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <AlertCircle size={11} /> {error}
                    </motion.span>
                )}
            </AnimatePresence>
        </label>
    )
}

const inputBase = [
    'w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200',
    'bg-[var(--color-ink-3)] border border-[rgba(255,255,255,0.07)] text-[var(--color-paper)]',
    'placeholder:text-[color-mix(in_srgb,var(--color-paper-3)_25%,transparent)]',
    'focus:border-[rgba(26,111,212,0.5)] focus:ring-2 focus:ring-[rgba(26,111,212,0.08)]',
].join(' ')

const inputError = 'border-[rgba(248,113,113,0.4)] focus:border-[rgba(248,113,113,0.6)]'

export default function ContactPage() {
    const [form, setForm] = useState<FormState>(INIT)
    const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [apiError, setApiErr] = useState<string | null>(null)

    function set(field: keyof FormState, value: string) {
        setForm(f => ({ ...f, [field]: value }))
        if (field in errors) setErrors(e => ({ ...e, [field]: undefined }))
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        const errs = validate(form)
        if (Object.keys(errs).length) { setErrors(errs); return }
        setLoading(true); setApiErr(null)
        try {
            const payload: ContactPayload = {
                name: form.name, email: form.email, subject: form.subject, message: form.message,
                ...(form.phone && { phone: form.phone }),
                ...(form.company && { company: form.company }),
                ...(form.service_interest && { service_interest: form.service_interest }),
            }
            await api.contact.send(payload)
            setSuccess(true); setForm(INIT)
        } catch {
            setApiErr("Une erreur s'est produite. Veuillez réessayer ou nous écrire directement.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen py-24 lg:py-32" style={{ paddingTop: 'calc(var(--spacing-nav) + 4rem)', background: 'var(--color-ink)' }}>
            <div className="max-w-290 mx-auto px-5 md:px-10">

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-20 items-start">

                    {/* ── Left — intro ── */}
                    <motion.div className="lg:col-span-2"
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: EXPO }}>

                        <Label>Contact</Label>
                        <h1 className="font-bold leading-[0.95] tracking-tight mb-5"
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(2.5rem,5vw,3.75rem)',
                                color: 'var(--color-paper)',
                            }}>
                            Travaillons<br />
                            <span className="italic" style={{ color: 'var(--color-brand-l)' }}>ensemble.</span>
                        </h1>
                        <p className="text-base leading-relaxed mb-10 max-w-sm"
                            style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}>
                            Décrivez votre projet. Nous vous répondons sous 24h avec une proposition adaptée, sans engagement.
                        </p>

                        <div className="flex flex-col gap-5">
                            {[
                                { Icon: Mail, label: 'Email', value: 'contact@gratiastechnology.com', href: 'mailto:contact@gratiastechnology.com' },
                                { Icon: MapPin, label: 'Localisation', value: 'Lomé, Togo', href: null },
                                { Icon: Clock, label: 'Réponse', value: 'Sous 24h ouvrées', href: null },
                            ].map(({ Icon, label, value, href }) => (
                                <div key={label} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: 'rgba(26,111,212,0.08)', border: '1px solid rgba(26,111,212,0.18)' }}>
                                        <Icon size={16} strokeWidth={1.5} style={{ color: 'var(--color-brand)' }} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] tracking-widest uppercase mb-0.5"
                                            style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 25%, transparent)' }}>
                                            {label}
                                        </p>
                                        {href
                                            ? <a href={href} className="text-sm no-underline transition-colors duration-200"
                                                style={{ color: 'color-mix(in srgb, var(--color-paper-3) 60%, transparent)' }}
                                                onMouseOver={e => (e.currentTarget.style.color = 'var(--color-paper)')}
                                                onMouseOut={e => (e.currentTarget.style.color = 'color-mix(in srgb, var(--color-paper-3) 60%, transparent)')}>
                                                {value}
                                            </a>
                                            : <p className="text-sm" style={{ color: 'color-mix(in srgb, var(--color-paper-3) 60%, transparent)' }}>{value}</p>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>

                    </motion.div>

                    {/* ── Right — form ── */}
                    <motion.div className="lg:col-span-3"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: EXPO }}>

                        <AnimatePresence mode="wait">

                            {success ? (
                                <motion.div key="ok"
                                    className="rounded-2xl p-10 md:p-14 text-center"
                                    style={{ background: 'var(--color-ink-2)', border: '1px solid rgba(255,255,255,0.06)' }}
                                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, ease: EXPO }}>
                                    <motion.div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                        style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}>
                                        <CheckCircle2 size={28} style={{ color: 'var(--color-success)' }} />
                                    </motion.div>
                                    <h2 className="font-bold mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-paper)' }}>
                                        Message envoyé !
                                    </h2>
                                    <p className="leading-relaxed max-w-sm mx-auto mb-8"
                                        style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}>
                                        Nous avons bien reçu votre message et vous répondrons dans les 24 heures ouvrées.
                                    </p>
                                    <button onClick={() => setSuccess(false)}
                                        className="text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200"
                                        style={{
                                            color: 'color-mix(in srgb, var(--color-paper-3) 60%, transparent)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            background: 'transparent',
                                        }}
                                        onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-paper)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
                                        onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = 'color-mix(in srgb, var(--color-paper-3) 60%, transparent)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)' }}>
                                        Envoyer un autre message
                                    </button>
                                </motion.div>

                            ) : (
                                <motion.form key="form" onSubmit={onSubmit}
                                    className="rounded-2xl p-7 md:p-10"
                                    style={{ background: 'var(--color-ink-2)', border: '1px solid rgba(255,255,255,0.06)' }}>

                                    {/* API error */}
                                    <AnimatePresence>
                                        {apiError && (
                                            <motion.div className="flex items-start gap-3 px-4 py-3.5 rounded-xl mb-6"
                                                style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)' }}
                                                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                                <AlertCircle size={14} style={{ color: 'var(--color-danger)', flexShrink: 0, marginTop: 2 }} />
                                                <p className="text-sm" style={{ color: 'var(--color-danger)' }}>{apiError}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                        <FieldWrap label="Nom complet" error={errors.name} required>
                                            <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                                                placeholder="Jean Dupont"
                                                className={`${inputBase} ${errors.name ? inputError : ''}`} />
                                        </FieldWrap>

                                        <FieldWrap label="Email" error={errors.email} required>
                                            <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                                                placeholder="jean@entreprise.com"
                                                className={`${inputBase} ${errors.email ? inputError : ''}`} />
                                        </FieldWrap>

                                        <FieldWrap label="Téléphone">
                                            <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                                                placeholder="+228 90 00 00 00"
                                                className={inputBase} />
                                        </FieldWrap>

                                        <FieldWrap label="Entreprise">
                                            <input type="text" value={form.company} onChange={e => set('company', e.target.value)}
                                                placeholder="Nom de votre société"
                                                className={inputBase} />
                                        </FieldWrap>

                                        <div className="sm:col-span-2">
                                            <FieldWrap label="Service souhaité">
                                                <select value={form.service_interest} onChange={e => set('service_interest', e.target.value)}
                                                    className={`${inputBase} cursor-pointer appearance-none`}>
                                                    {SERVICES_OPTIONS.map(({ value, label }) => (
                                                        <option key={value} value={value} style={{ background: 'var(--color-ink-3)', color: 'var(--color-paper)' }}>
                                                            {label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FieldWrap>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <FieldWrap label="Objet" error={errors.subject} required>
                                                <input type="text" value={form.subject} onChange={e => set('subject', e.target.value)}
                                                    placeholder="Développement d'une application web"
                                                    className={`${inputBase} ${errors.subject ? inputError : ''}`} />
                                            </FieldWrap>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <FieldWrap label="Votre message" error={errors.message} required>
                                                <textarea value={form.message} onChange={e => set('message', e.target.value)}
                                                    placeholder="Décrivez votre projet, vos objectifs, votre budget approximatif..."
                                                    rows={6}
                                                    className={`${inputBase} resize-none leading-relaxed ${errors.message ? inputError : ''}`} />
                                                <span className="self-end text-[10px] mt-0.5"
                                                    style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 22%, transparent)' }}>
                                                    {form.message.length} / 2000
                                                </span>
                                            </FieldWrap>
                                        </div>

                                    </div>

                                    <div className="mt-7 flex items-center justify-between flex-wrap gap-4">
                                        <p className="text-xs leading-relaxed max-w-60"
                                            style={{ color: 'color-mix(in srgb, var(--color-paper-3) 22%, transparent)' }}>
                                            Données utilisées uniquement dans le cadre de notre échange.
                                        </p>
                                        <button type="submit" disabled={loading}
                                            className="inline-flex items-center gap-2.5 text-sm font-semibold px-8 py-3.5 rounded-xl transition-all duration-300"
                                            style={{
                                                background: loading ? 'var(--color-ink-4)' : 'var(--color-brand)',
                                                color: loading ? 'color-mix(in srgb, var(--color-paper-3) 30%, transparent)' : '#fff',
                                                cursor: loading ? 'not-allowed' : 'pointer',
                                                border: 'none',
                                            }}>
                                            {loading
                                                ? <><Loader2 size={14} className="animate-spin" /> Envoi...</>
                                                : <>Envoyer le message <ArrowUpRight size={14} /></>
                                            }
                                        </button>
                                    </div>

                                </motion.form>
                            )}
                        </AnimatePresence>

                    </motion.div>
                </div>
            </div>
        </div>
    )
}