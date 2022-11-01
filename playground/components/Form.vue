<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')

defineProps<{
  errorMessage: string
}>()

const emit = defineEmits<{
  (e: 'submit', username: string): void
}>()
</script>

<template>
  <form @submit.prevent="emit('submit', username)">
    <label>
      <span>Type your GitHub username</span>
      <input v-model="username" type="text" name="username" required>
    </label>

    <button type="submit">
      Login
    </button>

    <p v-if="errorMessage" class="error">
      {{ errorMessage }}
    </p>
  </form>
</template>

<style>
form,
label {
  display: flex;
  flex-flow: column;
}

label > span {
  font-weight: 600;
}

input {
  padding: 8px;
  margin: 0.3rem 0 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: brown;
  margin: 1rem 0 0;
}
</style>
