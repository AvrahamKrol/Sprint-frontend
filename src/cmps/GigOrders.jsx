import { useState } from 'react'

export function GigOrders({ orders = [] }) {
  const [selectedOrder, setSelectedOrder] = useState(0)

  const currentOrder = orders[selectedOrder]

  if (!orders?.length) return null

  return (
    <section className="gig-orders">
      <div className="order-tabs">
        {orders.map((order, index) => (
          <button
            key={order.type}
            className={selectedOrder === index ? 'active' : ''}
            onClick={() => setSelectedOrder(index)}
          >
            {order.title}
          </button>
        ))}
      </div>

      <div className="order-content">
        <h3>{currentOrder.title}</h3>

        <p>{currentOrder.description}</p>

        <div className="order-info">
          <span>Delivery: {currentOrder.deliveryTime}</span>
          <span>Revisions: {currentOrder.revisions}</span>
        </div>

        <h2>${currentOrder.price}</h2>

        <button className="continue-btn">Continue</button>
      </div>
    </section>
  )
}
