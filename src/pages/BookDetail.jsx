import React from 'react'
import { useParams } from 'react-router-dom'
import books from '../data/books.json'

export default function BookDetail(){
  const {id} = useParams()
  const book = books.find(b=>b.id===id)
  if(!book) return <div>Book not found</div>

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    cart.push({id:book.id,title:book.title,price:book.price,qty:1})
    localStorage.setItem('cart',JSON.stringify(cart))
    alert(`${book.title} added to cart`)
  }

  return (
    <div className="book-detail">
      <div className="book-left">
        <div className="cover-large">
          <img src={book.image} alt={book.title} />
        </div>
      </div>
      <div className="book-right">
        <div className="book-meta card">
          <h2>{book.title}</h2>
          <h4 className="muted" style={{marginTop:6}}>{book.author}</h4>
          <div className="rating">{book.reviews.map((r,i)=>(<span key={i} className="star">★</span>))} <span className="muted small">({book.reviews.length} reviews)</span></div>
          <div className="price-large">${book.price}</div>
          <div style={{marginTop:14}}>
            <button className="btn" onClick={addToCart}>Add to Cart</button>
          </div>
        </div>

        <section className="card detail-section">
          <h3>Description</h3>
          <p className="muted">{book.description}</p>
        </section>

        <section className="card detail-section">
          <h3>Reviews</h3>
          {book.reviews.map((r,i)=> (
            <div key={i} className="review">
              <strong>{r.user}</strong>
              <div className="muted small">{'★'.repeat(r.rating)}</div>
              <div>{r.text}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
