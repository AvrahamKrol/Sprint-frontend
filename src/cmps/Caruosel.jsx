import { useState } from "react"

export function Carousel({gig}){
    
    const [currentIndex, setCurrentIndex] = useState(0)

    const imgs = [
        gig.imgUrls[0],
        gig.imgUrls[1],
        gig.imgUrls[2], 
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
        <section style={{position:"relative"}} className="carousel">

            <button style={{position:'absolute', left:0}} onClick={prevImage}>❮</button>

            
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

            <button style={{position:'absolute', right:0}} onClick={nextImage}>❯</button>

        </section>
    )
}

