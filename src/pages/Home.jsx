import HeroText from '../sections/home/HeroText.jsx'
import HeroImage from '../sections/home/HeroImage.jsx'
import Trusted from '../sections/home/Trusted.jsx'
import Content from '../sections/home/Content.jsx'
import HowItWorks from '../sections/home/HowItWorks.jsx'
import Testimonial from '../sections/home/Testimonial.jsx'
import AiFeature from '../sections/home/AiFeature.jsx'
import PhotographersAgents from '../sections/home/PhotographersAgents.jsx'
import CtaBand from '../sections/home/CtaBand.jsx'

export default function Home() {
  return (
    <>
      <HeroText />
      <HeroImage />
      <Trusted />
      <Content />
      <HowItWorks />
      <Testimonial />
      <AiFeature />
      <PhotographersAgents />
      <CtaBand />
    </>
  )
}
