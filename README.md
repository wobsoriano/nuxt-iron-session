# nuxt-iron-session

[![Version](https://img.shields.io/npm/v/nuxt-iron-session?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/nuxt-iron-session)

🛠 Add stateless session support for Nuxt apps using signed and encrypted cookies. Powered by [iron-session](https://github.com/vvo/iron-session).

The session data is stored in encrypted cookies ("seals"). And only your server can decode the session data. There are no session ids, making iron sessions "stateless" from the server point of view.

Demo https://nuxt-iron-session.vercel.app

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

### API Routes

```ts
// ~/server/api/login.ts
export default defineEventHandler((event) => {
  // get user from database then:
  event.context.session.user = {
    id: 69,
    admin: true,
  }
  await event.context.session.save()
  return { ok: true }
})
```

```ts
// ~/server/api/user.ts
export default defineEventHandler((event) => {
  return { user: event.context.session.user }
})
```

```ts
// ~/server/api/logout.ts
export default defineEventHandler((event) => {
  await event.context.session.destroy()
  return { ok: true }
})
```

### Components

```html
<script lang="ts">
const { ssrContext } = useNuxtApp()

// Available in client and server. Unique to each request.
const session = useState('session', () => ssrContext?.event?.context?.session)
</script>
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

## Usage with h3

```ts
import { createIronSessionMiddleware } from 'nuxt-iron-session/middleware'

const app = createApp()

app.use(createIronSessionMiddleware({}))
app.use('/api/user', eventHandler((event) => ({ user: event.context.session.user })))
```

Visit the [iron-session docs](https://github.com/vvo/iron-session) to see the complete configuration.

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

## License

MIT
