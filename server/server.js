import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dbPath = join(__dirname, 'data.db')
const JWT_SECRET = 'food-share-secret-key-2024'

const db = await open({
  filename: dbPath,
  driver: sqlite3.Database,
})

// Database Schema
await db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS food (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  foodType TEXT NOT NULL,
  quantity TEXT NOT NULL,
  donorId INTEGER,
  donorName TEXT,
  location TEXT NOT NULL,
  area TEXT NOT NULL,
  pickupTime TEXT NOT NULL,
  expiresAt TEXT,
  image TEXT,
  claimed INTEGER DEFAULT 0,
  claimedById INTEGER,
  urgent INTEGER DEFAULT 0,
  createdAt TEXT NOT NULL,
  FOREIGN KEY (donorId) REFERENCES users(id),
  FOREIGN KEY (claimedById) REFERENCES users(id)
);
`)

const app = express()
app.use(cors())
app.use(express.json())

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ error: 'Access denied' })

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })
    req.user = user
    next()
  })
}

const normalizeFood = (row) => ({
  ...row,
  claimed: Boolean(row.claimed),
  urgent: Boolean(row.urgent),
})

// --- Auth Endpoints ---

app.post('/auth/register', async (req, res) => {
  const { name, email, password, role, phone } = req.body
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const createdAt = new Date().toISOString()
    
    const result = await db.run(
      'INSERT INTO users (name, email, password, role, phone, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, phone, createdAt]
    )

    const user = { id: result.lastID, name, email, role }
    const token = jwt.sign(user, JWT_SECRET)
    res.status(201).json({ user, token })
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' })
    }
    res.status(500).json({ error: 'Failed to register user' })
  }
})

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body
  
  const user = await db.get('SELECT * FROM users WHERE email = ?', [email])
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const { password: _, ...userWithoutPassword } = user
  const token = jwt.sign(userWithoutPassword, JWT_SECRET)
  res.json({ user: userWithoutPassword, token })
})

// --- Food Endpoints ---

app.get('/food', async (req, res) => {
  const { foodType, area, urgent } = req.query
  let query = 'SELECT * FROM food WHERE claimed = 0'
  const params = []

  if (foodType && foodType !== 'All') {
    query += ' AND foodType = ?'
    params.push(foodType)
  }
  if (area && area !== 'All Areas') {
    query += ' AND area = ?'
    params.push(area)
  }
  if (urgent === 'true') {
    query += ' AND urgent = 1'
  }

  query += ' ORDER BY createdAt DESC'
  const items = await db.all(query, params)
  res.json(items.map(normalizeFood))
})

app.post('/food', authenticateToken, async (req, res) => {
  const {
    title, description, foodType, quantity,
    location, area, pickupTime, expiresAt, image, urgent
  } = req.body

  if (req.user.role !== 'donor') {
    return res.status(403).json({ error: 'Only donors can list food' })
  }

  const createdAt = new Date().toISOString()
  const result = await db.run(
    `INSERT INTO food (title, description, foodType, quantity, donorId, donorName, location, area, pickupTime, expiresAt, image, urgent, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, description, foodType, quantity, req.user.id, req.user.name, location, area, pickupTime, expiresAt, image, urgent ? 1 : 0, createdAt]
  )

  const item = await db.get('SELECT * FROM food WHERE id = ?', [result.lastID])
  res.status(201).json(normalizeFood(item))
})

app.patch('/food/:id/claim', authenticateToken, async (req, res) => {
  if (req.user.role !== 'recipient') {
    return res.status(403).json({ error: 'Only recipients can claim food' })
  }

  const food = await db.get('SELECT * FROM food WHERE id = ?', [req.params.id])
  if (!food) return res.status(404).json({ error: 'Food not found' })
  if (food.claimed) return res.status(400).json({ error: 'Food already claimed' })

  await db.run(
    'UPDATE food SET claimed = 1, claimedById = ? WHERE id = ?',
    [req.user.id, req.params.id]
  )

  const updated = await db.get('SELECT * FROM food WHERE id = ?', [req.params.id])
  res.json(normalizeFood(updated))
})

app.get('/food/my-listings', authenticateToken, async (req, res) => {
  const items = await db.all('SELECT * FROM food WHERE donorId = ? ORDER BY createdAt DESC', [req.user.id])
  res.json(items.map(normalizeFood))
})

app.get('/food/my-claims', authenticateToken, async (req, res) => {
  const items = await db.all('SELECT * FROM food WHERE claimedById = ? ORDER BY createdAt DESC', [req.user.id])
  res.json(items.map(normalizeFood))
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

const seedDatabase = async () => {
  const usersCount = await db.get('SELECT COUNT(*) as count FROM users')
  if (usersCount.count === 0) {
    console.log('Seeding database...')
    const hashedPassword = await bcrypt.hash('password123', 10)
    const now = new Date().toISOString()
    
    // Create a donor
    const donorResult = await db.run(
      'INSERT INTO users (name, email, password, role, phone, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
      ['Premium Hotel', 'donor@test.com', hashedPassword, 'donor', '+91 9988776655', now]
    )
    
    // Create a recipient
    await db.run(
      'INSERT INTO users (name, email, password, role, phone, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
      ['Peace Orphanage', 'recipient@test.com', hashedPassword, 'recipient', '+91 1122334455', now]
    )

    // Add some sample food
    const sampleFood = [
      {
        title: "Fresh Biryani - 50 servings",
        description: "Leftover catering biryani from a corporate event. Freshly prepared today.",
        foodType: "Indian",
        quantity: "50 servings",
        location: "Yelahanka New Town, Bangalore",
        area: "Yelahanka",
        pickupTime: "Today, 3:00 PM - 5:00 PM",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
        urgent: 1
      },
      {
        title: "Assorted Sandwiches",
        description: "Fresh sandwiches from today's lunch service.",
        foodType: "Continental",
        quantity: "30 pieces",
        location: "Sahakara Nagar, Bangalore",
        area: "Sahakara Nagar",
        pickupTime: "Today, 4:00 PM - 6:00 PM",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
        urgent: 0
      }
    ]

    for (const item of sampleFood) {
      await db.run(
        `INSERT INTO food (title, description, foodType, quantity, donorId, donorName, location, area, pickupTime, image, urgent, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [item.title, item.description, item.foodType, item.quantity, donorResult.lastID, 'Premium Hotel', item.location, item.area, item.pickupTime, item.image, item.urgent, now]
      )
    }
    console.log('Seeding complete!')
  }
}

app.listen(process.env.PORT || 4000, async () => {
  await seedDatabase()
  console.log('Food Share backend running on http://localhost:4000')
})


