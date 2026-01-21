import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages'
import './App.css'
import './assets/fonts/fonts.css'
import { useState, useEffect } from 'react'

const ClickSpark = () => {
  const [sparks, setSparks] = useState([])

  useEffect(() => {
    const handleClick = (e) => {
      const id = Date.now()
      const x = e.pageX
      const y = e.pageY
      
      // Generate random rotation offset for this burst
      const rotationOffset = Math.random() * 360
      
      setSparks(prev => [...prev, { id, x, y, rotationOffset }])

      // Remove spark after animation
      setTimeout(() => {
        setSparks(prev => prev.filter(s => s.id !== id))
      }, 600)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="click-spark-container">
      {sparks.map(spark => (
        <div 
            key={spark.id} 
            className="spark-burst" 
            style={{ 
                left: spark.x, 
                top: spark.y,
                transform: `rotate(${spark.rotationOffset}deg)` // Rotate the whole burst
            }}
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="spark-line" style={{ '--i': i }}></div>
          ))}
        </div>
      ))}
    </div>
  )
}

function App() {
  return (
    <Router>
      <ClickSpark />
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App