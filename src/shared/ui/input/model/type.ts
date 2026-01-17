import type { Component } from "vue"

export type InputVariant = 'default' | 'outline' | 'ghost'
export type InputSize = 'sm' | 'default' | 'lg'
export type InputRounded = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

export interface Props {
  variant?: InputVariant
  size?: InputSize
  rounded?: InputRounded
  disabled?: boolean
  placeholder?: string
  defaultValue?: string | number
  modelValue?: string | number
  prependIcon?: Component | string
  class?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
}
