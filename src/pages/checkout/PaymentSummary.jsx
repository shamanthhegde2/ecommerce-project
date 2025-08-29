import axios from "axios"
import { useNavigate } from "react-router-dom"
import { formatMoney } from "../../utils/money"

function PaymentSummary({ paymentSummary, loadCartItems }) {
  const navigate = useNavigate()
  async function createOrder() {
    try {
      await axios.post("/api/orders")
      await loadCartItems()
      navigate("/orders")
    } catch (error) {
      console.error("Error creating order:", error)
    }
  }
  return (
    <div className="payment-summary">
      {paymentSummary && (
        <>
          <div className="payment-summary-title">Payment Summary</div>

          <div
            className="payment-summary-row"
            data-testid="payment-summary-product-cost"
          >
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div
            className="payment-summary-row"
            data-testid="payment-summary-shipping-cost"
          >
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div
            className="payment-summary-row subtotal-row"
            data-testid="payment-summary-total-before-tax"
          >
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div
            className="payment-summary-row"
            data-testid="payment-summary-tax"
          >
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div
            className="payment-summary-row total-row"
            data-testid="payment-summary-total"
          >
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button
            className="place-order-button button-primary"
            onClick={createOrder}
            data-testid="payment-summary-place-order-button"
          >
            Place your order
          </button>
        </>
      )}
    </div>
  )
}

export default PaymentSummary
