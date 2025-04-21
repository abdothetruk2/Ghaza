import { defineEventHandler, sendStream, setResponseStatus, getQuery } from 'h3'
import { ObjectId, GridFSBucket } from 'mongodb'
import defineNitroPlugin from '~/server/plugins/mongodb'

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event)
  if (!id) {
    setResponseStatus(event, 400)
    return { error: 'Missing id' }
  }

  let objectId
  try {
    objectId = new ObjectId(id)
  } catch { 
    setResponseStatus(event, 400)
    return { error: 'Invalid id' }
  }

  const db = await defineNitroPlugin()
  if (!db) {
    setResponseStatus(event, 500)
    return { error: 'Database connection failed' }
  }

  const bucket = new GridFSBucket(db, { bucketName: 'images' })
  try {
    const downloadStream = bucket.openDownloadStream(objectId)
    return sendStream(event, downloadStream)
  } catch (error) {
    setResponseStatus(event, 500)
    return { error: 'Failed to download image' }
  }
})