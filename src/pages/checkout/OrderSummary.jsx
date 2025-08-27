import DeliveryDate from "./DeliveryDate"
import CartItemDetailsGrid from "./CartItemDetailsGrid"

function OrderSummary({ cartItems, deliveryOptions, loadCartItems}) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cartItems.map(cartItem => {
          const selectedDeliveryOption = deliveryOptions.find(
            option => option.id === cartItem.deliveryOptionId
          )
          return (
            <div key={cartItem.productId} className="cart-cartItem-container">
              <DeliveryDate
                estimatedDeliveryTimeMs={
                  selectedDeliveryOption.estimatedDeliveryTimeMs
                }
              />

              <CartItemDetailsGrid
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
                loadCartItems={loadCartItems}
               
              />
            </div>
          )
        })}
    </div>
  )
}

export default OrderSummary
