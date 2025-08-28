import { useState, useCallback, useRef, useEffect } from "react"
import axios from "axios"
import CheckMarkIcon from "../../assets/images/icons/checkmark.png"
import { formatMoney } from "../../utils/money"

function ProductContainer({ product, loadCartItems }) {
  const timeOutRef = useRef(null)
  const addedToCartRef = useRef(null)
  const [quantity, setQuantity] = useState(1)
  function handleSetQuantity(event) {
    setQuantity(Number(event.target.value))
  }
  const handleAddToCart = useCallback(
    async productId => {
      await axios.post("/api/cart-items", {
        productId,
        quantity,
      })
      await loadCartItems()
      if (addedToCartRef.current) {
        addedToCartRef.current.classList.add("visible")
      }
      timeOutRef.current = setTimeout(() => {
        if (addedToCartRef.current) {
          addedToCartRef.current.classList.remove("visible")
        }
      }, 2000)
    },
    [loadCartItems, quantity]
  )

  useEffect(() => {
    return () => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current)
    }
  }, [])

  return (
    <div
      className="product-container"
      key={product.id}
      data-testid="product-container"
    >
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          data-testid="product-image"
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
          data-testid="product-rating"
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={handleSetQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" ref={addedToCartRef}>
        <img src={CheckMarkIcon} />
        Added
      </div>
      <button
        className="add-to-cart-button button-primary"
        onClick={() => handleAddToCart(product.id)}
        data-testid="add-to-cart-button"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductContainer
