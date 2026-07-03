import './ProductMenu.css'

const FEATURED = [
  { title: 'Camera', desc: '360 camera for real estate capture' },
  { title: 'Content Studio', desc: 'Edit, stage, host, and share listing media' },
]

const LISTING_MEDIA = [
  'HDR real estate photos',
  'Floor plans',
  '360 virtual tours',
  'Real estate videos',
  'Property websites',
  'Real estate marketing assets',
]

export default function ProductMenu({ onNavigate }) {
  return (
    <div className="productMenu" role="menu">
      <div className="productMenu__featured">
        {FEATURED.map((item) => (
          <button key={item.title} className="productMenu__feature" type="button" onClick={onNavigate}>
            <span className="productMenu__featureTitle">{item.title}</span>
            <span className="productMenu__featureDesc">{item.desc}</span>
          </button>
        ))}
      </div>

      <div className="productMenu__divider" />

      <span className="productMenu__label">Listing media</span>

      <div className="productMenu__list">
        {LISTING_MEDIA.map((label) => (
          <button key={label} className="productMenu__item" type="button" onClick={onNavigate}>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
