import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Phymol from '@/components/Phymol.vue'
import Students from '@/components/Students.vue'
import Beneficiaries from '@/components/Beneficiaries.vue'
import Partners from '@/components/Partners.vue'
import Members from '@/components/Members.vue'
import Projects from '@/components/Projects.vue'
import Candidates from '@/components/Candidates.vue'
import Recruitment from '@/components/Recruitment.vue'
import Events from '@/components/Events.vue'
import Training from '@/components/Training.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'project', component: Phymol },
  { path: '/students', name: 'students', component: Students },
  { path: '/beneficiaries', name: 'beneficiaries', component: Beneficiaries },
  { path: '/partners', name: 'partners', component: Partners },
  { path: '/members', name: 'members', component: Members },
  { path: '/projects', name: 'projects', component: Projects },
  { path: '/dcs/:dc', name: 'dc', component: Candidates },
  { path: '/recruitment', name: 'recruitment', component: Recruitment },
  { path: '/events', name: 'events', component: Events },
  { path: '/training', name: 'training', component: Training },
  { path: '/:pathMatch(.*)*', redirect: '/'}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    var offset = document.getElementById("nav").offsetHeight;
    if (to.hash) {
      return {
        el: to.hash,
        top: offset
      }
    } else {
      return {
        top: 0
      }
    }
  }
})

export default router
