// @ts-expect-error: Nuxt generated
import { createIronSessionMiddleware } from '#nuxt-iron-session/middleware'
// @ts-expect-error: Nuxt generated
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

export default createIronSessionMiddleware(config.session)
