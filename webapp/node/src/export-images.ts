import { createPool } from 'mysql2/promise'
import { exportImages } from './image-store.js'

const db = createPool({
  host: process.env.ISUCONP_DB_HOST || '127.0.0.1',
  port: Number(process.env.ISUCONP_DB_PORT) || 3306,
  user: process.env.ISUCONP_DB_USER || 'root',
  password: process.env.ISUCONP_DB_PASSWORD || 'root',
  database: process.env.ISUCONP_DB_NAME || 'isuconp',
  connectionLimit: 1,
  charset: 'utf8mb4'
})

try {
  console.log(`Exported ${await exportImages(db)} images`)
} catch (e) {
  console.error(e)
} finally {
  await db.end()
}