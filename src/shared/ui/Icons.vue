<script setup lang="ts">
const props = defineProps<{
  name: string,
  size?: number,
}>()
</script>
<template>
  <svg  v-if="name === 'arrow-right'" width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.7832 6.7041L4.26172 13.4092V10.0557L0 13.4092V0L4.26172 3.35254V0L12.7832 6.7041Z" fill="black"/>
  </svg>
</template>

