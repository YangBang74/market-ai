<script setup lang="ts">
import { h } from 'vue'
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
</script>

<template>
  <div class="flex flex-col items-center justify-start h-screen auth-bg">
    <header class="flex items-center justify-between my-5 w-full p-4 max-w-227.75 bg-[#0E1212] border border-white/10 rounded-2xl py-6.5 px-11.75">
      <Logo />
      <nav class="flex items-center gap-5 font-semibold uppercase">
        <router-link v-for="value in routes" :key="value.path" :to="value.path">{{ value.name }}</router-link>
      </nav>
      <div class="flex items-center gap-5">
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

    </header> 
    <router-view />
  </div>
</template>

<style scoped>
.auth-bg {
  background: url('@/shared/assets/images/auth-bg.png') fixed center center / cover no-repeat;
}
</style>
