<script setup lang="ts">
import { definePageMeta, useAuth } from '#imports'

const { user } = useAuth()

definePageMeta({
  middleware: ['protected']
})
</script>

<template>
  <div>
    <h1>Your GitHub profile</h1>
    <p v-if="user" style="font-style: italic;">
      Public data, from
      <a :href="`https://github.com/${user.login}`">
        https://github.com/{{ user.login }}
      </a>
      , reduced to `login` and `avatar_url`.
    </p>
    <pre>{{ JSON.stringify(user, null, 2) }}</pre>
  </div>
</template>
