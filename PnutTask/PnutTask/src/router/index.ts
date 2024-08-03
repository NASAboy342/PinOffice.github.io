import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homeIndex',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/home',
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
    },
    {
      path: '/testPage',
      name: 'testPage',
      component: () => import('../views/TestPage.vue')
    },
    {
      path: '/failed',
      name: 'failed',
      component: () => import('../views/Failed.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router
