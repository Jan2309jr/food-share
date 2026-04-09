import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dbPath = join(__dirname, 'data.db')

const db = await open({
  filename: dbPath,
  driver: sqlite3.Database,
})

await db.exec(`
CREATE TABLE IF NOT EXISTS food (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  foodType TEXT NOT NULL,
  quantity TEXT NOT NULL,
  donor TEXT NOT NULL,
  donorType TEXT NOT NULL,
  location TEXT NOT NULL,
  area TEXT NOT NULL,
  pickupTime TEXT NOT NULL,
  expiresAt TEXT,
  image TEXT,
  claimed INTEGER DEFAULT 0,
  urgent INTEGER DEFAULT 0,
  createdAt TEXT NOT NULL
);
`)

const app = express()
app.use(cors())
app.use(express.json())

const normalizeRow = (row) => ({
  ...row,
  claimed: Boolean(row.claimed),
  urgent: Boolean(row.urgent),
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/food', async (req, res) => {
  const items = await db.all('SELECT * FROM food ORDER BY createdAt DESC')
  res.json(items.map(normalizeRow))
})

app.post('/food', async (req, res) => {
  const {
    title,
    description,
    foodType,
    quantity,
    donor,
    donorType,
    location,
    area,
    pickupTime,
    expiresAt,
    image,
    urgent,
  } = req.body

  if (!title || !description || !foodType || !quantity || !donor || !location || !area || !pickupTime) {
    return res.status(400).json({ error: 'Missing required donation fields' })
  }

  const createdAt = new Date().toISOString()
  const result = await db.run(
    `INSERT INTO food (title, description, foodType, quantity, donor, donorType, location, area, pickupTime, expiresAt, image, urgent, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      description,
      foodType,
      quantity,
      donor,
      donorType || 'individual',
      location,
      area,
      pickupTime,
      expiresAt || null,
      image || null,
      urgent ? 1 : 0,
      createdAt,
    ]
  )

  const item = await db.get('SELECT * FROM food WHERE id = ?', [result.lastID])
  res.status(201).json(normalizeRow(item))
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Food Share backend running on http://localhost:4000')
})
