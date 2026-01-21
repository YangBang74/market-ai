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
      <div class="flex items-center justify-between px-5.5 lg:py-8.75 py-3.5 lg:pl-5.5">
        <div class="flex items-center gap-2">
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
          <button
            v-if="!isMobileMenuOpen"
            @click="toggleSidebar"
            class="p-2 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg 
              v-if="!isMobileMenuOpen"
              class="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              v-else
              class="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>
      <div class="px-5.5 lg:pb-8.75 pb-3.5 ">        
        <router-view />
      </div>
    </main>
  </div>
</template>
