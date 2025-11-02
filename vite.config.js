import { defineConfig } from 'vite'

// Dev-only plugin to emulate Vercel serverless /api/checkout during local dev
export default defineConfig({
  plugins: [
    {
      name: 'dev-api-checkout',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/checkout' && req.method === 'POST') {
            let body = ''
            req.on('data', (chunk) => { body += chunk })
            req.on('end', () => {
              try {
                const parsed = body ? JSON.parse(body) : {}
                const cart = Array.isArray(parsed.cart) ? parsed.cart : []
                const total = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0)
                const orderId = 'DEV-ORD-' + Date.now().toString(36)
                const out = { orderId, total, cart }
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(out))
              } catch (err) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Invalid JSON' }))
              }
            })
            return
          }
          next()
        })
      }
    }
  ]
})
