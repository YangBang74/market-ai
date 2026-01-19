<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  percent: number
  size?: number
  strokeWidth?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 215,
  strokeWidth: 24,
  class: '',
})

const clampedPercent = computed(() => {
  const v = Number(props.percent)
  if (Number.isNaN(v)) return 0
  return Math.min(100, Math.max(0, v))
})

// We want the active arc to be visibly thicker than the background ring
// while keeping the same outside radius visually.
const trackWidth = computed(() => props.strokeWidth * 0.6)
const radius = computed(() => (props.size - props.strokeWidth) / 2)
const trackRadius = computed(() => radius.value + (props.strokeWidth - trackWidth.value) / 2)
const progressRadius = computed(() => radius.value)

const circumference = computed(() => 2 * Math.PI * progressRadius.value)
// For 100% активный участок покрывает весь круг
const dash = computed(() => (circumference.value * (clampedPercent.value / 100)))

const trackColor = 'rgba(153, 227, 158, 0.08)'
const progressColor = '#99E39E'
</script>

<template>
  <div
    :class="['relative grid place-items-center', props.class]"
    :style="{ width: `${props.size}px`, height: `${props.size}px` }"
  >
    <svg
      :width="props.size"
      :height="props.size"
      :viewBox="`0 0 ${props.size} ${props.size}`"
      class="block"
    >
      <!-- Track -->
      <circle
        :cx="props.size / 2"
        :cy="props.size / 2"
        :r="trackRadius"
        fill="none"
        :stroke="trackColor"
        :stroke-width="trackWidth"
      />
      <!-- Progress (start at top) -->
      <!-- Start a bit before the left-bottom corner to get the same arc as on design -->
      <g :transform="`rotate(-200 ${props.size / 2} ${props.size / 2})`">
        <circle
          :cx="props.size / 2"
          :cy="props.size / 2"
          :r="progressRadius"
          fill="none"
          :stroke="progressColor"
          :stroke-width="props.strokeWidth"
          stroke-linecap="butt"
          :stroke-dasharray="`${dash} ${circumference}`"
          :stroke-dashoffset="0"
        />
      </g>
    </svg>

    <div class="absolute inset-0 grid place-items-center">
      <span class="text-[40px] leading-none font-semibold text-[#99E39E]">
        {{ Math.round(clampedPercent) }}%
      </span>
    </div>
  </div>
</template>

