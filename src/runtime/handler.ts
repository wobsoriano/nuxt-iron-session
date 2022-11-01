import { createIronSessionMiddleware } from './middleware'
// @ts-expect-error: Nuxt generated
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

export default createIronSessionMiddleware(config.session)
