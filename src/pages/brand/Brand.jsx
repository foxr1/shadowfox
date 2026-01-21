import './brand.css'
import Section from '../../components/section/Section.jsx'
import Values from '../../components/brand/values/Values.jsx'
import Colours from '../../components/brand/colours/Colours.jsx'
import Typography from '../../components/brand/typography/Typography'
import Identity from '../../components/brand/identity/Identity.jsx'

const Brand = () => {
  return (
    <Section id="brand" title="Brand">
      <div className="brand-package-container">
          <Identity />
          <Values />
          <Colours />
          <Typography />
      </div>
    </Section>
  )
}

export default Brand