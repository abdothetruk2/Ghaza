import { defineEventHandler, setResponseStatus } from 'h3'
import formidable from 'formidable'
import { createReadStream, createWriteStream } from 'fs'
import { join } from 'path'
import { mkdir } from 'fs/promises'

export const config = {
  api: { bodyParser: false } // Disable Nuxt’s default body parser
}

export default defineEventHandler(async (event) => {
  // Parse multipart form
  const form = formidable({ multiples: false })
  const { files } = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })

  // Grab the single file
  const file = Array.isArray(files.file) ? files.file[0] : files.file
  if (!file) {
    setResponseStatus(event, 400)
    return { error: 'No file uploaded' }
  }

  // Ensure the uploads directory exists
  const uploadsDir = join(process.cwd(), 'public')
  await mkdir(uploadsDir, { recursive: true })

  // Define the path to save the file
  const filePath = join(uploadsDir, file.originalFilename)

  // Save the file to the uploads directory
  await new Promise((res, rej) => {
    createReadStream(file.filepath)
      .pipe(createWriteStream(filePath))
      .on('error', rej)
      .on('finish', res)
  })

  // Return the file path as a public URL
  return {
    filename: file.originalFilename,
    url: `/${file.originalFilename}`
  }
})