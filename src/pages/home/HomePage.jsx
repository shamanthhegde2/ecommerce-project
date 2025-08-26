import axios from "axios"
import { useState, useEffect } from "react"

import Header from "../../componenets/Header"
import ProductGrid from "./ProductGrid"

import "./HomePage.css"

function HomePage({ cartItems, loadCartItems }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("/api/products")
        const { data, status } = response
        if (status === 200) {
          setProducts(data)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])
  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/x-icon" href="home-favicon.png" />
      <Header cartItems={cartItems} />

      <div className="home-page">
        <ProductGrid products={products} loadCartItems={loadCartItems} />
      </div>
    </>
  )
}

export default HomePage
