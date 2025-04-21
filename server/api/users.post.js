export default defineEventHandler(async (event) => {
  const body = await readBody(event)     // e.g. { name, email }
  const db   = useNitroApp().mongo       // your MongoDB database

  const result = await db
    .collection('users')
    .insertOne(body)

  return { insertedId: result.insertedId }
})
