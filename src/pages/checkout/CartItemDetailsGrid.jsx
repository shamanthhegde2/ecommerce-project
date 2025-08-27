import axios from "axios"
import { formatMoney } from "../../utils/money"
import DeliveryOptions from "./DeliveryOptions"

function CartItemDetailsGrid({ cartItem, deliveryOptions, loadCartItems }) {
  async function handleDeleteCartItem() {
    try {
      await axios.delete(`/api/cart-items/${cartItem.product.id}`)
      await loadCartItems()
    } catch (error) {
      console.error("Error deleting cart item:", error)
    }
  }
  return (
    <div className="cart-item-details-grid">
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span className="update-quantity-link link-primary">Update</span>
          <span
            className="delete-quantity-link link-primary"
            onClick={handleDeleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>

      <DeliveryOptions
        deliveryOptions={deliveryOptions}
        cartItem={cartItem}
        loadCartItems={loadCartItems}
      />
    </div>
  )
}

export default CartItemDetailsGrid
