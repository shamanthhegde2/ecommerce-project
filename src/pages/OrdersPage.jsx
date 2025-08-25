import { Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect, Fragment } from "react"
import { formatOrderedDate } from "../utils/date"
import { formatMoney } from "../utils/money"

import Header from "../componenets/Header"

import BuyAgainIcon from "../assets/images/icons/buy-again.png"

import "./OrdersPage.css"

export default function OrdersPage({ cartItems }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get("/api/orders?expand=products")
        const { data, status } = response
        if (status === 200) {
          setOrders(data)
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }

    fetchOrders()
  }, [])

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
      <Header cartItems={cartItems} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map(order => (
            <div key={order.id} className="order-container">
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{formatOrderedDate(order.orderTimeMs)}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{formatMoney(order.totalCostCents)}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              <div className="order-details-grid">
                {order.products.map(orderedProduct => (
                  <Fragment key={orderedProduct.productId}>
                    <div className="product-image-container">
                      <img src={orderedProduct.product.image} />
                    </div>

                    <div className="product-details">
                      <div className="product-name">
                        {orderedProduct.product.name}
                      </div>
                      <div className="product-delivery-date">
                        Arriving on:{" "}
                        {formatOrderedDate(
                          orderedProduct.estimatedDeliveryTimeMs
                        )}
                      </div>
                      <div className="product-quantity">
                        Quantity: {orderedProduct.quantity}
                      </div>
                      <button className="buy-again-button button-primary">
                        <img className="buy-again-icon" src={BuyAgainIcon} />
                        <span className="buy-again-message">Add to Cart</span>
                      </button>
                    </div>
                    <div className="product-actions">
                      <Link to="/tracking">
                        <button className="track-package-button button-secondary">
                          Track package
                        </button>
                      </Link>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
