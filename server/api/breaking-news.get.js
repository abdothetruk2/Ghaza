// server/api/breaking-news.get.js
export default defineEventHandler(async () => {
  const db = useNitroApp().mongo
  return await db
    .collection('breaking_news')
    .find()
    .sort({ createdAt: -1 })
    .toArray()
})
