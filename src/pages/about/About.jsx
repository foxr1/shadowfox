import './about.css'
import { useEffect, useRef } from 'react'
import Section from '../../components/section/Section.jsx'
import Carousel from '../../components/carousel/Carousel'

const About = () => {
  const containerRef = useRef(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const observerOptions = {
      root: null, // Use viewport
      rootMargin: '0px',
      threshold: 0.3 // Trigger when 30% visible
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    if (containerRef.current) {
        observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Section id="about" title="About">
      <div className="about-inner-content" ref={containerRef}>
        <div className="team-annotation fade-in-content delay-text">
            <span className="team-text">The Team</span>
        </div>

        <Carousel />
          
        <div className="team-tagline fade-in-content delay-text-2">
            <span className="tagline-text">Partners in life, business, and crime.</span>
        </div>

        <footer className="footer">
          <p>&copy; Shadow Fox 2026 - {currentYear}</p>
        </footer>
      </div>
    </Section>
  )
}

export default About