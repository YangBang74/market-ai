<script setup lang="ts">
import { Logo, Icons } from '@/shared/ui'
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (path: string) => {
  const currentPath = route.path
  // Для корневого пути проверяем точное совпадение
  if (path === '/') {
    return currentPath === '/'
  }
  // Для остальных путей проверяем точное совпадение или что путь начинается с маршрута
  // и следующий символ - / (чтобы избежать ложных срабатываний, например /balance и /balance-add)
  return currentPath === path || (currentPath.startsWith(path + '/'))
}
const routes = [
  {
    path: '/',
    name: 'Дашбоард',
    icon: 'dashboard',
  },
  {
    path: '/balance',
    name: 'Баланс',
    icon: 'wallet',
  },
  {
    path: '/friends',
    name: 'Друзья',
    icon: 'user-left',
  },
  {
    path: '/tasks',
    name: 'Задания',
    icon: 'tasks',
  }
]
</script>

<template>
  <article class="w-60.25 bg-[#0E1212] border-r border-white/10 py-5 px-4 space-y-4">
    <Logo />
    <router-link to="/profile" class="flex items-center gap-2">
      <img class="w-6 h-6 rounded-full" src="https://assets.ubuntu.com/v1/16c27f81-COF%20favicon-16x16.png"/>
      <span class="text-sm">
        @User1234123
      </span>
    </router-link>
    <div class="bg-[#9A999A]/20 h-px w-full"/>
    <nav class="space-y-4">
      <router-link v-for="route in routes" :key="route.path" :to="route.path" class="transition-all flex items-center gap-2.5 py-1.75 text-white/60 text-sm" :class="{ 'text-white! bg-[#99E39E]/10 rounded-lg py-2.5 pr-2': isActive(route.path) }">
        <div v-if="isActive(route.path)" class="w-1 h-5 bg-[#99E39E] rounded-lg"/>
        <Icons :name="route.icon" :size="15" />
        <span class="text-sm">{{ route.name }}</span>
      </router-link>
    </nav>    
    <div class="bg-[#9A999A]/20 h-px w-full"/>
    <router-link to="/settings" class="flex items-center gap-2.5 py-1.75 text-white/60 text-sm"  :class="{ 'text-white! bg-[#99E39E]/10 rounded-lg py-2.5 pr-2': isActive('settings') }">
      <Icons name="settings" :size="15" />
      <span class="text-sm">Настройки</span>
    </router-link>
    <div class="bg-[#9A999A]/20 h-px w-full"/>
    <button class="flex items-center gap-2.5 py-1.75 text-white/60 text-sm">
      <Icons name="logout" :size="15" />
      <span class="text-sm">Выйти из профиля</span>
    </button>
  </article>
</template>

