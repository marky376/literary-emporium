import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import books from '../data/books.json'

async function fetchRecommendations(cart){
  try{
    const res = await fetch('/api/recommendations', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({cart})
    })
    if(!res.ok) throw new Error('Failed to fetch')
    return await res.json()
  }catch(e){
    // fallback to client-side simple heuristic
    const genres = (cart||[]).map(i=>i.genre).filter(Boolean)
    const picks = books.filter(b=> genres.includes(b.genre)).slice(0,6)
    return { recommendations: picks }
  }
}

function addToCart(book){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]')
  cart.push({id:book.id,title:book.title,price:book.price,qty:1,genre:book.genre})
  localStorage.setItem('cart',JSON.stringify(cart))
  if(typeof window !== 'undefined' && window.toast) window.toast(`${book.title} added to cart`)
}

export default function Recommendations(){
  const [recs,setRecs] = useState([])
  useEffect(()=>{
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    fetchRecommendations(cart).then(data=>{
      setRecs(data.recommendations || data)
    })
  },[])

  return (
    <div className="recommendations-page">
      <div className="page-header">
        <h2>Recommended for You</h2>
        <p className="muted">Fresh picks based on what you've added to your cart — curated with a touch of boutique taste.</p>
      </div>

      <div className="catalog">
        {recs.length===0 && <p className="muted">No recommendations yet — add something to your cart to get personalized picks, or browse our collections below.</p>}
        {recs.map(book=> (
          <div className="card book-card" key={book.id}>
            <div className="cover-wrap">
              <img className="cover" src={book.image} alt={book.title} />
              {book.sale && <span className="badge">SALE</span>}
              <div className="price-pill">${book.price}</div>
            </div>
            <div className="card-body">
              <h3 className="book-title">{book.title}</h3>
              <p className="muted book-author">{book.author}</p>
              <div className="actions">
                <Link to={`/book/${book.id}`} className="btn secondary">View</Link>
                <button className="btn" onClick={()=>addToCart(book)}>Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
