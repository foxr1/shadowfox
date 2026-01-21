import './identity.css'
import { useEffect, useRef } from 'react'

const Identity = () => {
  const identityRef = useRef(null)

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
    
    if (identityRef.current) {
        observer.observe(identityRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="brand-section identity-section" ref={identityRef}>
        <div className="identity-row">
            <div className="identity-item fade-in-up">
                <span className="identity-title">Logotype</span>
                <div className="identity-box"></div>
            </div>
            <div className="identity-item fade-in-up">
                <span className="identity-title">Brandmark</span>
                <div className="identity-box"></div>
            </div>
            <div className="identity-item fade-in-up">
                <span className="identity-title">Submark</span>
                <div className="identity-box"></div>
            </div>
        </div>
        <div className="brand-divider grow-line"></div>
        <span className="brand-label fade-in-label">Identity</span>
    </div>
  )
}

export default Identity