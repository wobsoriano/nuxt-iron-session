import { eventHandler } from 'h3'
import type { IronSession, IronSessionOptions } from 'iron-session'
import { getIronSession } from 'iron-session'

// https://github.com/vvo/iron-session/blob/main/src/getPropertyDescriptorForReqSession.ts
function getPropertyDescriptorForReqSession (
  session: IronSession
): PropertyDescriptor {
  return {
    enumerable: true,
    get () {
      return session
    },
    set (value) {
      const keys = Object.keys(value)
      const currentKeys = Object.keys(session)

      currentKeys.forEach((key) => {
        if (!keys.includes(key)) {
          delete session[key]
        }
      })

      keys.forEach((key) => {
        session[key] = value[key]
      })
    }
  }
}

export function createIronSessionMiddleware (options: IronSessionOptions) {
  return eventHandler(async (event) => {
    console.log('TUMATAKBO NA FRIENDS')
    const session = await getIronSession(event.req, event.res, options)

    Object.defineProperty(
      event.req,
      'session',
      getPropertyDescriptorForReqSession(session)
    )

    Object.defineProperty(
      event.context,
      'session',
      getPropertyDescriptorForReqSession(session)
    )
  })
}
