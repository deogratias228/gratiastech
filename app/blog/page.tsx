'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Calendar, Clock } from 'lucide-react'

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

const ARTICLES = [
  { slug: 'pourquoi-nextjs-pour-votre-site',   title: 'Pourquoi Next.js est le meilleur choix pour votre site en 2024',              excerpt: "Next.js s'est imposé comme le standard du développement React. Voici pourquoi nous le recommandons à tous nos clients.",                  tags: ['Next.js', 'React', 'Web'],     readTime: '5 min',  published: '2024-03-15', featured: true  },
  { slug: 'lancer-saas-en-afrique',            title: 'Lancer un produit SaaS en Afrique : ce qu\'il faut savoir',                    excerpt: "Le marché SaaS en Afrique francophone est en plein essor. Opportunités, contraintes techniques et paiements locaux.",                    tags: ['SaaS', 'Afrique', 'Business'], readTime: '8 min',  published: '2024-02-28', featured: false },
  { slug: 'api-laravel-best-practices',        title: 'Construire une API Laravel robuste : nos bonnes pratiques',                    excerpt: "Versioning, Sanctum, gestion des erreurs, OpenAPI. Le guide complet de nos standards d'API.",                                          tags: ['Laravel', 'API', 'Backend'],   readTime: '10 min', published: '2024-02-10', featured: false },
  { slug: 'tracking-projet-client',            title: 'Comment on a construit notre système de suivi de projets',                    excerpt: "Retour d'expérience sur la conception de notre portail de suivi client en temps réel.",                                               tags: ['Produit', 'Dev'],              readTime: '6 min',  published: '2024-01-22', featured: false },
]

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export default function BlogPage() {
  const [featured, ...rest] = ARTICLES

  return (
    <div className="min-h-screen" style={{ paddingTop: 'calc(var(--spacing-nav) + 4rem)', paddingBottom: '6rem', background: 'var(--color-ink)' }}>
      <div className="max-w-290 mx-auto px-5 md:px-10">

        {/* Header */}
        <motion.div className="max-w-xl mb-16"
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EXPO }}>
          <Label>Blog</Label>
          <h1 className="font-bold leading-[0.93] tracking-tight"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', color: 'var(--color-paper)' }}>
            Réflexions &<br />
            <span className="italic" style={{ color: 'var(--color-brand-l)' }}>retours d'expérience.</span>
          </h1>
        </motion.div>

        {/* Featured */}
        <motion.div className="mb-6"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EXPO }}>
          <Link href={`/blog/${featured.slug}`}
            className="group block rounded-2xl overflow-hidden no-underline transition-all duration-300 hover:-translate-y-1"
            style={{ background: 'var(--color-ink-2)', border: '1px solid rgba(255,255,255,0.06)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(26,111,212,0.22)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
            {/* Accent */}
            <div className="h-32 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(26,111,212,0.22) 0%, rgba(26,111,212,0.06) 50%, var(--color-ink-3) 100%)' }}>
              <div className="absolute inset-0"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
              <span className="absolute top-5 left-6 text-[10px] tracking-wide px-2.5 py-0.75 rounded-md"
                style={{ fontFamily: 'var(--font-mono)', background: 'rgba(26,111,212,0.15)', color: 'var(--color-brand)', border: '1px solid rgba(26,111,212,0.25)' }}>
                À la une
              </span>
            </div>
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center gap-1.5 text-[10px]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 28%, transparent)' }}>
                  <Calendar size={10} /> {fmtDate(featured.published)}
                </span>
                <span className="flex items-center gap-1.5 text-[10px]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 28%, transparent)' }}>
                  <Clock size={10} /> {featured.readTime}
                </span>
              </div>
              <h2 className="font-bold leading-snug mb-3 transition-colors duration-200"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.375rem,3vw,1.875rem)', color: 'var(--color-paper)' }}>
                {featured.title}
              </h2>
              <p className="leading-relaxed mb-5" style={{ color: 'color-mix(in srgb, var(--color-paper-3) 50%, transparent)' }}>
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
                <span className="flex items-center gap-1.5 text-sm font-medium transition-all duration-200"
                  style={{ color: 'var(--color-brand)' }}>
                  Lire l'article <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rest.map(({ slug, title, excerpt, tags, readTime, published }, i) => (
            <motion.div key={slug}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 + i * 0.07, ease: EXPO }}>
              <Link href={`/blog/${slug}`}
                className="group flex flex-col h-full rounded-2xl p-7 no-underline transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'var(--color-ink-2)', border: '1px solid rgba(255,255,255,0.06)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(26,111,212,0.22)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1.5 text-[10px]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 25%, transparent)' }}>
                    <Calendar size={9} /> {fmtDate(published)}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 25%, transparent)' }}>
                    <Clock size={9} /> {readTime}
                  </span>
                </div>
                <h3 className="font-semibold leading-snug mb-2 shrink-0 transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--color-paper)' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed mb-5 flex-1"
                  style={{ color: 'color-mix(in srgb, var(--color-paper-3) 45%, transparent)' }}>
                  {excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}

