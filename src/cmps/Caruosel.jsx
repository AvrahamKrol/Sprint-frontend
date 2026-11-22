import { useState } from "react"

export function Carousel({gig}){
    
    const [currentIndex, setCurrentIndex] = useState(0)

    const imgs = [
        gig.imgUrls[0] || "https://res.cloudinary.com/z6rg2bwn/image/upload/v1795333050/images.jpg",
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
                        <img style={{maxHeight:'250px'}} key={idx} className="gig-img" src={img} alt="" />
                    ))}
                </div>
                

            <button style={{position:'absolute', right:0}} onClick={nextImage}>❯</button>

        </section>
    )
}

