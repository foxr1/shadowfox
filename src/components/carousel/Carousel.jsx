import './Carousel.css'
import { useEffect, useRef, useState } from 'react'

// Dynamically import all images from the assets/images/about folder
const images = Object.values(import.meta.glob('../../assets/images/about/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' }))

const shapes = [
    'shape-1', // Circle
    'shape-2', // Squircle / Superellipse
    'shape-3', // Rounded Diamond / Lozenge
    'shape-4', // Pill / Stadium
    'shape-5'  // Organic Blob
]

const Carousel = () => {
  const trackRef = useRef(null)
  
  // Animation refs
  const animationRef = useRef(null)
  const positionRef = useRef(0)
  const velocityRef = useRef(0.5) // Base speed
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)

  // Animation Loop
  useEffect(() => {
    const baseSpeed = 0.5

    const animate = () => {
        if (!isDraggingRef.current) {
            // Decay velocity back to base speed
            velocityRef.current = velocityRef.current * 0.95 + baseSpeed * 0.05

            // Move position
            positionRef.current -= velocityRef.current
        }

        // Infinite Loop Logic
        if (trackRef.current) {
            const trackWidth = trackRef.current.scrollWidth
            const oneSetWidth = trackWidth / 3

            if (positionRef.current <= -oneSetWidth) {
                positionRef.current += oneSetWidth
            } else if (positionRef.current > 0) {
                positionRef.current -= oneSetWidth
            }

            trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`

            // Calculate center focus for color fade
            const viewportCenter = window.innerWidth / 2
            const items = trackRef.current.querySelectorAll('.carousel-item')

            items.forEach(item => {
                const rect = item.getBoundingClientRect()
                const itemCenter = rect.left + rect.width / 2
                const distance = Math.abs(viewportCenter - itemCenter)

                // Define a range where the item is "focused" (e.g., within 200px of center)
                const focusRange = 200
                let focusFactor = 1 - (distance / focusRange)
                focusFactor = Math.min(Math.max(focusFactor, 0), 1)

                // Apply grayscale based on focus (0 = full color, 1 = grayscale)
                const grayscaleValue = (1 - focusFactor) * 100

                const img = item.querySelector('.team-image')
                if (img) {
                    img.style.filter = `grayscale(${grayscaleValue}%)`
                }
            })
        }

        animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationRef.current)
  }, [])

  const handleStart = (clientX) => {
    isDraggingRef.current = true
    startXRef.current = clientX
    lastXRef.current = clientX
    lastTimeRef.current = Date.now()
    velocityRef.current = 0 
  }

  const handleMove = (clientX) => {
    if (!isDraggingRef.current) return
    
    const deltaX = clientX - lastXRef.current
    positionRef.current += deltaX
    
    const now = Date.now()
    const dt = now - lastTimeRef.current
    if (dt > 0) {
        const v = -deltaX / (dt / 16) 
        velocityRef.current = v
    }
    
    lastXRef.current = clientX
    lastTimeRef.current = now
  }

  const handleEnd = () => {
    isDraggingRef.current = false
  }

  // Mouse Events
  const onMouseDown = (e) => handleStart(e.clientX)
  const onMouseMove = (e) => handleMove(e.clientX)
  const onMouseUp = () => handleEnd()
  const onMouseLeave = () => handleEnd()

  // Touch Events
  const onTouchStart = (e) => handleStart(e.touches[0].clientX)
  const onTouchMove = (e) => handleMove(e.touches[0].clientX)
  const onTouchEnd = () => handleEnd()

  return (
    <div 
        className="carousel-container fade-in-content"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
    >
        <div className="carousel-track" ref={trackRef}>
            {/* Set 1 */}
            <div className="carousel-set">
                {images.map((img, index) => (
                    <div key={`set1-${index}`} className={`carousel-item ${shapes[index % shapes.length]}`}>
                        <img src={img} alt={`Team Member ${index}`} className="team-image" />
                    </div>
                ))}
            </div>
            {/* Set 2 */}
            <div className="carousel-set">
                {images.map((img, index) => (
                    <div key={`set2-${index}`} className={`carousel-item ${shapes[index % shapes.length]}`}>
                        <img src={img} alt={`Team Member ${index}`} className="team-image" />
                    </div>
                ))}
            </div>
             {/* Set 3 */}
             <div className="carousel-set">
                {images.map((img, index) => (
                    <div key={`set3-${index}`} className={`carousel-item ${shapes[index % shapes.length]}`}>
                        <img src={img} alt={`Team Member ${index}`} className="team-image" />
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Carousel