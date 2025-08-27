import DeliveryOption from "./DeliveryOption"

function DeliveryOptions({ deliveryOptions, cartItem, loadCartItems }) {
 

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map(option => (
        <DeliveryOption
          key={option.id}
          option={option}
          cartItem={cartItem}
          loadCartItems={loadCartItems}
  
        />
      ))}
    </div>
  )
}

export default DeliveryOptions
