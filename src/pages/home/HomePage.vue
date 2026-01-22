<script setup lang="ts">
import { ref, h } from 'vue'
import { BadgeStats, Button, DateRangePicker, DataTable } from '@/shared/ui'
import type { Column } from '@/shared/ui'
import { MonthProgressRing } from './ui'
import usdt from '@/shared/assets/images/usdt.png'

interface TradeData {
  coin: string
  bought: string
  sold: string
  pl: number
}

const tableData = ref<TradeData[]>([
  { coin: 'USDT', bought: '1,000012 USDT', sold: '$1,233', pl: -1000 },
  { coin: 'USDT', bought: '12 USDT', sold: '$12', pl: 100 },
  { coin: 'USDT', bought: '241 USDT', sold: '$45', pl: -10 },
  { coin: 'USDT', bought: '25 USDT', sold: '$123', pl: 5 },
  { coin: 'USDT', bought: '0,1231231 USDT', sold: '$0,123', pl: 2 },
  { coin: 'USDT', bought: '100 USDT', sold: '$150', pl: 50 },
  { coin: 'USDT', bought: '50 USDT', sold: '$75', pl: 25 },
  { coin: 'USDT', bought: '200 USDT', sold: '$180', pl: -20 },
  { coin: 'USDT', bought: '75 USDT', sold: '$90', pl: 15 },
  { coin: 'USDT', bought: '300 USDT', sold: '$350', pl: 50 },
  { coin: 'USDT', bought: '150 USDT', sold: '$120', pl: -30 },
  { coin: 'USDT', bought: '80 USDT', sold: '$100', pl: 20 },
  { coin: 'USDT', bought: '250 USDT', sold: '$300', pl: 50 },
  { coin: 'USDT', bought: '90 USDT', sold: '$70', pl: -20 },
  { coin: 'USDT', bought: '120 USDT', sold: '$150', pl: 25 },
  { coin: 'USDT', bought: '60 USDT', sold: '$80', pl: 20 },
  { coin: 'USDT', bought: '180 USDT', sold: '$200', pl: 20 },
  { coin: 'USDT', bought: '110 USDT', sold: '$90', pl: -20 },
  { coin: 'USDT', bought: '95 USDT', sold: '$120', pl: 25 },
  { coin: 'USDT', bought: '220 USDT', sold: '$250', pl: 30 },
])

const columns: Column<TradeData>[] = [
  {
    key: 'coin',
    label: 'Монета',
    sortable: true,
    render: (row) => h('div', { class: 'flex items-center gap-2' }, [

      h('img', { src: usdt, alt: 'USDT', class: 'w-6.25 h-6.25' }),
      h('span', row.coin)
    ])
  },
  {
    key: 'bought',
    label: 'Купили',
    sortable: true,
  },
  {
    key: 'sold',
    label: 'Продали',
    sortable: true,
  },
  {
    key: 'pl',
    label: 'P\\L',
    sortable: true,
    render: (row) => h('span', {
      class: row.pl >= 0 ? 'text-[#99E39E]' : 'text-[#E39999]'
    }, `${row.pl >= 0 ? '+' : ''}${row.pl}%`)
  },
  {
    key: 'action',
    label: 'Действие',
    sortable: true,
    render: () => h(Button, {
      size: 'sm',
      rounded: 'lg',
      class: 'text-xs h-6 font-medium'
    }, () => 'Открыть сделку')
  },
]
</script>
<template>
  <div class="space-y-5">
        
  <div class="grid md:grid-cols-12 grid-cols-1 gap-5">
    <div class="md:col-span-4 col-span-1 w-full bg-[#0E1212]/85 border border-white/10 rounded-xl p-6.5">
      <div class="flex xl:items-center items-start justify-between xl:flex-row flex-col gap-2">
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
    <div class="md:col-span-4 col-span-1 w-full bg-[#0E1212]/85 border border-white/10 rounded-xl p-6.5">
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
    <div class="md:col-span-4 col-span-1 w-full bg-[#0E1212]/85 border border-white/10 rounded-xl p-6.5 space-y-6.25">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          <img :src="usdt" alt="USDT" class="w-6.25 h-6.25">
          <p class="text-lg">USDT</p>
        </div>
        <BadgeStats :sum="24.6" />
      </div>
      <div class="space-y-px text-sm text-[#9A999A]">
        <p class="font-semibold">Баланс:</p>
        <p class="text-white text-lg">0.0000000123 USDT</p>
        <p>0.2 USD</p>
      </div>
      <div class="flex items-center gap-2.5">
        <Button size="sm" class="text-xs h-7.5 leading-7 font-medium w-full">+ Пополнить</Button>
        <Button variant="outline" size="sm" class="text-xs h-7.5 leading-7 font-medium w-full">- Вывести</Button>
      </div>
      <div class="h-px w-full bg-[#E1E6EF]/10"/>
      <div>
        <p class="text-lg font-medium">150 USDT</p>
        <p class="text-sm text-[#9A999A]">Сумма пополнения</p>
      </div>
      <div>
        <p class="text-lg font-medium text-[#99E39E]">150 USDT</p>
        <p class="text-sm text-[#9A999A]">Заработано трейдингом</p>
      </div>
      <div>
        <p class="text-lg font-medium text-[#01C3FD]">150 USDT</p>
        <p class="text-sm text-[#9A999A]">Сумма выводов</p>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 gap-5">

    <div class="col-span-1 w-full overflow-hidden bg-[#0E1212]/85 border border-white/10 rounded-xl p-0">
      <DataTable :columns="columns" :data="tableData" :page-size="5" />
    </div>  
  </div>
  </div>

</template>
