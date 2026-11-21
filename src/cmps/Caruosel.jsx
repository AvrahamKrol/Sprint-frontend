import { useState } from "react"

export function Carousel({gig}){
    
    const [currentIndex, setCurrentIndex] = useState(0)

    const imgs = [
        [gig.imgUrls[0]],
        'https://res.cloudinary.com/z6rg2bwn/image/upload/v1795239831/Dashboard.webp',
        'https://res.cloudinary.com/z6rg2bwn/image/upload/v1795239833/Dashboard100.webp',
    ]

    function nextImage() {
        setCurrentIndex(prev =>
            (prev + 1) % imgs.length
        )
    }

    function prevImage() {
        setCurrentIndex(prev =>
            (prev - 1 + imgs.length) % imgs.length
        )
    }

    return (
        <section className="carousel">
            <img
                src={imgs[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
            />
            <button onClick={prevImage}>{'<'}</button>
            <button onClick={nextImage}>{'>'}</button>
            
        </section>
    )
}

