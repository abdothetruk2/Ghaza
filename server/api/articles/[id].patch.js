// server/api/articles/[id].patch.js
import { ObjectId } from 'mongodb'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const { id }      = event.context.params
  const updates     = await readBody(event)
  updates.updatedAt = new Date()

  const db = useNitroApp().mongo
  const result = await db
    .collection('articles')
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    )

  if (result.matchedCount === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }
  return { modifiedCount: result.modifiedCount }
})
