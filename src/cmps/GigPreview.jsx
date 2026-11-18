import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {
  return (

    <article className="gig-preview">
      <header>
    {gig.owner && (
        <p>{gig.owner.fullname} </p>
      )}
      </header>
      <Link to={`/gig/${gig._id}`}>{gig.description}</Link>
      <header>
      <p>from: {gig.price}$</p>
      </header>

    </article>
  )
}
