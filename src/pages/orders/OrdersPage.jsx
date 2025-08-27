import axios from "axios"
import { useState, useEffect } from "react"

import Header from "../../componenets/Header"
import OrdersGrid from "./OrdersGrid"

import "./OrdersPage.css"

export default function OrdersPage({ cartItems, loadCartItems }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get("/api/orders?expand=products")
        const { data, status } = response
        if (status === 200) {
          setOrders(data)
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }

    fetchOrders()
  }, [])

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
      <Header cartItems={cartItems} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} loadCartItems={loadCartItems} />
      </div>
    </>
  )
}
