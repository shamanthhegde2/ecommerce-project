import OrderDetailContainer from "./OrderDetailContainer"

function OrderDetailsGrid({ order, loadCartItems }) {
  return (
    <div className="order-details-grid">
      {order.products.map(orderedProduct => (
        <OrderDetailContainer
          key={orderedProduct.productId}
          orderedProduct={orderedProduct}
          order={order}
          loadCartItems={loadCartItems}
        />
      ))}
    </div>
  )
}

export default OrderDetailsGrid
