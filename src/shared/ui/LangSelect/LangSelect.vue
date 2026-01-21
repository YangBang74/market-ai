<script setup lang="ts">
import { computed, ref } from 'vue'
import Icons from '@/shared/ui/Icons.vue'
import uk from '@/shared/assets/images/uk.png'
import ru from '@/shared/assets/images/ru.png'
// import { i18n, type AppLocale, setI18nLanguage } from '@/plugins/i18n'
 
const isLangOpen = ref(false)
const currentLocale = ref('en')
const locales= ['en', 'ru']
 
const currentLocaleLabel = computed(() => currentLocale.value.toUpperCase())

const getLocaleFlag = (locale: string) => {
  switch (locale) {
    case 'ru':
      return ru
    case 'en':
    default:
      return uk
  }
}

const currentFlagSrc = computed(() => getLocaleFlag(currentLocale.value))
 
const toggleLangDropdown = () => {
isLangOpen.value = !isLangOpen.value
  console.log(isLangOpen.value)
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
</script>

<template>
    <div class="relative">
      <button
        type="button"
        class="flex items-center gap-3 px-2.25 py-3.25 text-sm rounded-xl bg-white/10 cursor-pointer"
        @click.stop.prevent="toggleLangDropdown()"
      >
        <img
          :src="currentFlagSrc"
          :alt="currentLocaleLabel + ' flag'"
          class="inline-block w-6.75 h-5.5 rounded-sm object-cover"
        />
        {{ currentLocaleLabel }}
        <Icons name="arrow-down" :size="10" />
      </button>

      <div
        v-if="isLangOpen"
        class="absolute right-0 mt-2 w-24 overflow-hidden rounded-xl bg-[#262a2a] border border-white/5 shadow-lg py-1 text-sm"
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
          <span class="flex items-center gap-2">
            <img
              :src="getLocaleFlag(locale)"
              :alt="locale.toUpperCase() + ' flag'"
              class="inline-block w-6.75 h-5.5 rounded-sm object-cover"
            />
            <span>{{ locale.toUpperCase() }}</span>
          </span>
          <span v-if="currentLocale === locale" class="w-1.5 h-1.5 rounded-full bg-[#99E39E]" />
        </button>
      </div>
    </div>
</template>

