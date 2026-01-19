<script setup lang="ts">
import { Logo, Icons } from '@/shared/ui'
import { useRoute } from 'vue-router'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

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

const closeMobileMenu = () => {
  emit('close')
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
  <!-- Overlay для мобильных -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
    @click="closeMobileMenu"
  />

  <!-- Сайдбар -->
  <aside
    class="sticky! lg:static top-0 left-0 min-h-screen h-full w-60.25 bg-[#0E1212] border-r border-white/10 py-5 px-4 space-y-4 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0"
    :class="{
      '-translate-x-full': !isOpen,
      'translate-x-0': isOpen,
    }"
  >
    <Logo />

    <router-link
      to="/profile"
      class="flex items-center gap-2"
      @click="closeMobileMenu"
    >
      <img
        class="w-6 h-6 rounded-full"
        src="https://assets.ubuntu.com/v1/16c27f81-COF%20favicon-16x16.png"
      />
      <span class="text-sm"> @User1234123 </span>
    </router-link>
    <div class="bg-[#9A999A]/20 h-px w-full" />
    <nav class="space-y-4">
      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        class="transition-all flex items-center gap-2.5 py-1.75 text-white/60 text-sm"
        :class="{
          'text-white! bg-[#99E39E]/10 rounded-lg py-2.5 pr-2': isActive(route.path),
        }"
        @click="closeMobileMenu"
      >
        <div
          v-if="isActive(route.path)"
          class="w-1 h-5 bg-[#99E39E] rounded-lg"
        />
        <Icons :name="route.icon" :size="15" />
        <span class="text-sm">{{ route.name }}</span>
      </router-link>
    </nav>
    <div class="bg-[#9A999A]/20 h-px w-full" />
    <router-link
      to="/settings"
      class="flex items-center gap-2.5 py-1.75 text-white/60 text-sm"
      :class="{
        'text-white! bg-[#99E39E]/10 rounded-lg py-2.5 pr-2': isActive('/settings'),
      }"
      @click="closeMobileMenu"
    >
      <Icons name="settings" :size="15" />
      <span class="text-sm">Настройки</span>
    </router-link>
    <div class="bg-[#9A999A]/20 h-px w-full" />
    <button
      class="flex items-center gap-2.5 py-1.75 text-white/60 text-sm"
      @click="closeMobileMenu"
    >
      <Icons name="logout" :size="15" />
      <span class="text-sm">Выйти из профиля</span>
    </button>
  </aside>
</template>

