import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../layouts/Main'),
        children: [
            {
                path: '/',
                name: 'Dashboard',
                component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard'),
                meta: { requireAuth: true}
            }
        ]
    },
    {
        path: '/login', name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../views/Login'),
    },
    {
        path: '/calls',
        name: 'Calls',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Calls.vue')
    }
]

const router = new VueRouter({
  hashbang: false,
  mode: 'history',
  root: '/',
  routes
})

export default router
