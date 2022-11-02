import { Octokit } from 'octokit'

const octokit = new Octokit()

export default defineEventHandler(async (event) => {
  const { username } = await readBody<{ username: string }>(event)

  try {
    const {
      data: { login, avatar_url: avatarUrl }
    } = await octokit.rest.users.getByUsername({ username })

    const user = { isLoggedIn: true, login, avatarUrl }

    event.context.session.user = user
    await event.context.session.save()

    return user
  } catch (error) {
    if (error.status === 404) {
      throw createError({
        status: 404,
        message: error.response.data.message
      })
    }

    throw createError({
      status: 500,
      message: 'Server error'
    })
  }
})
