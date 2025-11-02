import React, {useRef} from 'react'

export default function Carousel({children}){
  const ref = useRef()
  const scroll = (by) => {
    if(!ref.current) return
    ref.current.scrollBy({ left: by, behavior: 'smooth' })
  }

  return (
    <div className="carousel-wrap">
      <button className="carousel-btn left" onClick={()=>scroll(-320)} aria-label="Scroll left">‹</button>
      <div className="carousel" ref={ref}>
        {children}
      </div>
      <button className="carousel-btn right" onClick={()=>scroll(320)} aria-label="Scroll right">›</button>
    </div>
  )
}
