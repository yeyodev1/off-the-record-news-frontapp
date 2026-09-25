import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { site } from '@/config/site'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: site.name },
  },
  {
    path: '/seccion/:section',
    name: 'Section',
    component: () => import('@/views/SectionView.vue'),
    meta: { title: 'Sección' },
  },
  {
    path: '/nota/:slug',
    name: 'Article',
    component: () => import('@/views/ArticleView.vue'),
    meta: { title: 'Nota' },
  },
  {
    path: '/boletines',
    name: 'Newsletters',
    component: () => import('@/views/NewslettersView.vue'),
    meta: { title: 'Boletines' },
  },
  {
    path: '/pro',
    name: 'Pro',
    component: () => import('@/views/ProView.vue'),
    meta: { title: 'Off the Record Pro' },
  },
  {
    path: '/denuncias',
    name: 'Tips',
    component: () => import('@/views/TipsView.vue'),
    meta: { title: 'Denuncias' },
  },
  {
    path: '/nosotros',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'Nosotros' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Ingresar', guestOnly: true },
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, admin: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/AdminDashboardView.vue'),
        meta: { title: 'Mesa de redacción' },
      },
      {
        path: 'cola',
        name: 'AdminQueue',
        component: () => import('@/views/admin/AdminQueueView.vue'),
        meta: { title: 'Por aprobar' },
      },
      {
        path: 'notas',
        name: 'AdminArticles',
        component: () => import('@/views/admin/AdminArticlesView.vue'),
        meta: { title: 'Notas' },
      },
      {
        path: 'notas/nueva',
        name: 'AdminArticleNew',
        component: () => import('@/views/admin/AdminArticleEditView.vue'),
        meta: { title: 'Nueva nota' },
      },
      {
        path: 'notas/:id',
        name: 'AdminArticleEdit',
        component: () => import('@/views/admin/AdminArticleEditView.vue'),
        meta: { title: 'Editar nota' },
      },
      {
        path: 'senales',
        name: 'AdminSignals',
        component: () => import('@/views/admin/AdminSignalsView.vue'),
        meta: { title: 'Señales' },
      },
      {
        path: 'fuentes',
        name: 'AdminSources',
        component: () => import('@/views/admin/AdminSourcesView.vue'),
        meta: { title: 'Fuentes' },
      },
      {
        path: 'suscriptores',
        name: 'AdminSubscribers',
        component: () => import('@/views/admin/AdminSubscribersView.vue'),
        meta: { title: 'Suscriptores' },
      },
      {
        path: 'denuncias',
        name: 'AdminTips',
        component: () => import('@/views/admin/AdminTipsView.vue'),
        meta: { title: 'Denuncias' },
      },
      {
        path: 'boletines',
        name: 'AdminNewsletters',
        component: () => import('@/views/admin/AdminNewslettersView.vue'),
        meta: { title: 'Boletines' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Página no encontrada' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Con "atrás" el navegador devuelve la posición guardada; con un hash se
  // baja a la sección; si no, arriba.
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { left: 0, top: 0 }
  },
})

router.beforeEach(async (to) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth || to.meta.guestOnly) {
    // La sesión se verifica contra el API una sola vez por carga.
    await userStore.restore()
  }

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return { name: 'Login', query: { next: to.fullPath }, replace: true }
  }

  if (to.meta.requiresAdmin && !userStore.isAdmin) {
    return { name: 'Home', replace: true }
  }

  if (to.meta.guestOnly && userStore.isAuthenticated) {
    return userStore.isAdmin ? { name: 'AdminDashboard', replace: true } : { name: 'Home', replace: true }
  }
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title && title !== site.name ? `${title} — ${site.name}` : site.name
})

export default router
