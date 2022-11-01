export default defineEventHandler(async(event) => {
  event.req.session.user = {
    id: 20,
    name: 'john',
  }
  await event.req.session.save()
  return event.req.session
})
