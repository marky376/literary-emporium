// Simple serverless checkout endpoint for Vercel
// Accepts POST { cart: [...] } and returns { orderId, total, cart }

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { cart } = req.body || {}
  const total = (Array.isArray(cart) ? cart : []).reduce(
    (s, i) => s + (i.price || 0) * (i.qty || 1),
    0
  )

  // create a simple order id
  const orderId = 'ORD-' + Date.now().toString(36)

  // In a real app we'd persist to a database and process payment.
  // Serverless filesystem is ephemeral, so we just return a generated id.
  return res.status(200).json({ orderId, total, cart: cart || [] })
}
