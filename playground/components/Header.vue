<script setup lang="ts">
import { useRouter, useAuth } from '#imports'

const router = useRouter()
const { user, logout } = useAuth()

async function handleLogout () {
  await logout()
  router.push('/login')
}
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </li>
        <li v-if="!user?.isLoggedIn">
          <NuxtLink to="/login">
            Login
          </NuxtLink>
        </li>
        <template v-else>
          <li>
            <NuxtLink to="/profile">
              Profile
            </NuxtLink>
          </li>
          <li>
            <a href="/api/logout" @click.prevent="handleLogout">
              Log out
            </a>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<style>
ul {
  display: flex;
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}

li {
  margin-right: 1rem;
  display: flex;
}

li:first-child {
  margin-left: auto;
}

a {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
}

a img {
  margin-right: 1em;
}

header {
  padding: 0.2rem;
  color: #fff;
  background-color: #333;
}
</style>
