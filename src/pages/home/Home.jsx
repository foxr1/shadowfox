import './home.css'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navigation from '../../components/navigation/Navigation.jsx'
import Brand from '../brand/Brand'
import Projects from '../projects/Projects'
import Packages from '../packages/Packages'
import About from '../about/About'

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const contentRef = useRef(null)

  // Handle scroll to section on location change (clicks/history)
  useEffect(() => {
    const contentContainer = contentRef.current
    if (contentContainer && contentContainer.classList.contains('fading')) {
        setTimeout(() => {
            contentContainer.classList.remove('fading')
            scrollToSection()
        }, 300)
    } else {
        scrollToSection()
    }

    function scrollToSection() {
        if (location.state?.fromScroll) return

        const sectionId = location.pathname === '/' ? 'home' : location.pathname.substring(1)
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'auto' })
        }
    }
  }, [location])

  // Restore scroll position on refresh
  useEffect(() => {
    const storedScrollPosition = sessionStorage.getItem('scrollPosition')
    if (storedScrollPosition && contentRef.current) {
        setTimeout(() => {
            contentRef.current.scrollTop = parseInt(storedScrollPosition, 10)
        }, 0)
    }

    const handleScroll = () => {
        if (contentRef.current) {
            sessionStorage.setItem('scrollPosition', contentRef.current.scrollTop)
        }
    }

    const container = contentRef.current
    if (container) {
        container.addEventListener('scroll', handleScroll)
    }

    return () => {
        if (container) {
            container.removeEventListener('scroll', handleScroll)
        }
    }
  }, [])

  // Handle URL update on scroll
  useEffect(() => {
    const observerOptions = {
      root: contentRef.current,
      rootMargin: '0px',
      threshold: 0.5 // Standard threshold
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          const newPath = sectionId === 'home' ? '/' : `/${sectionId}`

          if (location.pathname !== newPath) {
             navigate(newPath, { replace: true, state: { fromScroll: true } })
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const sections = document.querySelectorAll('.section')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [navigate, location.pathname])

  // Split title into letters
  const title = "Shadow Fox"
  const letters = title.split('').map((char, index) => (
    <span key={index} className={`title-letter ${char}`} style={{ '--letter-index': index }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <div className="main-container">
      <Navigation />

      <div className="content-container" ref={contentRef}>
        <section id="home" className="section">
          <h1 className="animated-title">{letters}</h1>
          <span className={'home-tagline'}>We work in your shadow.</span>
        </section>
        
        <Brand />
        <Projects />
        <Packages />
        <About />
      </div>
    </div>
  )
}

export default Home