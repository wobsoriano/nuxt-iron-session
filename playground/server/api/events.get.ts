import { Octokit } from 'octokit'

const octokit = new Octokit()

export default defineEventHandler(async (event) => {
  const { user } = event.context.session

  if (!user || user.isLoggedIn === false) {
    throw createError({
      status: 401,
      statusMessage: 'Not authenticated'
    })
  }

  try {
    const { data: events } =
      await octokit.rest.activity.listPublicEventsForUser({
        username: user.login
      })

    return events
  } catch {
    return []
  }
})
