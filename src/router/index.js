import Vue from 'vue'
import VueRouter from 'vue-router'

import PcAuth from '../components/pages/PcAuth.vue'

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
    }
  ]
})

export default router