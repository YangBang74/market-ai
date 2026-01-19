<script setup lang="ts">
import { BadgeStats, DateRangePicker } from '@/shared/ui'
import { MonthProgressRing } from './ui'
</script>
<template>
  <div class="grid grid-cols-6 gap-5">
    <div class="col-span-4 bg-[#0E1212]/85 border border-white/10 rounded-xl p-6.5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <p class="text-2xl font-semibold text-white">
            $240.8K
          </p>
          <BadgeStats :sum="26.5" />
        </div>
        <DateRangePicker placeholder="Выберите период" />
      </div>
      <div class="flex items-center justify-center gap-2 h-[30dvh] w-full">
        <p class="text-white/60 text-center">CHART SOME</p>
      </div>
    </div>
    <div class="col-span-2 bg-[#0E1212]/85 border border-white/10 rounded-xl p-6.5">
      <p class="text-white/60">Live chart сделок</p>
      <div class="mt-3.75 mb-5 flex items-center justify-center">
        <MonthProgressRing :percent="30" :stroke-width="30" />
      </div>
      <div class="space-y-5">
        <div class="flex items-center justify-between text-sm">
          <p class="text-white/60">Сделок за сегодня</p>
          <p class="">30k</p>
        </div>
        <div class="flex items-center justify-between text-sm">
          <p class="text-white/60">Процент за сегодня</p>
          <p class="">30k</p>
        </div>
      </div>
    </div>
  </div>
</template>
