<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Props, DateRangePickerSize, DateRangePickerVariant } from './model/type'
import Icons from '@/shared/ui/Icons.vue'
import { h } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  variant: 'default',
  modelValue: () => ({ from: null, to: null }),
  placeholder: 'Выберите период',
  disabled: false,
  class: '',
})

const emits = defineEmits<{
  'update:modelValue': [value: { from: Date | null; to: Date | null }]
}>()

const isOpen = ref(false)
const currentView = ref<'months' | 'years'>('months')
const currentYear = ref(new Date().getFullYear())
const selectedFrom = ref<Date | null>(props.modelValue?.from || null)
const selectedTo = ref<Date | null>(props.modelValue?.to || null)
const tempFrom = ref<Date | null>(null)

const monthNames = [
  'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
  'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
]

const formatDateRange = computed(() => {
  if (!selectedFrom.value && !selectedTo.value) {
    return props.placeholder
  }
  
  if (selectedFrom.value && selectedTo.value) {
    const fromMonth = monthNames[selectedFrom.value.getMonth()]
    const fromYear = selectedFrom.value.getFullYear()
    const toMonth = monthNames[selectedTo.value.getMonth()]
    const toYear = selectedTo.value.getFullYear()
    
    return `${fromMonth} ${fromYear} - ${toMonth} ${toYear}`
  }
  
  if (selectedFrom.value) {
    const fromMonth = monthNames[selectedFrom.value.getMonth()]
    const fromYear = selectedFrom.value.getFullYear()
    return `${fromMonth} ${fromYear} - ...`
  }
  
  return props.placeholder
})


const months = computed(() => {
  return Array.from({ length: 12 }, (_, i) => i)
})

const isMonthSelected = (month: number, year: number) => {
  if (!selectedFrom.value || !selectedTo.value) return false
  
  const date = new Date(year, month, 1)
  return date >= selectedFrom.value && date <= selectedTo.value
}

const isMonthInRange = (month: number, year: number) => {
  if (!selectedFrom.value || !selectedTo.value) return false
  
  const date = new Date(year, month, 1)
  return date >= selectedFrom.value && date <= selectedTo.value
}

const selectMonth = (month: number) => {
  const date = new Date(currentYear.value, month, 1)
  
  if (!selectedFrom.value || (selectedFrom.value && selectedTo.value)) {
    // Start new selection
    selectedFrom.value = date
    selectedTo.value = null
    tempFrom.value = date
  } else if (selectedFrom.value && !selectedTo.value) {
    // Complete selection
    if (date < selectedFrom.value) {
      selectedTo.value = selectedFrom.value
      selectedFrom.value = date
    } else {
      selectedTo.value = date
    }
    tempFrom.value = null
    emitValue()
  }
}

const emitValue = () => {
  emits('update:modelValue', {
    from: selectedFrom.value,
    to: selectedTo.value,
  })
}

const resetSelection = () => {
  selectedFrom.value = null
  selectedTo.value = null
  tempFrom.value = null
  emitValue()
}

const toggleOpen = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

// Close on outside click
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.date-range-picker')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const componentClasses = computed(() => {
  const baseClasses = 'flex items-center justify-between gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
  
  const variantClasses: Record<DateRangePickerVariant, string> = {
    default: 'bg-[#0E1212] border border-white/10 text-white/60 hover:bg-[#0E1212]/80',
    outline: 'border-2 border-white/30 bg-transparent text-white hover:bg-white/10',
    ghost: 'border-0 bg-transparent text-white hover:bg-white/10',
  }
  
  const sizeClasses: Record<DateRangePickerSize, string> = {
    sm: 'h-9 px-3 text-sm',
    default: 'p-2.25 text-sm',
    lg: 'h-11 px-5 text-base',
  }
  
  return [baseClasses, variantClasses[props.variant], sizeClasses[props.size], props.class].filter(Boolean).join(' ')
})
</script>

<template>
  <div class="date-range-picker relative">
    <button
      :class="componentClasses"
      :disabled="disabled"
      @click="toggleOpen"
      type="button"
    >
      <span class="flex items-center gap-2">
        <span>{{ formatDateRange }}</span>
      </span>
      <component :is="h(Icons, { name: 'arrow-down' })" class="h-4 w-4" />
    </button>

    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 mt-2 w-80 rounded-lg border border-white/20 bg-[#0E1212] p-4 shadow-lg"
        @click.stop
      >
        <!-- Year Navigation -->
        <div class="mb-4 flex items-center justify-between">
          <button
            @click="currentYear--"
            class="rounded-md p-1 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            type="button"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="currentView = currentView === 'months' ? 'years' : 'months'"
            class="text-lg font-semibold hover:text-white/80 transition-colors"
            type="button"
          >
            {{ currentYear }}
          </button>
          <button
            @click="currentYear++"
            class="rounded-md p-1 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            type="button"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Months Grid -->
        <div v-if="currentView === 'months'" class="grid grid-cols-3 gap-2">
          <button
            v-for="month in months"
            :key="month"
            @click="selectMonth(month)"
            :class="[
              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
              {
                'bg-[#99E39E] text-black': isMonthSelected(month, currentYear),
                'bg-white/10 text-white': isMonthInRange(month, currentYear) && !isMonthSelected(month, currentYear),
                'text-white/60 hover:bg-white/5': !isMonthInRange(month, currentYear),
              }
            ]"
            type="button"
          >
            {{ monthNames[month] }}
          </button>
        </div>

        <!-- Actions -->
        <div v-if="selectedFrom && selectedTo" class="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <button
            @click="resetSelection"
            class="text-sm text-white/60 hover:text-white transition-colors"
            type="button"
          >
            Сбросить
          </button>
          <button
            @click="isOpen = false; emitValue()"
            class="rounded-md bg-[#99E39E] px-4 py-2 text-sm font-medium text-black hover:bg-[#99E39E]/90 transition-colors"
            type="button"
          >
            Применить
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.date-range-picker {
  position: relative;
}
</style>
