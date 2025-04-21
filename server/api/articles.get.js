// server/api/articles.get.js
export default defineEventHandler(async () => {
  const db = useNitroApp().mongo
  return await db
    .collection('articles')
    .find()
    .sort({ createdAt: -1 })
    .toArray()
})
