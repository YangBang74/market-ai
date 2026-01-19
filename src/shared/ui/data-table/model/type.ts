export type SortDirection = 'asc' | 'desc' | null

export interface Column<T = any> {
  key: string
  label: string
  sortable?: boolean
  render?: (row: T) => any
  align?: 'left' | 'center' | 'right'
}

export interface Props<T = any> {
  columns: Column<T>[]
  data: T[]
  pageSize?: number
  class?: string
}
