<script setup lang="ts">
import { ref, useAuth, useRouter, definePageMeta } from '#imports'

const router = useRouter()
const { login } = useAuth()

const errorMessage = ref('')

async function handleSubmit (payload: string) {
  try {
    await login(payload)
    router.push('/profile')
  } catch (error) {
    errorMessage.value = error?.data?.message
  }
}

definePageMeta({
  middleware: ['public']
})
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
