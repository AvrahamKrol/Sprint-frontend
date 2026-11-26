
import { userService } from '../services/user'
import { GigPreview } from './GigPreview'

export function GigList({ gigs, onRemoveGig, onUpdateGig, filterBy }) {

   //console.log('F-popular',popularGigs)
  
   function shouldShowActionBtns(gig) {
    // const user = userService.getLoggedinUser()

    // if (!user) return false
    // if (user.isAdmin) return true
    // return gig.owner?._id === user._id
    return true

  }

  return (
    <section>
    
     <div>
      <h1>{filterBy.tag}</h1> 
      <ul className="gig-list">
        {gigs.map((gig) => (
          <li key={gig._id}>
            <GigPreview gig={gig} shouldShowActionBtns={shouldShowActionBtns} />
          </li>
        ))}
      </ul></div>
      
    </section>
  )
}
