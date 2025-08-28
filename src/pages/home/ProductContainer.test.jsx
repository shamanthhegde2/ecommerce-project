import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import ProductContainer from "./ProductContainer"
import userEvent from "@testing-library/user-event"
import axios from "axios"
// fake axios package
vi.mock("axios")

describe("ProductContainer", () => {
  let product
  let loadCartItems
  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    }
    loadCartItems = vi.fn()
    render(<ProductContainer product={product} loadCartItems={loadCartItems} />)
  })
  it("display product details", () => {
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument()
    expect(screen.getByText("$10.90")).toBeInTheDocument()
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      product.image
    )
    expect(screen.getByTestId("product-rating")).toHaveAttribute(
      "src",
      `images/ratings/rating-${product.rating.stars * 10}.png`
    )
    expect(screen.getByText("87")).toBeInTheDocument()
  })
  it("add a product to cart", async () => {
    const user = userEvent.setup()
    await user.click(screen.getByTestId("add-to-cart-button"))
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: product.id,
      quantity: 1,
    })
    expect(loadCartItems).toHaveBeenCalled()
  })
})
