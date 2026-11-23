import { Link } from 'react-router-dom'

export function ReviewPreview({ review }) {
  const { byUser, aboutUser } = review

  return (
    <article className="review-preview">
      <p>
        About: <Link to={`/user/${aboutUser._id}`}>{aboutUser.fullName}</Link>
      </p>
      <p className="review-by">
        By: <Link to={`/user/${byUser._id}`}>{byUser.fullName}</Link>
      </p>
      <p className="review-txt">{review.txt}</p>
    </article>
  )
}
