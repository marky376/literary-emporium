import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function loadCart(){
  return JSON.parse(localStorage.getItem('cart')||'[]')
}

export default function Cart(){
  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>setItems(loadCart()),[])

  const remove = (index)=>{
    const next = [...items]; next.splice(index,1)
    setItems(next); localStorage.setItem('cart',JSON.stringify(next))
  }

  const total = items.reduce((s,i)=>s + (i.price||0)* (i.qty||1),0).toFixed(2)

  const checkout = async ()=>{
    setError(null)
    if(items.length===0) return
    setLoading(true)
    try{
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: items })
      })
      if(!res.ok){
        // try to parse error body
        let txt = await res.text()
        try{ const j = JSON.parse(txt); txt = j.error || txt }catch(e){}
        throw new Error(`Checkout failed: ${txt}`)
      }
      const data = await res.json()
      // store last order for the confirmation page
      localStorage.setItem('lastOrder', JSON.stringify(data))
      // clear cart
      localStorage.removeItem('cart')
      setItems([])
      navigate(`/order/${data.orderId}`)
    }catch(err){
      console.error(err)
      setError(err.message || 'Checkout failed')
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length===0 && <p>Your cart is empty.</p>}
      {items.map((it,idx)=> (
        <div key={idx} className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <strong>{it.title}</strong>
            <div style={{color:'#666'}}>${it.price} × {it.qty}</div>
          </div>
          <div>
            <button className="btn secondary" onClick={()=>remove(idx)}>Remove</button>
          </div>
        </div>
      ))}

      {items.length>0 && (
        <div style={{marginTop:12}}>
          <div style={{fontSize:18}}>Total: <strong>${total}</strong></div>
          <div style={{marginTop:8}}>
            <button className="btn" onClick={checkout} disabled={loading}>{loading? 'Processing…' : 'Checkout'}</button>
            {error && <div style={{color:'crimson',marginTop:8}}>{error}</div>}
          </div>
        </div>
      )}
    </div>
  )
}
