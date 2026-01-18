import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const usePageTitle = () => {
  const route = useRoute()

  const pageTitle = computed(() => {
    return (route.meta?.title as string) || 'Страница'
  })

  return {
    pageTitle,
  }
}
