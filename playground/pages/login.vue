<script setup lang="ts">
import { ref, computed, useAsyncData } from '#imports'
const username = ref('')

const { error, execute } = await useAsyncData('USER_SESSION', () => $fetch('/api/login', {
  method: 'POST',
  body: {
    username: username.value
  }
}), {
  immediate: false
})

const errorMessage = computed(() => error.value?.data?.message ?? '')

async function handleSubmit (payload: string) {
  username.value = payload
  await execute()
}
</script>

<template>
  <div class="login">
    <Form :error-message="errorMessage" @submit="handleSubmit" />
  </div>
</template>

<style>
.login {
  max-width: 21rem;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
