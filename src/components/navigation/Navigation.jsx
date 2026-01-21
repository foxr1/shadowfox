import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './navigation.css'

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') {
        setIsVisible(true)
    } else {
        setIsVisible(false)
    }
  }, [location.pathname])

  const handleNavigation = (path) => {
    if (isMobile && !isNavExpanded) return

    navigate(path)
    
    if (isMobile) {
      setTimeout(() => {
        setIsNavExpanded(false)
      }, 1000)
    }
  }

  const toggleNav = (e) => {
    if (isMobile) {
      e.stopPropagation() // Prevent click from bubbling to elements below
      setIsNavExpanded(!isNavExpanded)
    }
  }

  const handleMouseEnter = () => {
    setIsNavExpanded(true)
  }

  const handleMouseLeave = () => {
    setIsNavExpanded(false)
  }

  return (
    <>
      <div 
        className={`nav-dimmer ${isNavExpanded ? 'active' : ''}`}
        style={{ pointerEvents: isNavExpanded ? 'auto' : 'none' }}
        onClick={() => setIsNavExpanded(false)}
      ></div>
      <nav 
        className={`side-nav ${isNavExpanded ? 'expanded' : ''} ${isVisible ? 'visible' : ''}`}
        onClick={toggleNav}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''} onClick={(e) => { e.stopPropagation(); handleNavigation('/') }}>
            <span className="nav-text">Home</span>
            <span className="nav-line"></span>
          </li>
          <li className={location.pathname === '/brand' ? 'active' : ''} onClick={(e) => { e.stopPropagation(); handleNavigation('/brand') }}>
            <span className="nav-text">Brand</span>
            <span className="nav-line"></span>
          </li>
          <li className={location.pathname === '/projects' ? 'active' : ''} onClick={(e) => { e.stopPropagation(); handleNavigation('/projects') }}>
            <span className="nav-text">Projects</span>
            <span className="nav-line"></span>
          </li>
          <li className={location.pathname === '/pricing' ? 'active' : ''} onClick={(e) => { e.stopPropagation(); handleNavigation('/pricing') }}>
            <span className="nav-text">Packages</span>
            <span className="nav-line"></span>
          </li>
          <li className={location.pathname === '/about' ? 'active' : ''} onClick={(e) => { e.stopPropagation(); handleNavigation('/about') }}>
            <span className="nav-text">About</span>
            <span className="nav-line"></span>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navigation