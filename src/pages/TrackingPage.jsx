import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { formatDeliveryDate } from "../utils/date"

import Header from "../componenets/Header"

import "./TrackingPage.css"
import dayjs from "dayjs"

export default function TrackingPage({ cartItems }) {
  const [order, setOrder] = useState(null)
  const param = useParams()
  const { orderId, productId } = param

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await axios.get(
          `/api/orders/${orderId}?expand=products`
        )
        const { data, status } = response
        if (status === 200) {
          setOrder(data)
        }
      } catch (error) {
        console.error("Error fetching order:", error)
      }
    }

    fetchOrder()
  }, [orderId])

  if (!order) {
    return null
  }
  const orderedProduct = order.products.find(
    product => product.productId === productId
  )
  if (!orderedProduct) {
    return null
  }
  const totalDeliveryTimeMS =
    orderedProduct.estimatedDeliveryTimeMs - order.orderTimeMs
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs
  const progressPercentage = Math.min(
    (timePassedMs / totalDeliveryTimeMS) * 100,
    100
  )
  const isPreparring = progressPercentage < 33
  const isShipped = progressPercentage >= 33 && progressPercentage < 100
  const isDelivered = progressPercentage === 100
  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <Header cartItems={cartItems} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {`${
              isDelivered ? "Delivered on" : "Arriving on"
            } ${formatDeliveryDate(orderedProduct.estimatedDeliveryTimeMs)}`}
          </div>

          <div className="product-info">{orderedProduct.product.name}</div>

          <div className="product-info">
            Quantity: {orderedProduct.quantity}
          </div>

          <img className="product-image" src={orderedProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${
                isPreparring ? "current-status" : ""
              }`}
            >
              Preparing
            </div>
            <div
              className={`progress-label ${isShipped ? "current-status" : ""}`}
            >
              Shipped
            </div>
            <div
              className={`progress-label ${
                isDelivered ? "current-status" : ""
              }`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}
