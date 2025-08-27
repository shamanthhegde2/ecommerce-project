import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import ProductContainer from "./ProductContainer"

describe("ProductContainer", () => {
  it("display product details", () => {
    const product = {
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
    const loadCartItems = vi.fn()
    render(<ProductContainer product={product} loadCartItems={loadCartItems} />)
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
})
