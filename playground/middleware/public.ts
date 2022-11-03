import { defineNuxtRouteMiddleware, navigateTo, useAuth } from '#imports'

export default defineNuxtRouteMiddleware(() => {
  const { user } = useAuth()

  if (user.value?.isLoggedIn) {
    return navigateTo('/profile')
  }
})
