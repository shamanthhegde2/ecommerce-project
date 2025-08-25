import { formatOrderedDate } from "../../utils/date"
import { formatMoney } from "../../utils/money"

import OrderDetailsGrid from "./OrderDetailsGrid"

function OrdersGrid({ orders }) {
  return (
    <div className="orders-grid">
      {orders.map(order => (
        <div key={order.id} className="order-container">
          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Order Placed:</div>
                <div>{formatOrderedDate(order.orderTimeMs)}</div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>{formatMoney(order.totalCostCents)}</div>
              </div>
            </div>

            <div className="order-header-right-section">
              <div className="order-header-label">Order ID:</div>
              <div>{order.id}</div>
            </div>
          </div>

          <OrderDetailsGrid order={order} />
        </div>
      ))}
    </div>
  )
}

export default OrdersGrid
