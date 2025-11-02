// Simple mocked recommendations endpoint for Vercel serverless
// Accepts POST { cart: [{id, genre, ...}] } and returns recommendations based on genres and rating
const books = require('../src/data/books.json')

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(200).send('')

  try {
    const body = req.method === 'POST' ? req.body : {}
    const cart = body.cart || []
    const cartIds = new Set(cart.map(i => String(i.id)))
    const genres = cart.map(i => i.genre).filter(Boolean)

    // Score books: prefer same-genre, higher rating, not in cart
    const scored = books
      .filter(b => !cartIds.has(String(b.id)))
      .map(b => {
        let score = (b.rating || 0)
        if (genres.includes(b.genre)) score += 2
        if (b.sale) score += 0.25
        return { book: b, score }
      })
      .sort((a,b) => b.score - a.score)

    const recommendations = scored.slice(0, 8).map(s => s.book)

    return res.status(200).json({ recommendations })
  } catch (err) {
    console.error('recommendations error', err)
    return res.status(500).json({ error: 'internal' })
  }
}
