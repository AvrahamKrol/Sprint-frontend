import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {

  return (

    <article className="gig-preview">
      <img className='gig-img' src="https://res.cloudinary.com/z6rg2bwn/image/upload/v1794993684/54cffd5e371a90afc005d388f51f164ab63a4965.webp" alt="" />
      
      <div>
      {gig.owner && (
        <div className='owner-name-div'>
          
        <img className="owner-img" src="https://res.cloudinary.com/z6rg2bwn/image/upload/v1794993705/be04c8e5-2fee-4bfb-ad1a-8c2a969a1ffc.webp" alt="" />

        <p className="gig-owner">{gig.owner.fullname} </p>
        </div>
      )}

      <Link to={`/gig/${gig._id}`}><p href="" className='gig-link'>{gig.title}</p></Link>
      
      <div className='rate-div'>
        <img className='rate-star' src="/icons/star.png" alt="" />
        <p>{gig.rate}</p>
      </div>

      <p>from: {gig.price}$</p>
      </div>

    </article>
  )
}
