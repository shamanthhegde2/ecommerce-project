import { useState, useEffect } from "react"
import axios from "axios"
import { formatMoney } from "../../utils/money"
import { formatDeliveryDate } from "../../utils/date"

import CheckoutHeader from "./CheckoutHeader"

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
          <div className="order-summary">
            {deliveryOptions &&
              cartItems.map(cartItem => {
                const selectedDeliveryOption = deliveryOptions.find(
                  option => option.id === cartItem.deliveryOptionId
                )
                return (
                  <div
                    key={cartItem.productId}
                    className="cart-cartItem-container"
                  >
                    <div className="delivery-date">
                      Delivery date:{" "}
                      {formatDeliveryDate(
                        selectedDeliveryOption.estimatedDeliveryTimeMs
                      )}
                    </div>

                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={cartItem.product.image}
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartItem.product.name}
                        </div>
                        <div className="product-price">
                          {formatMoney(cartItem.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity:{" "}
                            <span className="quantity-label">
                              {cartItem.quantity}
                            </span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOptions.map(option => (
                          <div className="delivery-option" key={option.id}>
                            <input
                              type="radio"
                              className="delivery-option-input"
                              checked={option.id === cartItem.deliveryOptionId}
                              name={`delivery-option-${cartItem.productId}`}
                            />
                            <div>
                              <div className="delivery-option-date">
                                {formatDeliveryDate(
                                  option.estimatedDeliveryTimeMs
                                )}
                              </div>
                              <div className="delivery-option-price">
                                {option.priceCents === 0
                                  ? "FREE Shipping"
                                  : `${formatMoney(
                                      option.priceCents
                                    )} - Shipping`}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
          <div className="payment-summary">
            {paymentSummary && (
              <>
                <div className="payment-summary-title">Payment Summary</div>

                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
