<script setup lang="ts">
import { ref, computed, h } from 'vue'
import type { Props, InputVariant, InputSize, InputRounded } from './model/type'
import Icons from '@/shared/ui/Icons.vue'

defineOptions({
  name: 'UiInput'
})

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  rounded: 'md',
  disabled: false,
  placeholder: '',
  defaultValue: '',
  modelValue: '',
  prependIcon: undefined,
  class: '',
  type: 'text',
})

const emits = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const inputValue = computed({
  get: () => props.modelValue || props.defaultValue || '',
  set: (value) => emits('update:modelValue', value)
})

const inputRef = ref<HTMLInputElement>()
const showPassword = ref(false)

const isPasswordType = computed(() => props.type === 'password')
const inputType = computed(() => {
  if (isPasswordType.value) {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const togglePasswordVisibility = (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()
  showPassword.value = !showPassword.value
  // Сохраняем фокус на input после переключения
  setTimeout(() => {
    inputRef.value?.focus()
  }, 0)
}

// Expose focus method for parent components
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
})

const hasPrependIcon = computed(() => !!props.prependIcon)

const iconClasses = computed(() => {
  const baseClasses = 'absolute top-1/2 -translate-y-1/2 text-white/60 pointer-events-none z-10 flex items-center justify-center'
  
  const sizeClasses: Record<InputSize, string> = {
    sm: 'left-2.5',
    default: 'left-3',
    lg: 'left-4',
  }
  
  const iconSizeClasses: Record<InputSize, string> = {
    sm: '[&>svg]:h-3.5 [&>svg]:w-3.5',
    default: '[&>svg]:h-4 [&>svg]:w-4',
    lg: '[&>svg]:h-5 [&>svg]:w-5',
  }
  
  return [baseClasses, sizeClasses[props.size], iconSizeClasses[props.size]].join(' ')
})

const inputClasses = computed(() => {
  const baseClasses = 'flex w-full bg-transparent text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
  
  const variantClasses: Record<InputVariant, string> = {
    default: 'border border-white/20 focus-visible:border-white/40 focus-visible:ring-1 focus-visible:ring-white/20',
    outline: 'border-2 border-white/30 focus-visible:border-white/50 focus-visible:ring-2 focus-visible:ring-white/30',
    ghost: 'border-0 focus-visible:ring-1 focus-visible:ring-white/20',
  }
  
  const sizeClasses: Record<InputSize, string> = {
    sm: 'h-8 px-3 py-1 text-xs',
    default: 'h-10 px-3.5 py-4',
    lg: 'h-12 px-5 py-3 text-base',
  }

  const roundedClasses: Record<InputRounded, string> = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  }

  const paddingWithIcon: Record<InputSize, string> = {
    sm: 'pl-9',
    default: 'pl-10',
    lg: 'pl-12',
  }
  
  const paddingRightWithEye: Record<InputSize, string> = {
    sm: 'pr-9',
    default: 'pr-10',
    lg: 'pr-12',
  }
  
  const paddingLeft = hasPrependIcon.value ? paddingWithIcon[props.size] : ''
  const paddingRight = isPasswordType.value ? paddingRightWithEye[props.size] : ''
  
  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    roundedClasses[props.rounded],
    paddingLeft,
    paddingRight,
    props.class,
  ].filter(Boolean).join(' ')
})

const eyeIconClasses = computed(() => {
  const baseClasses = 'absolute top-1/2 -translate-y-1/2 text-[#99E39E] cursor-pointer hover:opacity-80 transition-opacity z-10 flex items-center justify-center bg-[#99E39E]/10'
  
  const sizeClasses: Record<InputSize, string> = {
    sm: 'right-2.5',
    default: 'right-[0.1875rem] p-[0.5625rem] rounded-xl',
    lg: 'right-4',
  }
  
  const iconSizeClasses: Record<InputSize, string> = {
    sm: '[&>svg]:h-3.5 [&>svg]:w-3.5',
    default: '[&>svg]:h-4 [&>svg]:w-4',
    lg: '[&>svg]:h-5 [&>svg]:w-5',
  }
  
  return [baseClasses, sizeClasses[props.size], iconSizeClasses[props.size]].join(' ')
})
</script>

<template>
  <div class="relative w-full">
    <span
      v-if="hasPrependIcon"
      :class="iconClasses"
    >
      <component :is="prependIcon" />
    </span>
    <input
      ref="inputRef"
      v-model="inputValue"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
    />
    <button
      v-if="isPasswordType"
      type="button"
      @click.stop.prevent="togglePasswordVisibility"
      :class="eyeIconClasses"

      tabindex="-1"
      @mousedown.prevent
    >
      <component :is="h(Icons, { name: 'eye' })" />
    </button>
  </div>
</template>
