
import { userService } from '../services/user'
import { GigPreview } from './GigPreview'

export function GigList({ gigs, onRemoveGig, onUpdateGig, popularGigs ,topRatedGigs }) {

   console.log('F-popular',popularGigs)
  
   function shouldShowActionBtns(gig) {
    const user = userService.getLoggedinUser()

    if (!user) return false
    if (user.isAdmin) return true
    return gig.owner?._id === user._id

  }

  return (
    <section>
      <h1>Most Popoular Gigs</h1>
      
      <ul className="gig-list">
        {popularGigs.map((gig) => (
          <li key={gig._id}>
            <GigPreview gig={gig} />
            {shouldShowActionBtns(gig) && (
              <div className="actions">
                <button onClick={() => onUpdateGig(gig)}>Edit</button>
                <button onClick={() => onRemoveGig(gig._id)}>x</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h1>Top Rated Gigs</h1>

      <ul className="gig-list">
        {topRatedGigs.map((gig) => (
          <li key={gig._id}>
            <GigPreview gig={gig} />
            {shouldShowActionBtns(gig) && (
              <div className="actions">
                <button onClick={() => onUpdateGig(gig)}>Edit</button>
                <button onClick={() => onRemoveGig(gig._id)}>x</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* <ul className="gig-list">
        {gigs.map((gig) => (
          <li key={gig._id}>
            <GigPreview gig={gig} />
            {shouldShowActionBtns(gig) && (
              <div className="actions">
                <button onClick={() => onUpdateGig(gig)}>Edit</button>
                <button onClick={() => onRemoveGig(gig._id)}>x</button>
              </div>
            )}
          </li>
        ))}
      </ul> */}
      
    </section>
  )
}
