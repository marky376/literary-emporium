import React from 'react'
import { useParams, Link } from 'react-router-dom'

export default function Order(){
  const { id } = useParams()
  const last = typeof window !== 'undefined' ? localStorage.getItem('lastOrder') : null
  const order = last ? JSON.parse(last) : null

  if(!order || order.orderId !== id) {
    return (
      <div>
        <h2>Order {id}</h2>
        <p>Order details not found in this browser. If you just completed checkout, try returning to the site from the same browser.</p>
        <p><Link to="/">Return to catalog</Link></p>
      </div>
    )
  }

  return (
    <div>
      <h2>Thank you — order received</h2>
      <p>Order ID: <strong>{order.orderId}</strong></p>
      <p>Total: <strong>${Number(order.total).toFixed(2)}</strong></p>
      <h3>Items</h3>
      {order.cart.map((it,idx)=> (
        <div key={idx} className="card" style={{marginBottom:8}}>
          <strong>{it.title}</strong>
          <div style={{color:'#666'}}>${it.price} × {it.qty}</div>
        </div>
      ))}

      <p style={{marginTop:12}}><Link to="/">Continue browsing</Link></p>
    </div>
  )
}
