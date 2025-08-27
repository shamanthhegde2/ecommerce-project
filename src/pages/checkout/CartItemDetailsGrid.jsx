import axios from "axios"
import { useState } from "react"
import { formatMoney } from "../../utils/money"
import DeliveryOptions from "./DeliveryOptions"

function CartItemDetailsGrid({ cartItem, deliveryOptions, loadCartItems }) {
  const [update, setUpdate] = useState(false)
  const [quantity, setQuantity] = useState(cartItem.quantity)
  async function handleDeleteCartItem() {
    try {
      await axios.delete(`/api/cart-items/${cartItem.product.id}`)
      await loadCartItems()
    } catch (error) {
      console.error("Error deleting cart item:", error)
    }
  }

  async function handleUpdateSaveClick() {
    if (update) {
      try {
        await axios.put(`/api/cart-items/${cartItem.product.id}`, {
          quantity,
        })
        await loadCartItems()
      } catch (error) {
        console.error("Error updating cart item:", error)
      }
    }

    setUpdate(!update)
  }

  function handleInputKeyPress(event) {
    if (event.key === "Enter") {
      handleUpdateSaveClick()
    }
    if (event.key === "Escape") {
      setUpdate(false)
      setQuantity(cartItem.quantity)
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
            {update ? (
              <input
                type="number"
                min="1"
                value={quantity}
                className="quantity-input"
                onChange={e => setQuantity(Number(e.target.value))}
                onKeyDown={handleInputKeyPress}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={handleUpdateSaveClick}
          >
            {update ? "Save" : "Update"}
          </span>
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
