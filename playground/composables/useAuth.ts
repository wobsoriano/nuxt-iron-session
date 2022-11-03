import { useNuxtApp, useState } from '#imports'

interface User {
  isLoggedIn: boolean;
  login: string;
  avatarUrl: string;
}

export default function useAuth () {
  const { ssrContext } = useNuxtApp()
  const user = useState<User>('user', () => ssrContext?.event?.context?.session?.user)

  async function login (username: string) {
    const result = await $fetch('/api/login', {
      method: 'POST',
      body: {
        username
      }
    })

    user.value = result
  }

  async function logout () {
    const resp = await $fetch('/api/logout')
    user.value = resp
  }

  return {
    user,
    login,
    logout
  }
}
