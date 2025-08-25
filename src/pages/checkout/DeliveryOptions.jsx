import { formatMoney } from "../../utils/money"
import { formatDeliveryDate } from "../../utils/date"

function DeliveryOptions({ deliveryOptions, cartItem }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
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
              {formatDeliveryDate(option.estimatedDeliveryTimeMs)}
            </div>
            <div className="delivery-option-price">
              {option.priceCents === 0
                ? "FREE Shipping"
                : `${formatMoney(option.priceCents)} - Shipping`}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DeliveryOptions
