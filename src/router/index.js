import Vue from 'vue'
import Router from 'vue-router'
import D3Test from '@/components/D3Test.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'D3Test',
      component: D3Test
    }
  ]
})
