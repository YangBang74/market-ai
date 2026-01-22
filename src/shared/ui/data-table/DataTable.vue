<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed } from 'vue'
import type { Props, SortDirection } from './model/type'
import { h } from 'vue'

const props = withDefaults(defineProps<Props<T>>(), {
  pageSize: 20,
  class: '',
})

const currentPage = ref(1)
const sortColumn = ref<string | null>(null)
const sortDirection = ref<SortDirection>(null)

const sortedData = computed(() => {
  if (!sortColumn.value || !sortDirection.value) {
    return props.data
  }

  const sorted = [...props.data].sort((a, b) => {
    const aVal = a[sortColumn.value!]
    const bVal = b[sortColumn.value!]
    
    if (aVal === bVal) return 0
    
    const comparison = aVal > bVal ? 1 : -1
    return sortDirection.value === 'asc' ? comparison : -comparison
  })

  return sorted
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  const end = start + props.pageSize
  return sortedData.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(sortedData.value.length / props.pageSize)
})

const handleSort = (columnKey: string) => {
  const column = props.columns.find(col => col.key === columnKey)
  if (!column?.sortable) return

  if (sortColumn.value === columnKey) {
    if (sortDirection.value === 'asc') {
      sortDirection.value = 'desc'
    } else if (sortDirection.value === 'desc') {
      sortColumn.value = null
      sortDirection.value = null
    }
  } else {
    sortColumn.value = columnKey
    sortDirection.value = 'asc'
  }
}

const SortChevron = (opts?: { rotated?: boolean; muted?: boolean }) => {
  const rotated = Boolean(opts?.rotated)
  const muted = opts?.muted ?? false

  return h(
    'svg',
    {
      width: 10,
      height: 6,
      viewBox: '0 0 10 6',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      class: [
        'w-2.5 h-1.5 shrink-0 transition-transform',
        muted ? 'opacity-60' : 'opacity-100',
        rotated ? 'rotate-180' : '',
      ].filter(Boolean).join(' '),
    },
    [
      h('path', {
        d: 'M9.49728 0.747275L5.12227 5.12227C5.08164 5.16295 5.03339 5.19522 4.98028 5.21724C4.92717 5.23926 4.87024 5.25059 4.81274 5.25059C4.75525 5.25059 4.69832 5.23926 4.64521 5.21724C4.5921 5.19522 4.54384 5.16295 4.50321 5.12227L0.128212 0.747275C0.0461192 0.665182 0 0.55384 0 0.437743C0 0.321647 0.0461192 0.210305 0.128212 0.128212C0.210305 0.046119 0.321647 0 0.437743 0C0.55384 0 0.665182 0.046119 0.747275 0.128212L4.81274 4.19423L8.87821 0.128212C8.91886 0.0875636 8.96712 0.0553197 9.02023 0.033321C9.07334 0.0113224 9.13026 0 9.18774 0C9.24523 0 9.30215 0.0113224 9.35526 0.033321C9.40837 0.0553197 9.45663 0.0875636 9.49728 0.128212C9.53792 0.16886 9.57017 0.217117 9.59216 0.270226C9.61416 0.323336 9.62549 0.380258 9.62549 0.437743C9.62549 0.495229 9.61416 0.552151 9.59216 0.60526C9.57017 0.65837 9.53792 0.706626 9.49728 0.747275Z',
        fill: '#9A999A',
      }),
    ],
  )
}

const getSortIcon = (columnKey: string) => {
  if (sortColumn.value !== columnKey) {
    // not sorted: show muted chevron
    return SortChevron({ muted: true })
  }
  // sorted: rotate for asc (up), default for desc (down)
  return SortChevron({ rotated: sortDirection.value === 'asc' })
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const getPageNumbers = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 2) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 3; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      pages.push(current - 1)
      pages.push(current)
      pages.push(current + 1)
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

const startItem = computed(() => (currentPage.value - 1) * props.pageSize + 1)
const endItem = computed(() => Math.min(currentPage.value * props.pageSize, sortedData.value.length))
</script>

<template>
  <div :class="['w-full', props.class]">
    <div class="overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#E1E6EF]/5 border-y border-[#E1E6EF]/10">
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                :class="[
                  'px-4 py-3 text-left text-sm font-medium text-white/60',
                  column.align === 'right' ? 'text-right' : column.align === 'center' ? 'text-center' : 'text-left'
                ]"
              >
                <button
                  v-if="column.sortable"
                  @click="handleSort(column.key)"
                  class="flex items-center gap-2 hover:text-white transition-colors"
                  :class="column.align === 'right' ? 'justify-end' : column.align === 'center' ? 'justify-center' : ''"
                >
                  <component :is="getSortIcon(column.key)" />
                  <span>{{ column.label }}</span>
                 
                </button>
                <span v-else>{{ column.label }}</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr
              v-for="(row, index) in paginatedData"
              :key="index"
              class="hover:bg-white/5 transition-colors"
            >
              <td
                v-for="column in columns"
                :key="column.key"
                :class="[
                  'px-4 py-3 text-sm text-white/80',
                  column.align === 'right' ? 'text-right' : column.align === 'center' ? 'text-center' : 'text-left'
                ]"
              >
                <component
                  v-if="column.render"
                  :is="column.render(row)"
                />
                <template v-else>
                  {{ row[column.key] }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-2 px-4 pb-4">
      <div class="text-sm text-white/60">
        {{ startItem }}-{{ endItem }} of {{ sortedData.length }} assets
      </div>
      <div class="flex items-center gap-1">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="p-2 rounded-md hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          <svg class="h-4 w-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          v-for="(page, index) in getPageNumbers"
          :key="index"
          @click="typeof page === 'number' && goToPage(page)"
          :class="[
            'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
            typeof page === 'number'
              ? page === currentPage
                ? 'text-[#99E39E]'
                : 'text-white/60 hover:bg-white/10'
              : 'text-white/60 cursor-default'
          ]"
          :disabled="typeof page !== 'number'"
          type="button"
        >
          {{ page }}
        </button>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="p-2 rounded-md hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          <svg class="h-4 w-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
