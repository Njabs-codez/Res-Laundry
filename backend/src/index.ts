import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import authRoutes from './routes/auth.ts'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const app = new Hono({strict: false})

app.use("/api/*", cors({
  credentials: true,
  origin: ["http://localhost:3000"],
  allowMethods: ["GET", "POST", "PATCH", "DELETE", "HEAD", "OPTIONS",],
  allowHeaders: ["Authorization", "Content-Type", "Accept"]
}))

app.use("/api/*", logger())

app.route("/api/auth", authRoutes)

app.get('/api', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: 8000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
