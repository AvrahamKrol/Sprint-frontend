import { Link } from 'react-router-dom'

import { Carousel } from './Caruosel'

export function GigPreview({ gig }) {
  return (
    <article className="gig-preview">
      <Carousel gig={gig} />

      <div>
        {gig.owner && (
          <div className="owner-name-div">
            <img
              className="owner-img"
              src="https://res.cloudinary.com/z6rg2bwn/image/upload/v1794993705/be04c8e5-2fee-4bfb-ad1a-8c2a969a1ffc.webp"
              alt=""
            />

            <p className="gig-owner">{gig.owner.fullName} </p>
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
          <p>{gig.owner.rate}</p>
        </div>

        <p>from: {gig.price}$</p>
      </div>
    </article>
  )
}
