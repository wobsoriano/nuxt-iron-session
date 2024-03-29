import { fileURLToPath } from 'url'
import { defineNuxtModule, addServerHandler, addTemplate, createResolver } from '@nuxt/kit'
import { defu } from 'defu'
import { IronSessionOptions } from 'iron-session'

export default defineNuxtModule<IronSessionOptions>({
  meta: {
    name: 'nuxt-iron-session',
    configKey: 'session',
    compatibility: {
      nuxt: '^3.5.0'
    }
  },
  defaults: {
    cookieName: 'nuxtapp_cookiename',
    password: 'complex_password_at_least_32_characters_long',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  },
  setup (moduleOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Private runtimeConfig
    nuxt.options.runtimeConfig.session = defu(nuxt.options.runtimeConfig.session, moduleOptions)

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addServerHandler({
      handler: resolve(runtimeDir, 'handler'),
      middleware: true
    })

    addTemplate({
      filename: 'types/iron-session.d.ts',
      getContents: () => `
        declare module 'h3' {
          import type { IronSession } from 'iron-session'
          interface H3EventContext {
            session: IronSession
          }
        }

        export {}
      `
    })

    nuxt.hook('nitro:config', (nitroConfig) => {
      // Inline module runtime in Nitro bundle
      nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
        inline: [resolve('./runtime')]
      })
    })

    nuxt.hook('prepare:types', (options) => {
      options.references.push({ path: resolve(nuxt.options.buildDir, 'types/iron-session.d.ts') })
    })
  }
})
