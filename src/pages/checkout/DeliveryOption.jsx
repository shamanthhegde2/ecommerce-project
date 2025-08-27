import axios from "axios"
import { formatMoney } from "../../utils/money"
import { formatDeliveryDate } from "../../utils/date"

function DeliveryOption({
  option,
  cartItem,
  loadCartItems,
}) {
  async function updateDeliveryOption() {
    try {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        ...cartItem,
        deliveryOptionId: option.id,
      })
      await loadCartItems()
    } catch (error) {
      console.error("Error updating delivery option:", error)
    }
  }
  return (
    <div
      className="delivery-option"
      key={option.id}
      onClick={updateDeliveryOption}
    >
      <input
        type="radio"
        className="delivery-option-input"
        checked={option.id === cartItem.deliveryOptionId}
        name={`delivery-option-${cartItem.productId}`}
        onChange={() => {}}
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
  )
}

export default DeliveryOption
