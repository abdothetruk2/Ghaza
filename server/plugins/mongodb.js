// server/plugins/mongodb.js
import { MongoClient } from 'mongodb'

export default defineNitroPlugin(async () => {
  const uri    = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DB

  // Cache the connect() promise on globalThis so HMR won't open new connections
  if (!globalThis._mongoClientPromise) {
    const client = new MongoClient(uri)
    globalThis._mongoClientPromise = client.connect()
  }
  const client = await globalThis._mongoClientPromise
  const db     = dbName
    ? client.db(dbName)
    : client.db()   // if you embedded the name in URI

  // Expose the database under `useNitroApp().mongo`
  const nitroApp = useNitroApp()
  nitroApp.mongo = db
})
