import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadGig, addGigMsg } from '../store/actions/gig.actions'
import { Rating } from '../cmps/Rating.jsx'
import { ImageGallery } from '../cmps/ImageGallery.jsx'
import { GigOrders } from '../cmps/GigOrders.jsx'

const orders = [
  {
    type: 'basic',
    title: 'Basic',
    price: 50,
    deliveryTime: '2 days',
    revisions: 1,
    description: 'Basic website design',
  },
  {
    type: 'standard',
    title: 'Standard',
    price: 100,
    deliveryTime: '3 days',
    revisions: 3,
    description: 'Standard website design',
  },
  {
    type: 'premium',
    title: 'Premium',
    price: 200,
    deliveryTime: '5 days',
    revisions: 5,
    description: 'Complete website design',
  },
]

export function GigDetails() {
  const { gigId } = useParams()
  const gig = useSelector((storeState) => storeState.gigModule.gig)

  useEffect(() => {
    loadGig(gigId)
  }, [gigId])

  // async function onAddGigMsg(gigId) {
  //   try {
  //     await addGigMsg(gigId, 'bla bla ' + parseInt(Math.random() * 10))
  //     showSuccessMsg(`Gig msg added`)
  //   } catch (err) {
  //     showErrorMsg('Cannot add gig msg')
  //   }
  // }

  return (
    <section className="gig-details">
      <article className="details-main">
        <h1 className="gig-title">{gig && gig.title}</h1>
        <div className="seller-overview">
          <img
            className="details-avatar"
            src={gig?.owner?.imgUrl}
            alt="avatar image"
          />
          <div className="owner-info">
            <p>{gig?.owner?.fullname}</p>
            <div className="owner-rating">
              <Rating rating={gig?.owner?.rate} />
              <span className="rating-count">{gig?.owner?.rate}</span>
              <span className="reviews-count">
                ({gig?.reviews?.length} reviews)
              </span>
            </div>
          </div>
        </div>
        <div className="loyalty">
          <p>Among my clients</p>
        </div>
        <div className="gig-gallery">
          <ImageGallery images={gig?.imgUrls} />
        </div>
      </article>
      <article className="details-sidebar">
        <GigOrders orders={orders} />
      </article>
    </section>
  )
}
