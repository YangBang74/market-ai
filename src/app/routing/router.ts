import { createMemoryHistory, createRouter } from 'vue-router'

import { HomePage, AuthPage } from '@/pages'
import DefaultLayout from '../layout/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '/', component: HomePage },
      { path: '/auth', component: AuthPage },
    ],
  },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
