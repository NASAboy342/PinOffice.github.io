import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../views/Info.vue')
    }
    ,
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/Todo.vue')
    },
    {
      path: '/inProgress',
      name: 'inProgress',
      component: () => import('../views/InProgress.vue')
    },
    {
      path: '/pending',
      name: 'pending',
      component: () => import('../views/Pending.vue')
    },
    {
      path: '/done',
      name: 'done',
      component: () => import('../views/Done.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    }
  ]
})

export default router
