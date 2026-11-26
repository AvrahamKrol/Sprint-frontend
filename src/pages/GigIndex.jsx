import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'


import {
  loadGigs,
  addGig,
  setFilterBy,
  updateGig,
  removeGig,
  // addGigMsg,
} from '../store/actions/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

import { GigList } from '../cmps/GigList'
//import { GigFilter } from '../cmps/GigFilter'
import { Categories } from '../cmps/Categories'
import { UserPreviewGigs } from '../cmps/UserPreviewGigs'


export function GigIndex() {
  const gigs = useSelector((storeState) => storeState.gigModule.gigs)
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
  const popularGigs = gigs.filter((gig) => gig.likedByUsers?.length > 0)
  const topRatedGigs = gigs.filter((gig) => gig.owner?.level === 'top rated')

  const [params, setParams] = useSearchParams()
  
  const loggedInUser = false

  useEffect(() => {
    const { txt, tag, minPrice } = pullParams()
    if (txt || tag || minPrice) {
      setFilterBy({ txt, tag, minPrice })
    }
  }, [])

  useEffect(() => {
    
    const updateParams = cleanParams(filterBy)
    setParams(updateParams)
    loadGigs(filterBy)

  }, [filterBy])

  // useEffect(() => {
  //   loadMostPopular()
  //   loadTopRated()
  // }, [gigs])

  function pullParams() {
    const txt = params.get('txt') || ''
    const tag = params.get('tag') || ''
    const minPrice = +params.get('minPrice') || 0

    return { txt, tag, minPrice }
  }

  function cleanParams(filterBy) {
    const newParams = {}
    if (filterBy.txt) newParams.txt = filterBy.txt
    if (filterBy.tag) newParams.tag = filterBy.tag
    if (filterBy.minPrice) newParams.minPrice = filterBy.minPrice

    return newParams
  }

  async function onRemoveGig(gigId) {
    try {
      await removeGig(gigId)
      showSuccessMsg('Gig removed')
    } catch (err) {
      showErrorMsg('Cannot remove gig')
    }
  }

  async function onAddGig() {
    const gig = { price: 0, owner: {} }
    try {
      const savedGig = await addGig(gig)
      showSuccessMsg(`Gig added (id: ${savedGig._id})`)
    } catch (err) {
      showErrorMsg('Cannot add gig')
    }
  }

  async function onUpdateGig(gig) {
    try {
      const savedGig = await updateGig(gig)
      showSuccessMsg(`Gig updated`)
    } catch (err) {
      showErrorMsg('Cannot update gig')
    }
  }

  if (!gigs || !popularGigs || !topRatedGigs) return <p>Loading...</p>
  return (
    <section className="gig-index">

      <Categories setFilterBy={setFilterBy} />
      <button className='add-button' onClick={onAddGig}>
        Add a Gig
      </button>
      {/* <GigFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}

      {loggedInUser && <UserPreviewGigs
        gigs={gigs}
        filterBy={filterBy}
        onRemoveGig={onRemoveGig}
        onUpdateGig={onUpdateGig}
        popularGigs={popularGigs}
        topRatedGigs={topRatedGigs}
      />}
      
      {loggedInUser || <GigList
        gigs={gigs}
        filterBy={filterBy}
        onRemoveGig={onRemoveGig}
        onUpdateGig={onUpdateGig}
      />}
    </section>
  )
}
