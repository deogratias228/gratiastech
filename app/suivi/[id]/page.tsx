"use client";

import { api, ProjectTracking } from "@/lib/api";
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ProjectCard } from "../shared";


export default function ProjectDetailPage({ code }: { code: string }) {
    const [project, setProject] = useState<ProjectTracking | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);

    useEffect(() => {
        api.tracking(code)
            .then((prj) => setProject(prj))
            .catch((err) => {
                setError(true);
                console.log(err);
            }).finally(() => {
                setLoading(false);
                
            })
    }, []);

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