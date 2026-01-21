<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Sidebar } from '@/widgets'
import { Icons, LangSelect } from '@/shared/ui'
import { usePageTitle } from '@/features/get-page-title'

const isMobileMenuOpen = ref(false)
const { pageTitle } = usePageTitle()
const notificationCount = ref(5) // Пример количества уведомлений

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
    <main class="flex-1 relative lg:pl-60.25">
      <div class="flex items-center justify-between px-5.5 lg:py-8.75 py-3.5 lg:pl-5.5 pl-16">
        <div class="flex items-center gap-2">
          <button
            v-if="!isMobileMenuOpen"
            @click="toggleSidebar"
            class="lg:hidden fixed top-4.5 left-4 z-60 p-2 bg-[#0E1212] border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Открыть меню"
          >
            <Icons name="menu" :size="20" />
          </button>
          <h1 class="text-[2rem] font-medium">
            {{ pageTitle }}
          </h1>
        </div>
        <div class="flex items-center gap-4">
          <router-link
            to="/notifications"
            class="relative inline-flex items-center justify-center"
          >
              <Icons name="bell" :size="20" />
              <span
                v-if="notificationCount > 0"
                class="absolute -top-0.75 -right-1.5 flex h-3.75 w-3.75 items-center justify-center rounded-full bg-[#99E39E] text-[7px] font-semibold text-black"
              >
                {{ notificationCount > 999 ? '999+' : notificationCount }}
              </span>
          </router-link>
          <LangSelect />
        </div>
      </div>
      <div class="px-5.5 lg:pb-8.75 pb-3.5 ">        
        <router-view />
      </div>
    </main>
  </div>
</template>
