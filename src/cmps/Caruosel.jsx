import { useState } from "react"

export function Carousel({gig}){
    
    const [currentIndex, setCurrentIndex] = useState(0)

    const imgs = [
        [gig.imgUrls[0]],
        'https://res.cloudinary.com/z6rg2bwn/image/upload/v1795244092/d387c66efa952c73c90213927c3383aeaf0f73a9.webp',
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

    return(
        <section className="carousel">

            <button style={{position:'absolute'}} onClick={prevImage}>❮</button>

            
                <div
                    className="carousel-track"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`
                    }}
                >
                    {imgs.map((img, idx) => (
                        <img key={idx} src={img} alt="" className="gig-img" />
                    ))}
                </div>

            <button style={{position:'absolute'}} onClick={nextImage}>❯</button>

        </section>
    )
}

