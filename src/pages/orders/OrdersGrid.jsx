import OrderHeader from "./OrderHeader"
import OrderDetailsGrid from "./OrderDetailsGrid"

function OrdersGrid({ orders, loadCartItems }) {
  return (
    <div className="orders-grid">
      {orders.map(order => (
        <div key={order.id} className="order-container">
          <OrderHeader order={order} />
          <OrderDetailsGrid order={order} loadCartItems={loadCartItems}/>
        </div>
      ))}
    </div>
  )
}

export default OrdersGrid
