import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { formatOrderedDate } from "../../utils/date"
import axios from "axios"
import BuyAgainIcon from "../../assets/images/icons/buy-again.png"
import CheckMarkIcon from "../../assets/images/icons/checkmark-white.png"

function OrderDetailContainer({ orderedProduct, order, loadCartItems }) {
  const timeOutRef = useRef(null)
  const iconRef = useRef(null)
  const addedSpanRef = useRef(null)
  const handleAddToCart = async product => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current)
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity: 1,
    })
    await loadCartItems()
    if (iconRef.current) {
      iconRef.current.src = CheckMarkIcon
    }
    if (addedSpanRef.current) {
      addedSpanRef.current.innerText = "Added"
    }
    const timeOutFunction = () => {
      if (iconRef.current) {
        iconRef.current.src = BuyAgainIcon
      }
      if (addedSpanRef.current) {
        addedSpanRef.current.innerText = "Add to Cart"
      }
    }
    timeOutRef.current = setTimeout(timeOutFunction, 2000)
  }

  useEffect(() => {
    return () => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current)
    }
  }, [])

  return (
    <>
      <div className="product-image-container">
        <img src={orderedProduct.product.image} />
      </div>

      <div className="product-details">
        <div className="product-name">{orderedProduct.product.name}</div>
        <div className="product-delivery-date">
          Arriving on:{" "}
          {formatOrderedDate(orderedProduct.estimatedDeliveryTimeMs)}
        </div>
        <div className="product-quantity">
          Quantity: {orderedProduct.quantity}
        </div>
        <button
          className="buy-again-button button-primary"
          onClick={() => handleAddToCart(orderedProduct.product)}
        >
          <img className="buy-again-icon" src={BuyAgainIcon} ref={iconRef} />
          <span className="buy-again-message" ref={addedSpanRef}>
            Add to Cart
          </span>
        </button>
      </div>
      <div className="product-actions">
        <Link to={`/tracking/${order.id}/${orderedProduct.productId}`}>
          <button className="track-package-button button-secondary">
            Track package
          </button>
        </Link>
      </div>
    </>
  )
}

export default OrderDetailContainer
