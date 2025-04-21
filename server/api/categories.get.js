// server/api/categories.get.js
export default defineEventHandler(async () => {
  const db = useNitroApp().mongo
  return await db.collection('categories').find().toArray()
})
    