// server/api/breaking-news.post.js
export default defineEventHandler(async (event) => {
  const news = await readBody(event)   // e.g. { title, content }
  const db = useNitroApp().mongo

  // tag a timestamp
  news.createdAt = new Date()

  const result = await db
    .collection('breaking_news')
    .insertOne(news)

  return { insertedId: result.insertedId }
})
