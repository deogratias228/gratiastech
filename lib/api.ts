import http from './axios'

export type ProjectStatus = 'draft' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled'
export type StepStatus = 'pending' | 'in_progress' | 'completed' | 'skipped'
export type ProjectType = 'web_development' | 'software' | 'saas' | 'maintenance' | 'other'

export interface ProjectStep {
    title: string
    description: string | null
    status: StepStatus
    order: number
    started_at: string | null
    completed_at: string | null
}

export interface ProjectTracking {
    tracking_code: string
    title: string
    status: ProjectStatus
    type: ProjectType
    progress: number
    started_at: string | null
    estimated_end_at: string | null
    steps: ProjectStep[]
}

export interface Service {
    id: string; title: string; description: string; icon: string | null; order: number
}

export interface PortfolioProject {
    id: string; title: string; description: string; type: ProjectType
    tech_stack: string[]; completed_at: string | null
    portfolio_data: { client?: string; url?: string; summary?: string; accent?: string } | null
}

export interface Article {
    id: string; title: string; excerpt: string; content: string; slug: string
    cover_image: string | null; tags: string[]; author: { name: string }; published_at: string
}

export interface ContactPayload {
    name: string; email: string; phone?: string; company?: string
    subject: string; message: string; service_interest?: string
}

export interface AuthUser {
    id: string; name: string; email: string; role: 'admin' | 'client'; company: string | null
}

const unwrap = <T>(res: { data: { data: T } }): T => res.data.data

export const api = {
    tracking: {
        get: (code: string) =>
            http.get<{ data: ProjectTracking }>(`/track/${code.toUpperCase()}`).then(unwrap<ProjectTracking>),
    },
    services: {
        list: () => http.get<{ data: Service[] }>('/services').then(unwrap<Service[]>),
    },
    portfolio: {
        list: () => http.get<{ data: PortfolioProject[] }>('/portfolio').then(unwrap<PortfolioProject[]>),
        get: (id: string) => http.get<{ data: PortfolioProject }>(`/portfolio/${id}`).then(unwrap<PortfolioProject>),
    },
    articles: {
        list: () => http.get<{ data: Article[] }>('/articles').then(unwrap<Article[]>),
        get: (slug: string) => http.get<{ data: Article }>(`/articles/${slug}`).then(unwrap<Article>),
    },
    contact: {
        send: (payload: ContactPayload) => http.post('/contact', payload),
    },
}

export const authApi = {
    login: (email: string, password: string) =>
        http.post<{ data: { token: string; user: AuthUser } }>('/auth/login', { email, password })
            .then(res => res.data.data),
    me: () => http.get<{ data: AuthUser }>('/auth/me').then(unwrap<AuthUser>),
    logout: () => http.post('/auth/logout'),
    client: {
        projects: () => http.get<{ data: ProjectTracking[] }>('/client/projects').then(unwrap<ProjectTracking[]>),
        project: (id: string) => http.get<{ data: ProjectTracking }>(`/client/projects/${id}`).then(unwrap<ProjectTracking>),
    },
}