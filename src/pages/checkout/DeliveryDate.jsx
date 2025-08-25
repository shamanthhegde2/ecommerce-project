import { formatDeliveryDate } from "../../utils/date"

function DeliveryDate({ estimatedDeliveryTimeMs }) {
  return (
    <div className="delivery-date">
      Delivery date: {formatDeliveryDate(estimatedDeliveryTimeMs)}
    </div>
  )
}

export default DeliveryDate
