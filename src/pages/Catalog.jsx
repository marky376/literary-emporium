import React, {useState, useMemo, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import books from '../data/books.json'

function addToCart(book){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]')
  cart.push({id:book.id,title:book.title,price:book.price,qty:1})
  localStorage.setItem('cart',JSON.stringify(cart))
  // use toast if available (replaces alert)
  if(typeof window !== 'undefined' && window.toast) window.toast(`${book.title} added to cart`)
  else alert(`${book.title} added to cart`)
}

export default function Catalog(){
  const location = useLocation()
  const navigate = useNavigate()
  const params = useMemo(()=>new URLSearchParams(location.search),[location.search])

  const [q,setQ] = useState('')
  const [genre,setGenre] = useState(params.get('genre')||'')
  const [saleOnly,setSaleOnly] = useState(false)
  const [minRating,setMinRating] = useState(0)
  const [sortBy,setSortBy] = useState('featured')

  // sync genre query param to state when location changes
  useEffect(()=>{
    const g = params.get('genre')||''
    setGenre(g)
  },[params])

  function updateQueryParam(key, value){
    const sp = new URLSearchParams(location.search)
    if(value) sp.set(key, value)
    else sp.delete(key)
    const qs = sp.toString()
    navigate(qs ? `/?${qs}` : '/')
  }

  function clearFilters(){
    setQ('')
    setGenre('')
    setSaleOnly(false)
    setMinRating(0)
    setSortBy('featured')
    navigate('/')
  }

  const results = useMemo(()=>{
    let out = books.filter(b=> (b.title+' '+b.author).toLowerCase().includes(q.toLowerCase()))
    if(genre) out = out.filter(b=> b.genre === genre)
    if(saleOnly) out = out.filter(b=> b.sale)
    if(minRating) out = out.filter(b=> (b.rating||0) >= Number(minRating))

    if(sortBy === 'price-asc') out = out.slice().sort((a,b)=>a.price-b.price)
    else if(sortBy === 'price-desc') out = out.slice().sort((a,b)=>b.price-a.price)
    else if(sortBy === 'rating') out = out.slice().sort((a,b)=>(b.rating||0)-(a.rating||0))
    return out
  },[q,genre,saleOnly,minRating,sortBy])

  return (
    <div id="catalog">
      <div className="catalog-header">
        <div>
          <h2>Featured Books</h2>
          <p className="muted">Curated edits and collections to make finding your next favorite a delight.</p>
        </div>

        <div className="filters">
          <input className="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by title, author..." />
          <label className="sr-only" htmlFor="genre-select">Filter by genre</label>
          <select id="genre-select" value={genre} onChange={e=>{ setGenre(e.target.value); updateQueryParam('genre', e.target.value) }}>
            <option value="">All genres</option>
            {[...new Set(books.map(b=>b.genre).filter(Boolean))].map(g=> (
              <option value={g} key={g}>{g}</option>
            ))}
          </select>
          <label className="small"><input type="checkbox" checked={saleOnly} onChange={e=>setSaleOnly(e.target.checked)} /> Sale only</label>
          <label className="small">Min rating
            <select value={minRating} onChange={e=>setMinRating(e.target.value)}>
              <option value={0}>Any</option>
              <option value={4}>4+</option>
              <option value={4.5}>4.5+</option>
            </select>
          </label>
          <label className="small">Sort
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
          <button className="btn outline small" onClick={clearFilters} aria-label="Clear filters">Clear</button>
        </div>
      </div>

      <div className="catalog-meta">
        <p className="muted">{results.length} result{results.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="catalog">
        {results.map(book=>(
          <div className="card book-card" key={book.id}>
            <div className="cover-wrap">
              <img className="cover" src={book.image} alt={book.title} />
              {book.sale && <span className="badge">SALE</span>}
              <div className="price-pill">${book.price}</div>
            </div>

            <div className="card-body">
              <h3 className="book-title">{book.title}</h3>
              <p className="muted book-author">{book.author}</p>
              <p className="book-snippet">{book.description}</p>
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
