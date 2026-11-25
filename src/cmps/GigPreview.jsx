import { Link } from 'react-router-dom'

import { Carousel } from './Caruosel'

export function GigPreview({ gig }) {
  return (
    <article className="gig-preview">
      <Carousel gig={gig} />

      
        <div>
        {gig.owner && (
          <div className="owner-name-div">
            
            <div className='owner-name-img'>
            <img
              className="owner-img"
              src="https://res.cloudinary.com/z6rg2bwn/image/upload/v1794993705/be04c8e5-2fee-4bfb-ad1a-8c2a969a1ffc.webp"
              alt=""
            />
            <p className="gig-owner">{gig.owner.fullName} </p>
            </div>
            
            <div className='level-div'>

            <p>{gig.owner.level}</p>

            <div className='dimond-div'>
            <img className='dimond-img' src="/icons/diamond-icon.png" width={12} height={12} />
            <img className='dimond-img' src="/icons/diamond-icon.png" width={12} height={12} />
            <img className='dimond-img' src="/icons/diamond-icon.png" width={12} height={12} />
            </div>

            </div>

            </div>
        )}

        <Link to={`/gig/${gig._id}`}>
          <p href="" className="gig-link">
            {gig.title + ' '} 
            {gig.description}
          </p>
        </Link>

        <div className="rate-div">
          <img className="rate-star" src="/icons/star.png" alt="" />
          <p style={{paddingTop:'2px',fontWeight:700,color:'#222325'}}>{gig.owner.rate}</p>
        </div>

        <p className='price'>From <div className='flex'><img src="/icons/shekel-icon.png" alt="" />{gig.price}</div></p>
      </div>
    </article>
  )
}
