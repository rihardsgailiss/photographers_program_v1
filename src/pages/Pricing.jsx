import PricingHero from '../sections/pricing/PricingHero.jsx'
import ComparisonTable from '../sections/pricing/ComparisonTable.jsx'
import Faq from '../sections/pricing/Faq.jsx'

export default function Pricing() {
  return (
    <div className="pricing">
      <PricingHero />
      <ComparisonTable />
      <Faq />
    </div>
  )
}
