import { Link } from "react-router-dom"
import { Fragment } from "react"
import { formatOrderedDate } from "../../utils/date"
import BuyAgainIcon from "../../assets/images/icons/buy-again.png"

function OrderDetailsGrid({ order }) {
  return (
    <div className="order-details-grid">
      {order.products.map(orderedProduct => (
        <Fragment key={orderedProduct.productId}>
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
            <button className="buy-again-button button-primary">
              <img className="buy-again-icon" src={BuyAgainIcon} />
              <span className="buy-again-message">Add to Cart</span>
            </button>
          </div>
          <div className="product-actions">
            <Link to={`/tracking/${order.id}/${orderedProduct.productId}`}>
              <button className="track-package-button button-secondary">
                Track package
              </button>
            </Link>
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export default OrderDetailsGrid
