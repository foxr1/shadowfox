import './colours.css'
import { useState, useEffect, useRef } from 'react'

const Colours = () => {
  const [activeColor, setActiveColor] = useState(null)
  const colorsRef = useRef(null)

  const isDimmed = activeColor !== null

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    if (colorsRef.current) {
        observer.observe(colorsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div 
        className={`brand-dimmer ${isDimmed ? 'active' : ''}`}
        onClick={() => setActiveColor(null)}
        style={{ pointerEvents: isDimmed ? 'auto' : 'none' }}
      ></div>
      <div className="brand-section colors-section" ref={colorsRef}>
          <div className="brand-colors">
            <div 
              className={`color-container grow-in-color ${activeColor === 'burnt-negroni' ? 'active' : ''}`}
              onClick={() => setActiveColor('burnt-negroni')}
              onMouseEnter={() => setActiveColor('burnt-negroni')}
              onMouseLeave={() => setActiveColor(null)}
            >
              <div className="color-circle burnt-negroni"></div>
              <div className="color-details fade-in-details fade-in-up">
                <span className={'colour-name'}>Burnt Negroni</span>
                <span className={'color-hex'}>#9A1B02</span>
              </div>
            </div>

            <div 
              className={`color-container grow-in-color ${activeColor === 'manhattan-red' ? 'active' : ''}`}
              onClick={() => setActiveColor('manhattan-red')}
              onMouseEnter={() => setActiveColor('manhattan-red')}
              onMouseLeave={() => setActiveColor(null)}
            >
              <div className="color-circle manhattan-red"></div>
              <div className="color-details fade-in-details fade-in-up">
                <span className={'colour-name'}>Manhattan Red</span>
                <span className={'color-hex'}>#4D0F07</span>
              </div>
            </div>

            <div
              className={`color-container grow-in-color ${activeColor === 'neon-orange' ? 'active' : ''}`}
              onClick={() => setActiveColor('neon-orange')}
              onMouseEnter={() => setActiveColor('neon-orange')}
              onMouseLeave={() => setActiveColor(null)}
            >
              <div className="color-circle neon-orange"></div>
              <div className="color-details fade-in-details fade-in-up">
                <span className={'colour-name'}>Neon Orange</span>
                <span className={'colour-hex'}>#E74F0A</span>
              </div>
            </div>

            <div
              className={`color-container grow-in-color ${activeColor === 'seashell-pink' ? 'active' : ''}`}
              onClick={() => setActiveColor('seashell-pink')}
              onMouseEnter={() => setActiveColor('seashell-pink')}
              onMouseLeave={() => setActiveColor(null)}
            >
              <div className="color-circle seashell-pink"></div>
              <div className="color-details fade-in-details fade-in-up">
                <span className={'colour-name'}>Seashell Pink</span>
                <span className={'color-hex'}>#FFCFC4</span>
              </div>
            </div>
          </div>
          <div className="brand-divider grow-line"></div>
          <span className="brand-label fade-in-label">Colour Palette</span>
      </div>
    </>
  )
}

export default Colours