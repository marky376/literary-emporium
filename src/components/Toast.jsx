import React, { useState, useEffect } from 'react'

export default function Toast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    // expose global function for quick use in the app
    window.toast = (msg, opts={timeout:3000}) => {
      const id = Date.now() + Math.random()
      setToasts(t => [...t, { id, msg }])
      if (opts.timeout) setTimeout(() => {
        setToasts(t => t.filter(x => x.id !== id))
      }, opts.timeout)
    }
    return () => { try { delete window.toast } catch(e){} }
  }, [])

  return (
    <div className="toast-wrap" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className="toast">{t.msg}</div>
      ))}
    </div>
  )
}
