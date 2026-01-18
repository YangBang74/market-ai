<script setup lang="ts">
import { computed } from 'vue'
import { Icons } from '@/shared/ui'
const props = defineProps<{
  sum: number
}>()

const badgeStatsClasses = computed(() => {
  const baseClasses = 'flex items-center justify-center rounded-[0.125rem] py-0.5 px-1 text-sm font-medium gap-1'
  
  if (props.sum > 0) {
    return `${baseClasses} bg-[#99E39E]/20 border border-[#99E39E]/20 text-[#99E39E]`
  }
  
  if (props.sum < 0) {
    return `${baseClasses} bg-[#FF0000]/20 border border-[#FF0000]/20 text-[#FF0000]`
  }
  
  return baseClasses
})
</script>
<template>
  <div :class="badgeStatsClasses">
    {{ props.sum }}%
    <span :class="{ 'rotate-180': props.sum < 0 }" class="inline-flex items-center justify-center">
      <Icons name="arrow-up" :size="8" />
    </span>
  </div>
</template>
