<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app'

const nuxtApp = useNuxtApp()

if (process.server) {
  console.log('nuxtApp.ssrContext.event.req.session', nuxtApp.ssrContext.event.req.session)
}
</script>
