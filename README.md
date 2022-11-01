# nuxt-iron-session

[![Version](https://img.shields.io/npm/v/nuxt-iron-session?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/nuxt-iron-session)

Add stateless session support for Nuxt apps using signed and encrypted cookies. Powered by [iron-session](https://github.com/vvo/iron-session).

## Installation

```bash
npm install nuxt-iron-session
```

## Usage

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-iron-session'],
  session: {
    cookieName: 'yourapp_cookiename',
    password: 'complex_password_at_least_32_characters_long',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
})
```

```ts
// ~/server/api/login.ts
export default defineEventHandler((event) => {
  // get user from database then:
  event.req.session.user = {
    id: 69,
    admin: true,
  }
  await event.req.session.save()
  return { ok: true }
})
```

```ts
// ~/server/api/logout.ts
export default defineEventHandler((event) => {
  await event.req.session.destroy()
  return { ok: true }
})
```

## Typing session data with TypeScript

```ts
declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number
      admin?: boolean
    }
  }
}
```

Visit the [iron-session docs](https://github.com/vvo/iron-session) to see the complete configuration.

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

## License

MIT
