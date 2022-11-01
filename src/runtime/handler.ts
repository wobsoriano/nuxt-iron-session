import { createIronSessionMiddleware } from './middleware'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

export default createIronSessionMiddleware(config.session)
