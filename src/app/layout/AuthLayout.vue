<script setup lang="ts">
import { ref, h } from 'vue'
import { Logo, Button, LangSelect } from '@/shared/ui'
import Icons from '@/shared/ui/Icons.vue'

const routes = [
  {
    path: '/',
    name: 'Главная',
  },
  {
    path: '/about',
    name: 'О проекте'
  },
  {
    path: '/stats',
    name: 'Статистика'
  }
]

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div class="flex flex-col items-center justify-start h-screen auth-bg px-5">
    <header class="relative flex items-center justify-between my-2 md:my-5 w-full mx-4 md:mx-auto p-3 lg:p-4 max-w-full md:max-w-227.75 bg-[#0E1212] border border-white/10 rounded-xl md:rounded-2xl py-4 lg:py-6.5 px-4 lg:px-11.75">
      <Logo />
      
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center lg:gap-5 gap-3 font-semibold uppercase text-sm lg:text-base">
        <router-link 
          v-for="value in routes" 
          :key="value.path" 
          :to="value.path"
          class="hover:text-white/80 transition-colors"
        >
          {{ value.name }}
        </router-link>
      </nav>

      <!-- Desktop Actions -->
      <div class="hidden md:flex items-center gap-5">
        <Button 
          type="button" 
          size="lg" 
          variant="default" 
          :disabled="false" 
          :loading="false" 
          class="gap-2"
          :prepend-icon="h(Icons, { name: 'arrow-right'})"
        >
          Start Now
        </Button>
        <LangSelect />
      </div>

      <!-- Mobile Actions -->
      <div class="flex md:hidden items-center gap-3">
        <LangSelect />
        <button
          @click="toggleMobileMenu"
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

      <!-- Mobile Menu -->
      <div 
        v-if="isMobileMenuOpen"
        class="absolute top-full left-0 right-0 mt-2 bg-[#0E1212] border border-white/10 rounded-xl p-4 md:hidden z-50"
      >
        <nav class="flex flex-col gap-3 font-semibold uppercase text-sm">
          <router-link 
            v-for="value in routes" 
            :key="value.path" 
            :to="value.path"
            class="py-2 hover:text-white/80 transition-colors"
            @click="toggleMobileMenu"
          >
            {{ value.name }}
          </router-link>
          <Button 
            type="button" 
            size="default" 
            variant="default" 
            class="w-full mt-2"
            :prepend-icon="h(Icons, { name: 'arrow-right'})"
          >
            Start Now
          </Button>
        </nav>
      </div>
    </header> 
    <router-view />
  </div>
</template>

<style scoped>
.auth-bg {
  background: url('@/shared/assets/images/auth-bg.png') fixed center center / cover no-repeat;
}
</style>
