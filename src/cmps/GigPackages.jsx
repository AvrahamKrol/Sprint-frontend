import { useState } from 'react'

import time from '../../public/icons/time-icon.svg'
import revision from '../../public/icons/revision-icon.svg'

export function GigPackages({ packages = [] }) {
  const [selectedPackage, setSelectedPackage] = useState(0)

  const currentPackage = packages[selectedPackage]

  if (!packages?.length) return null

  return (
    <section className="gig-packages">
      <div className="package-tabs">
        {packages.map((pack, idx) => (
          <button
            key={pack.type}
            className={selectedPackage === idx ? 'active' : ''}
            onClick={() => setSelectedPackage(idx)}
          >
            {pack.title}
          </button>
        ))}
      </div>

      <div className="package-content">
        <div className="package-price-container">
          <h3>₪{currentPackage.price}</h3>
          <p>Includes taxes and service fees</p>
        </div>

        <p className="package-desc">
          <span>{currentPackage.title + ' '}</span>
          {currentPackage.description}
        </p>

        <ul className="package-info">
          <li>
            <img src={time} alt="" />
            <span>{currentPackage.deliveryTime}-day delivery</span>
          </li>
          <li>
            <img src={revision} alt="" />
            <span>{currentPackage.revisions} revisions</span>
          </li>
        </ul>

        <button className="continue-btn">Continue</button>
      </div>
    </section>
  )
}
