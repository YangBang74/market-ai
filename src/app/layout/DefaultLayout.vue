<script setup lang="ts">
import { Sidebar } from '@/widgets'
</script>
<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>
