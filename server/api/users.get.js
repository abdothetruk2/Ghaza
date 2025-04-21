export default defineEventHandler(async () => {
  const db    = useNitroApp().mongo
  const users = await db.collection('users').find().toArray()
  return users
})
