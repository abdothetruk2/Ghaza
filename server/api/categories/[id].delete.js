// server/api/categories/[id].delete.js
import { ObjectId } from 'mongodb'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const db      = useNitroApp().mongo

  const result = await db
    .collection('categories')
    .deleteOne({ _id: new ObjectId(id) })

  if (result.deletedCount === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  }
  return { deletedCount: result.deletedCount }
})
