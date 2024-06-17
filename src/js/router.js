const { createRouter, createWebHashHistory } = VueRouter;

const routes = [
  { path: '/', component: () => import('../components/home.js') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router