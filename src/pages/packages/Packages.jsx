import './packages.css'
import Section from '../../components/section/Section.jsx'
import ContactCard from '../../components/contactCard/ContactCard'
import { useState, useEffect, useRef } from 'react'

const Packages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const listRef = useRef(null)
  const buttonRef = useRef(null)

  const handleContactClick = () => {
    setIsModalOpen(true)
    setIsClosing(false)
  }

  const handleCloseModal = () => {
    setIsClosing(true)
    // Wait for animation to finish before removing from DOM
    setTimeout(() => {
        setIsModalOpen(false)
        setIsClosing(false)
    }, 500) // Match animation duration
  }

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
    
    if (listRef.current) observer.observe(listRef.current)
    if (buttonRef.current) observer.observe(buttonRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <Section id="pricing" title="Packages">
      <div className="pricing-content-wrapper">
        <div className="packages-list" ref={listRef}>
          <div className="package-item fade-in-package">Websites</div>
          <div className="package-divider fade-in-package"></div>
          <div className="package-item fade-in-package">Posters</div>
          <div className="package-divider fade-in-package"></div>
          <div className="package-item fade-in-package">Logos</div>
          <div className="package-divider fade-in-package"></div>
          <div className="package-item fade-in-package">Artwork</div>
          <div className="package-divider fade-in-package"></div>
          <div className="package-item fade-in-package">Branding</div>
        </div>
        
        <div className="button-wrapper" ref={buttonRef}>
            <button className="contact-button fade-in-button" onClick={handleContactClick}>
              Contact Us
            </button>
        </div>
      </div>

      <ContactCard 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        isClosing={isClosing} 
      />
    </Section>
  )
}

export default Packages