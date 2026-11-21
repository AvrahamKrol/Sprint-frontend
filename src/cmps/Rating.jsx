import { makeId } from '../services/util.service'

const Star = ({ fill, id }) => (
  <svg viewBox="0 0 16 16" width="20" height="20">
    <defs>
      <linearGradient id={id}>
        <stop offset={`${fill * 100}%`} className="star-filled" />
        <stop offset={`${fill * 100}%`} className="star-empty" />
      </linearGradient>
    </defs>

    <path
      d="M6.693 1.589c.544-1.068 2.07-1.068 2.615 0l1.561 3.064 3.394.54c1.183.189 1.654 1.638.808 2.486l-2.43 2.436.536 3.4c.186 1.184-1.048 2.08-2.115 1.536L8 13.49l-3.061 1.56c-1.068.543-2.302-.352-2.115-1.536l.535-3.4L.93 7.678c-.845-.847-.374-2.296.809-2.485l3.394-.54z"
      fill={`url(#${id})`}
      stroke="currentColor"
      strokeWidth={1.5}
    />
  </svg>
)

export function Rating({ rating = 0 }) {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const uniqId = makeId()
        const fill = Math.min(1, Math.max(0, rating - star + 1))

        return <Star key={star} fill={fill} id={`${uniqId}-star-${star}`} />
      })}
    </div>
  )
}
