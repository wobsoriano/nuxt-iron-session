import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addServerHandler } from '@nuxt/kit'
import defu from 'defu'
import { IronSessionOptions } from 'iron-session'

export {
  IronSessionOptions
}

export default defineNuxtModule<IronSessionOptions>({
  meta: {
    name: 'nuxt-iron-session',
    configKey: 'session'
  },
  defaults: {
    cookieName: 'myapp_cookiename',
    password: 'complex_password_at_least_32_characters_long',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  },
  setup (moduleOptions, nuxt) {
    // Private runtimeConfig
    nuxt.options.runtimeConfig.session = defu(nuxt.options.runtimeConfig.session, moduleOptions)

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addServerHandler({
      handler: resolve(runtimeDir, 'handler'),
      middleware: true
    })
  }
})
