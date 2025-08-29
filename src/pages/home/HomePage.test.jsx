import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, within } from "@testing-library/react"
import HomePage from "./HomePage"
import { MemoryRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"
import axios from "axios"

vi.mock("axios")

describe("HomePage", () => {
  let loadCartItemsMock

  beforeEach(() => {
    loadCartItemsMock = vi.fn()
    axios.get.mockImplementation(async urlPath => {
      console.log(urlPath)
      if (urlPath === "/api/products?search=") {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ],
          status: 200,
        }
      }
    })
    render(
      <MemoryRouter>
        <HomePage cartItems={[]} loadCartItems={loadCartItemsMock} />
      </MemoryRouter>
    )
  })
  it("renders the HomePage component", async () => {
    const productContainers = await screen.findAllByTestId("product-container")
    expect(productContainers).toHaveLength(2)
    expect(
      within(productContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs"
      )
    ).toBeInTheDocument()
    expect(
      within(productContainers[1]).getByText("Intermediate Size Basketball")
    ).toBeInTheDocument()
  })

  it("checks add to cart button", async () => {
    const user = userEvent.setup()
    const productContainers = await screen.findAllByTestId("product-container")
    await user.selectOptions(within(productContainers[0]).getByTestId("product-quantity-select"), "3")
    await user.selectOptions(within(productContainers[1]).getByTestId("product-quantity-select"), "2")
    await user.click(within(productContainers[0]).getByTestId("add-to-cart-button"))
    await user.click(within(productContainers[1]).getByTestId("add-to-cart-button"))
    expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 3,
    })
    expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
    })
    expect(loadCartItemsMock).toHaveBeenCalledTimes(2)
  })
})
