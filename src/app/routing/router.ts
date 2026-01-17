import { createWebHistory, createRouter } from 'vue-router'

import { HomePage, AuthPage } from '@/pages'
import DefaultLayout from '../layout/DefaultLayout.vue'
import AuthLayout from '../layout/AuthLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: HomePage },
    ],

  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: '', component: AuthPage },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
