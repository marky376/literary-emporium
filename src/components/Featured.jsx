import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from './Carousel'
import books from '../data/books.json'

const collections = [
  {
    id: 'curator',
    title: "Curator's Picks",
    subtitle: 'A careful edit of memorable reads for your home library',
    genre: ''
  },
  {
    id: 'cosmic',
    title: 'Cosmic Frontiers',
    subtitle: 'Speculative epics and ingenious science-fiction',
    genre: 'science-fiction'
  },
  {
    id: 'midnight',
    title: 'Midnight Romances',
    subtitle: 'Intimate, dreamy novels for late-night reading',
    genre: 'fiction'
  }
]

function sampleForGenre(g){
  if(!g) return books.slice(0,5)
  return books.filter(b=>b.genre===g).slice(0,5)
}

export default function Featured(){
  return (
    <section className="featured">
      <div className="featured-inner">
        <h2>Featured Collections</h2>
        <p className="muted">Shop our boutique collections — hand-picked with an eye for surprise, rarity, and the perfect cover.</p>

        <Carousel>
          {collections.map(col => (
            <div className="featured-card" key={col.id}>
              <div className="collection-art">
                {sampleForGenre(col.genre).map(b=> (
                  <img key={b.id} src={b.image} alt="" className="thumb" />
                ))}
              </div>
              <div className="collection-body">
                <h3>{col.title}</h3>
                <p className="muted small">{col.subtitle}</p>
                <Link to={`/?genre=${col.genre}`} className="btn small">Shop the collection</Link>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}
