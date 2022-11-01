export default defineEventHandler(async(event) => {
  event.req.session.user = {
    id: 20,
    name: 'john',
  }
  await event.req.session.save()
  console.log(event.req.session)
  return event.req.session
})
