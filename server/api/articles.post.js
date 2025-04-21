// server/api/articles.post.js
export default defineEventHandler(async (event) => {
  const article = await readBody(event)  
  // expected shape: { title, content, authorId, categoryId, ... }

  // add server timestamps
  article.createdAt = new Date()
  article.updatedAt = new Date()

  const db = useNitroApp().mongo
  const { insertedId } = await db
    .collection('articles')
    .insertOne(article)

  return { insertedId }
})
