<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Sidebar } from '@/widgets'
import { Icons } from '@/shared/ui'

const isMobileMenuOpen = ref(false)

const toggleSidebar = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeSidebar = () => {
  isMobileMenuOpen.value = false
}

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
<template>
  <div class="flex min-h-screen">
    <Sidebar :is-open="isMobileMenuOpen" @close="closeSidebar" />
    <main class="flex-1 relative">
      <!-- Кнопка для открытия сайдбара на мобильных -->
      <button
        v-if="!isMobileMenuOpen"
        @click="toggleSidebar"
        class="lg:hidden fixed top-4 left-4 z-60 p-2 bg-[#0E1212] border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
        aria-label="Открыть меню"
      >
        <Icons name="menu" :size="20" />
      </button>
      <router-view />
    </main>
  </div>
</template>
