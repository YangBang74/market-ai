<script setup lang="ts">
import { computed, type Component } from 'vue'
import type { Props, ButtonVariant, ButtonSize, ButtonRounded } from './model/type'


const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
  loading: false,
  rounded: 'md',
  prependIcon: undefined,
  as: 'button',
  type: 'button',
})

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  
  const variantClasses: Record<ButtonVariant, string> = {
    default: 'bg-[#99E39E] text-black hover:bg-[#99E39E]/90',
    secondary: 'bg-[#0E1212] text-white border border-white/10 hover:bg-[#0E1212]/80',
    outline: 'border border-white/20 bg-transparent hover:bg-white/10',
    ghost: 'hover:bg-white/10',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
  }
  
  const sizeClasses: Record<ButtonSize, string> = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-6',
    icon: 'h-10 w-10',
  }

  const roundedClasses: Record<ButtonRounded, string> = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  }
  
  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    roundedClasses[props.rounded],
  ].join(' ')
})
</script>

<template>
  <component
    :is="as"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="as === 'button' ? type : undefined"
  >
    <span v-if="loading" class="mr-2 h-4 w-4 animate-spin">
      <svg
        class="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
    <component v-else-if="prependIcon" :is="prependIcon" class="mr-2 h-4 w-4" />
    <slot />
  </component>
</template>
