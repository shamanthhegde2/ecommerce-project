import axios from "axios"
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import Header from "../../componenets/Header"
import ProductGrid from "./ProductGrid"

import "./HomePage.css"

function HomePage({ cartItems, loadCartItems }) {
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search") || ""
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`/api/products?search=${search}`)
        const { data, status } = response
        if (status === 200) {
          setProducts(data)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [search])
  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/x-icon" href="home-favicon.png" />
      <Header initialSearchText={search} cartItems={cartItems} />

      <div className="home-page">
        <ProductGrid products={products} loadCartItems={loadCartItems} />
      </div>
    </>
  )
}

export default HomePage
