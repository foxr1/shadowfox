import './Section.css'
import { useEffect, useRef } from 'react'

const Section = ({ id, title, children, className = '' }) => {
  const titleWrapperRef = useRef(null)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    if (titleWrapperRef.current) {
        observer.observe(titleWrapperRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id={id} className={`section ${className}`}>
      <div className="section-scroll-container">
        <div className="section-content-wrapper">
          <div ref={titleWrapperRef} className="section-title-wrapper">
              <h2 className="section-title">{title}</h2>
          </div>
          <div className="section-content">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section