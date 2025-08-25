import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import axios from "axios"

import HomePage from "./pages/home/HomePage"
import CheckoutPage from "./pages/checkout/CheckoutPage"
import OrdersPage from "./pages/orders/OrdersPage"
import TrackingPage from "./pages/TrackingPage"
import NotFoundPage from "./pages/NotFoundPage"

import "./App.css"

function App() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get("/api/cart-items?expand=product")
        const { data, status } = response
        if (status === 200) {
          setCartItems(data)
        }
      } catch (error) {
        console.error("Error fetching cart items:", error)
      }
    }

    fetchCartItems()
  }, [])

  return (
    <Routes>
      <Route index element={<HomePage cartItems={cartItems} />} />
      <Route path="checkout" element={<CheckoutPage cartItems={cartItems} />} />
      <Route path="orders" element={<OrdersPage cartItems={cartItems} />} />
      <Route path="tracking" element={<TrackingPage cartItems={cartItems} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
