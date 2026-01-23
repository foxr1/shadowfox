import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './navigation.css'

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  // Increased breakpoint to 1024 to include iPads/tablets as mobile/touch devices
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') {
        setIsVisible(true)
    } else {
        setIsVisible(false)
        // Ensure dimmer is also hidden when nav becomes invisible
        setIsNavExpanded(false)
    }
  }, [location.pathname])

  const handleNavigation = (e, path) => {
    // If mobile and closed, clicking an item should just open the menu (let event bubble to toggleNav)
    if (isMobile && !isNavExpanded) {
        return
    }

    // If open or desktop, we are navigating. Stop propagation to prevent toggleNav from closing it immediately.
    e.stopPropagation()

    // If navigating to home, immediately close the nav to trigger fade out
    if (path === '/') {
        setIsNavExpanded(false)
    }

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
    // Only expand on hover if visible (not on home page) and not on mobile/tablet
    if (isVisible && !isMobile) {
        setIsNavExpanded(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
        setIsNavExpanded(false)
    }
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
          <li className={location.pathname === '/' ? 'active' : ''} onClick={(e) => handleNavigation(e, '/')}>
            <span className="nav-text">Home</span>
            <span className="nav-line"></span>
          </li>
          <li className={location.pathname === '/brand' ? 'active' : ''} onClick={(e) => handleNavigation(e, '/brand')}>
            <span className="nav-text">Brand</span>
            <span className="nav-line"></span>
          </li>
          <li className={location.pathname === '/projects' ? 'active' : ''} onClick={(e) => handleNavigation(e, '/projects')}>
            <span className="nav-text">Projects</span>
            <span className="nav-line"></span>
          </li>
          <li className={location.pathname === '/pricing' ? 'active' : ''} onClick={(e) => handleNavigation(e, '/pricing')}>
            <span className="nav-text">Packages</span>
            <span className="nav-line"></span>
          </li>
          <li className={location.pathname === '/about' ? 'active' : ''} onClick={(e) => handleNavigation(e, '/about')}>
            <span className="nav-text">About</span>
            <span className="nav-line"></span>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navigation