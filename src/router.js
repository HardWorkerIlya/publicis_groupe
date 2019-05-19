import Vue from 'vue'
import VueRouter from 'vue-router'

import PcAuth from './components/pages/PcAuth'
import PcPeople from './components/pages/PcPeople'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/auth',
      component: PcAuth
    },
    {
      path: '/people',
      component: PcPeople
    }
  ]
})

export default router