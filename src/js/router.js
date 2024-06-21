const { createRouter, createWebHashHistory } = VueRouter;

const routes = [
  { path: '/', component: () => import('../components/home.js') },
  { path: '/beneficiaries', component: () => import('../components/beneficiaries.js') },
  { path: '/partners', component: () => import('../components/partners.js') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router