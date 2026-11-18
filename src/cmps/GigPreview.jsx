import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {

  return (

    <article className="gig-preview">
      <img className='gig-img' src="https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/500163883/original/45437098ad9bba425611a48f21dfa08523d6dea5.png" alt="" />
      
      <div>
      {gig.owner && (
        <div className='owner-name-div'>
          
        <img className="owner-img" src="https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/d746c8ce057b5a3f3302702c86c39edf-1780203553042/bb4e6461-43aa-4da8-865b-0e90c69129ca.png" alt="" />

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
