import { createWebHistory, createRouter } from 'vue-router'

import { HomePage, AuthPage, BalancePage, FriendsPage, TasksPage } from '@/pages'
import DefaultLayout from '../layout/DefaultLayout.vue'
import AuthLayout from '../layout/AuthLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: HomePage, meta: { title: 'Дашбоард' } },
      { path: 'balance', component: BalancePage, meta: { title: 'Баланс' } },
      { path: 'friends', component: FriendsPage, meta: { title: 'Друзья' } },
      { path: 'tasks', component: TasksPage, meta: { title: 'Задания' } },
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
