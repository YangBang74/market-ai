<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import Icons from '@/shared/ui/Icons.vue'

const isLangOpen = ref(false)
const currentLocale = ref('en')
const locales = ['en', 'ru']

const currentLocaleLabel = computed(() => currentLocale.value.toUpperCase())

const toggleLangDropdown = () => {
  isLangOpen.value = !isLangOpen.value
}

const changeLocale = (locale: string) => {
  if (locale === currentLocale.value) {
    isLangOpen.value = false
    return
  }

  currentLocale.value = locale
  // setI18nLanguage(locale)
  isLangOpen.value = false
}

// Закрытие при клике вне компонента
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.lang-switcher')) {
    isLangOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative lang-switcher">
    <button
      type="button"
      class="flex items-center gap-2 px-2 py-2 text-sm rounded-lg bg-transparent hover:bg-white/5 transition-colors cursor-pointer"
      @click.stop.prevent="toggleLangDropdown()"
    >
      {{ currentLocaleLabel }}
      <Icons name="arrow-down" :size="10" />
    </button>

    <div
      v-if="isLangOpen"
      class="absolute right-0 mt-2 w-24 overflow-hidden rounded-xl bg-black/90 border border-white/8 shadow-lg py-1 text-sm z-50"
    >
      <button
        v-for="locale in locales"
        :key="locale"
        type="button"
        class="flex w-full items-center justify-between px-3 py-1.5 hover:bg-white/5"
        :class="{
          'text-white': currentLocale === locale,
          'text-white/80': currentLocale !== locale,
        }"
        @click="changeLocale(locale)"
      >
        <span>{{ locale.toUpperCase() }}</span>
        <span
          v-if="currentLocale === locale"
          class="w-1.5 h-1.5 rounded-full bg-[#4E80EE]"
        />
      </button>
    </div>
  </div>
</template>
