import Vue from 'vue'
import App from './App.vue'
import VueRouter from '../../index'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {
    name: 'helloWorld',
    path: '/',
    component: () => import('./components/HelloWorld.vue')
  },
  {
    name: 'inner',
    path: '/inner',
    component: () => import('./components/Inner.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
