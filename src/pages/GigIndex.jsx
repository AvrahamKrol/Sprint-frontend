import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  loadGigs,
  addGig,
  updateGig,
  removeGig,
  // addGigMsg,
} from '../store/actions/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig/'
import { userService } from '../services/user'

import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'
import { Categories } from '../cmps/Categories'

export function GigIndex() {
  const [filterBy, setFilterBy] = useState(gigService.getDefaultFilter())
  const gigs = useSelector((storeState) => storeState.gigModule.gigs)
  const [ popularGigs,setPopularGigs ] =useState(null)
  const [ topRatedGigs,setTopRatedGigs ] =useState(null)

  console.log('G',gigs)


  useEffect(() => {
    loadGigs(filterBy)
    
  }, [filterBy])

  useEffect(()=>{
    loadMostPopular()
    loadTopRated()
  },[gigs])

  async function onRemoveGig(gigId) {
    try {
      await removeGig(gigId)
      showSuccessMsg('Gig removed')
    } catch (err) {
      showErrorMsg('Cannot remove gig')
    }
  }

  async function onAddGig() {
    const gig = gigService.getEmptyGig()
    gig.vendor = prompt('Vendor?', 'Some Vendor')
    try {
      const savedGig = await addGig(gig)
      showSuccessMsg(`Gig added (id: ${savedGig._id})`)
    } catch (err) {
      showErrorMsg('Cannot add gig')
    }
  }

  async function onUpdateGig(gig) {
    const speed = +prompt('New speed?', gig.speed) || 0
    if (speed === 0 || speed === gig.speed) return

    const gigToSave = { ...gig, speed }
    try {
      const savedGig = await updateGig(gigToSave)
      showSuccessMsg(`Gig updated, new speed: ${savedGig.speed}`)
    } catch (err) {
      showErrorMsg('Cannot update gig')
    }
  }

  function loadMostPopular(){
    if(gigs.length===0) return
     const popularGigs = gigs.filter(gig=>gig.likedByUsers.length===1)
     setPopularGigs(popularGigs)
  }

  function loadTopRated(){
    if(gigs.length===0) return
     const topRatedGigs = gigs.filter(gig=>gig.owner.level==='top rated')
     //console.log('topRatedGigs',topRatedGigs)
     setTopRatedGigs(topRatedGigs)
  }

 if(gigs.length===0 || !popularGigs || !topRatedGigs) return <p>Loading...</p>
  return (
    <section className="gig-index">

      <header>
        {userService.getLoggedinUser() && (
          <button onClick={onAddGig}>Add a Gig</button>
        )}
      </header>
      <Categories setFilterBy={setFilterBy} />
      <GigFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      <GigList
        gigs={gigs}
        onRemoveGig={onRemoveGig}
        onUpdateGig={onUpdateGig}
        popularGigs={popularGigs}
        topRatedGigs={topRatedGigs}
      />
    </section>
  )
}
