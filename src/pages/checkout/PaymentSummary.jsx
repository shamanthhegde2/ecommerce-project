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

          <button
            className="place-order-button button-primary"
            onClick={createOrder}
          >
            Place your order
          </button>
        </>
      )}
    </div>
  )
}

export default PaymentSummary
