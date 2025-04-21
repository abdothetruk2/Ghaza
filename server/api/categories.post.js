// server/api/categories.post.js
export default defineEventHandler(async (event) => {
  const category = await readBody(event)     // e.g. { name: 'Tech', slug: 'tech' }
  const db = useNitroApp().mongo

  const result = await db.collection('categories').insertOne(category)
  return { insertedId: result.insertedId }
})
