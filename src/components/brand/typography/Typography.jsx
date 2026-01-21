import './typography.css'
import {useEffect, useRef} from 'react'

const Typography = () => {
  const typographyRef = useRef(null)

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

    if (typographyRef.current) {
      observer.observe(typographyRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="brand-section typography-section" ref={typographyRef}>
      <div className="typography-grid">
        <div className="font-showcase title-font">
          <span className="font-name title-font-name fade-in-type fade-in-up">P22 Moris Troy</span>
          <span className="font-sample-aa fade-in-type fade-in-up">Aa</span>
        </div>
        <div className="font-showcase body-font">
          <span className="font-name body-font-name fade-in-type fade-in-up">Neco Variable</span>
          <span className="font-sample-aa fade-in-type fade-in-up">Aa</span>
          {/*<span className="font-sample-text typing-effect">This is Shadow Fox</span>*/}
          {/*<p className="font-sample-lorem fade-in-type fade-in-up">Lorem ipsum dolor sit amet, consectetur adipiscing*/}
          {/*  elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>*/}
        </div>
        <div className="font-showcase other-font">
          <span className="font-name other-font-name fade-in-type fade-in-up">Calder Dark</span>
          <span className="font-sample-aa fade-in-type fade-in-up">Aa</span>
          {/*<span className="font-sample-text typing-effect">Calder Dark</span>*/}
          {/*<p className="font-sample-lorem fade-in-type fade-in-up">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>*/}
        </div>
      </div>
      <div className="brand-divider grow-line"></div>
      <span className="brand-label fade-in-label">Typography</span>
    </div>
  )
}

export default Typography