/* ── Article page ── */
export function BlogArticlePage({ slug }: { slug: string }) {
  const article = ARTICLES.find(a => a.slug === slug)
  if (!article) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-ink)' }}>
      <div className="text-center">
        <p className="mb-4" style={{ color: 'color-mix(in srgb, var(--color-paper-3) 45%, transparent)' }}>Article introuvable.</p>
        <Link href="/blog" className="text-sm no-underline" style={{ color: 'var(--color-brand)' }}>← Retour au blog</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ paddingTop: 'calc(var(--spacing-nav) + 3rem)', paddingBottom: '6rem', background: 'var(--color-ink)' }}>
      <div className="max-w-180 mx-auto px-5 md:px-10">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-sm no-underline mb-12 transition-colors duration-200"
            style={{ color: 'color-mix(in srgb, var(--color-paper-3) 35%, transparent)' }}
            onMouseOver={e => (e.currentTarget.style.color = 'var(--color-paper)')}
            onMouseOut={e => (e.currentTarget.style.color = 'color-mix(in srgb, var(--color-paper-3) 35%, transparent)')}>
            ← Retour au blog
          </Link>
        </motion.div>

        <motion.article initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EXPO }}>

          <div className="flex flex-wrap gap-2 mb-5">
            {article.tags.map(t => <Tag key={t}>{t}</Tag>)}
          </div>

          <h1 className="font-bold leading-tight mb-5"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.875rem,4vw,3rem)', color: 'var(--color-paper)' }}>
            {article.title}
          </h1>

          <div className="flex items-center gap-5 mb-10 pb-8"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="flex items-center gap-1.5 text-[10px]"
              style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 28%, transparent)' }}>
              <Calendar size={11} /> {fmtDate(article.published)}
            </span>
            <span className="flex items-center gap-1.5 text-[10px]"
              style={{ fontFamily: 'var(--font-mono)', color: 'color-mix(in srgb, var(--color-paper-3) 28%, transparent)' }}>
              <Clock size={11} /> {article.readTime} de lecture
            </span>
          </div>

          <p className="text-xl leading-relaxed font-medium mb-8"
            style={{ color: 'color-mix(in srgb, var(--color-paper-3) 65%, transparent)' }}>
            {article.excerpt}
          </p>
          <p className="leading-[1.85]"
            style={{ color: 'color-mix(in srgb, var(--color-paper-3) 55%, transparent)', fontSize: '1.0625rem' }}>
            Contenu complet à charger via <code
              className="text-[0.875em] px-1.5 py-0.5 rounded"
              style={{ fontFamily: 'var(--font-mono)', background: 'var(--color-ink-3)', color: 'var(--color-brand-l)' }}>
              GET /articles/{slug}
            </code> depuis le backend Laravel.
          </p>

        </motion.article>
      </div>
    </div>
  )
}