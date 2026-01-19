export type DateRangePickerSize = 'sm' | 'default' | 'lg'
export type DateRangePickerVariant = 'default' | 'outline' | 'ghost'

export interface Props {
  size?: DateRangePickerSize
  variant?: DateRangePickerVariant
  modelValue?: { from: Date | null; to: Date | null }
  placeholder?: string
  disabled?: boolean
  class?: string
}
