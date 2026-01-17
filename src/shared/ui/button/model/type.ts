import type { Component } from "vue"

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'
export type ButtonRounded = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

export interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  rounded?: ButtonRounded
  disabled?: boolean
  loading?: boolean
  prependIcon?: Component | string
  as?: string
  type?: 'button' | 'submit' | 'reset'
}
