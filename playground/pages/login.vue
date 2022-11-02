<script setup lang="ts">
import { ref } from '#imports'

const errorMessage = ref('')

async function handleSubmit (username: string) {
  try {
    const data = await $fetch('/api/login', {
      method: 'POST',
      body: {
        username
      }
    })
  } catch (error) {
    errorMessage.value = error.data.statusMessage
  }
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
