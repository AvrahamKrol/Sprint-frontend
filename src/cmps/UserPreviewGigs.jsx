import { GigPreview } from "./GigPreview"

export function UserPreviewGigs({ gigs, onRemoveGig, onUpdateGig, popularGigs ,topRatedGigs, filterBy }){
    
    function shouldShowActionBtns(gig) {
    // const user = userService.getLoggedinUser()

    // if (!user) return false
    // if (user.isAdmin) return true
    // return gig.owner?._id === user._id
    return true

  }
    
    return   <section>

      <div>
      <select className='budget'>
        <option>Budget</option>
        <option>Value</option>
        <option>Mid-range</option>
        <option>Hige-end</option>
        <option>Custom</option>
      </select>
      </div>

        <div>
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
      </div>

      <div>
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
      </div>

      </section>
}