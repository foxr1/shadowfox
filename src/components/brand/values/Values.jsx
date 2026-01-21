import './values.css'
import { useEffect, useRef } from 'react'

const Values = () => {
  const valuesRef = useRef(null)

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
    
    if (valuesRef.current) {
        observer.observe(valuesRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="brand-section values-section" ref={valuesRef}>
        <ul className="brand-values">
          <li className="fade-in-value fade-in-up">
              <div className="value-number">1</div>
              <span className="value-title">Listening</span>
              <p className="value-description">We listen to understand, not just to reply.</p>
          </li>
          <li className="fade-in-value fade-in-up">
              <div className="value-number">2</div>
              <span className="value-title">Patience</span>
              <p className="value-description">Great things take time to build.</p>
          </li>
          <li className="fade-in-value fade-in-up">
              <div className="value-number">3</div>
              <span className="value-title">Commitment</span>
              <p className="value-description">Dedicated to the craft and the outcome.</p>
          </li>
        </ul>
        <div className="brand-divider grow-line"></div>
        <span className="brand-label fade-in-label">Brand Values</span>
    </div>
  )
}

export default Values