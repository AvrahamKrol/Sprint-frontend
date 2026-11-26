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

            <button className={currentIndex===0 ? 'off' :''} style={{left:0}} onClick={prevImage}>❮</button>

            
                <div
                    className="carousel-track"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`
                    }}
                >   
                <img className="like" 
                src="https://res.cloudinary.com/z6rg2bwn/image/upload/v1795360044/Heart--Streamline-Sharp-Remix.png" />
                    {imgs.map((img, idx) => (
                        <img key={idx} className="gig-img" src={img} alt=""/>
                    ))}
                </div>
                

            <button className={currentIndex===2 ? 'off' :''} style={{right:0}} onClick={nextImage}>❯</button>

        </section>
    )
}

