// server/api/categories/[id].patch.js
import { ObjectId } from 'mongodb'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const updates = await readBody(event)
  const db = useNitroApp().mongo

  const result = await db
    .collection('categories')
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    )

  if (result.matchedCount === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  }
  return { modifiedCount: result.modifiedCount }
})
