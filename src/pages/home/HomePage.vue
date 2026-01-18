<script setup lang="ts">
import { BadgeStats } from '@/shared/ui'
</script>
<template>
  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-4 bg-[#0E1212]/85 border border-white/10 rounded-xl p-6.5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <p class="text-2xl font-semibold text-white">
            $240.8K
          </p>
          <BadgeStats :sum="26.5" />
        </div>

        
      </div>
    </div>
    <div class="col-span-1">
      <p>Dashboard Page</p>
    </div>
  </div>
</template>
