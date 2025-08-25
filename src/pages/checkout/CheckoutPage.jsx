import { useState, useEffect } from "react"
import axios from "axios"

import CheckoutHeader from "./CheckoutHeader"
import OrderSummary from "./OrderSummary"
import PaymentSummary from "./PaymentSummary"

import "./CheckoutPage.css"

export default function CheckoutPage({ cartItems }) {
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [paymentSummary, setPaymentSummary] = useState(null)

  useEffect(() => {
    async function fetchDeliveryOptions() {
      try {
        const response = await axios.get(
          "/api/delivery-options?expand=estimatedDeliveryTime"
        )
        const { data, status } = response
        if (status === 200) {
          setDeliveryOptions(data)
        }
      } catch (error) {
        console.error("Error fetching delivery options:", error)
      }
    }

    async function fetchPaymentSummary() {
      try {
        const response = await axios.get("/api/payment-summary")
        const { data, status } = response
        if (status === 200) {
          setPaymentSummary(data)
        }
      } catch (error) {
        console.error("Error fetching payment summary:", error)
      }
    }

    fetchDeliveryOptions()
    fetchPaymentSummary()
  }, [])

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cartItems={cartItems}
            deliveryOptions={deliveryOptions}
          />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  )
}
