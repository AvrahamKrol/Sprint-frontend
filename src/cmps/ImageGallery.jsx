import { useState } from 'react'

export function ImageGallery({ images = [] }) {
  const [activeImage, setActiveImage] = useState(0)
  return (
    <>
      <div className="main-image">
        <img src={images[activeImage]} alt="Gig preview" />
      </div>

      <div className="thumbnails">
        {images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Preview ${index + 1}`}
            className={activeImage === index ? 'active' : ''}
            onClick={() => setActiveImage(index)}
          />
        ))}
      </div>
    </>
  )
}
