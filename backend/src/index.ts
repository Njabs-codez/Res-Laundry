import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import authRoutes from './routes/auth.ts'

const app = new Hono()

app.route("/api/auth", authRoutes)

app.get('/api/', (c) => {

  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: 8000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
