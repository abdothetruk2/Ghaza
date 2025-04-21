// server/api/articles/[id].get.js
import { ObjectId } from 'mongodb'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const db = useNitroApp().mongo

  const article = await db
    .collection('articles')
    .findOne({ _id: new ObjectId(id) })

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }
  return article
})
