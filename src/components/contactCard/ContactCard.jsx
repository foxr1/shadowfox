import './contactCard.css'

const ContactCard = ({ isOpen, onClose, isClosing }) => {
  if (!isOpen) return null

  const handleEmailClick = () => {
    window.location.href = "mailto:contact@shadowfox.uk"
    onClose()
  }

  return (
    <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={onClose}>
      <div className={`modal-content ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">GREETINGS.</h3>
        <p>Would you like to get in touch with contact@shadowfox.uk?</p>
        <div className="modal-buttons">
          <button className="modal-button primary" onClick={handleEmailClick}>Absolutely!</button>
          <button className="modal-button secondary" onClick={onClose}>Maybe later</button>
        </div>
      </div>
    </div>
  )
}

export default ContactCard