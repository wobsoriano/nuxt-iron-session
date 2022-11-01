export default defineEventHandler(async (event) => {
  await event.req.session.destroy()
  return event.context
})
