import { createRouter, createWebHistory } from 'vue-router'
import { estado } from './store/estado.js'

const routes = [
  { path: '/entrar', component: () => import('./views/F-TelaLogin.vue'), meta: { publica: true } },
  { path: '/cadastro', component: () => import('./views/F-TelaCadastro.vue'), meta: { publica: true } },
  { path: '/', component: () => import('./views/F-PainelProgresso.vue') },
  { path: '/objetivo', component: () => import('./views/F-TelaObjetivo.vue') },
  { path: '/metas', component: () => import('./views/F-TelaMetas.vue') },
  { path: '/registrar', component: () => import('./views/RegistrarView.vue') },
  { path: '/registrar/atividade', component: () => import('./views/F-TelaAtividadeFisica.vue') },
  { path: '/registrar/sono', component: () => import('./views/F-TelaSono.vue') },
  { path: '/registrar/alimentacao', component: () => import('./views/F-TelaAlimentacao.vue') },
  { path: '/registrar/humor', component: () => import('./views/F-TelaHumor.vue') },
  { path: '/:caminho(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((para) => {
  if (!para.meta.publica && !estado.sessao) return '/entrar'
  if (para.meta.publica && estado.sessao) return '/'
  return true
})
