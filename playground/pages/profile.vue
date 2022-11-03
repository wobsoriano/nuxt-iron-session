<script setup lang="ts">
import { definePageMeta, useAuth, useFetch, computed } from '#imports'

const { user } = useAuth()

const { data: events } = useFetch('/api/events', {
  server: false,
  key: 'events'
})

definePageMeta({
  middleware: ['protected']
})

const githubUrl = computed(() => `https://github.com/${user.value?.login ?? ''}`)
</script>

<template>
  <div>
    <h1>Your GitHub profile</h1>
    <p v-if="user?.isLoggedIn" style="font-style: italic;">
      Public data, from
      <a :href="githubUrl">{{ githubUrl }}</a>, reduced to `login` and `avatar_url`.
    </p>
    <pre>{{ JSON.stringify(user, null, 2) }}</pre>
    <p v-if="events">
      Number of GitHub events for user: <b>{{ events.length }}</b>.
      <span v-if="events.length > 0">Last event type: <b>{{ events[0].type }}</b></span>
    </p>
  </div>
</template>
