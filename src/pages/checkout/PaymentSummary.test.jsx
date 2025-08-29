import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, within } from "@testing-library/react"
import PaymentSummary from "./PaymentSummary"
import { MemoryRouter } from "react-router-dom"
import { useLocation } from "react-router-dom"
import userEvent from "@testing-library/user-event"
import axios from "axios"

vi.mock("axios")

function Location() {
  const location = useLocation()
  console.log(location)
  return <div data-testid="location">{location.pathname}</div>
}

describe("PaymentSummary", () => {
  let paymentSummary
  let loadCartItems
  beforeEach(() => {
    paymentSummary = {
      totalItems: 9,
      productCostCents: 10815,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 11314,
      taxCents: 1131,
      totalCostCents: 12445,
    }
    loadCartItems = vi.fn()
    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCartItems={loadCartItems}
        />
        <Location />
      </MemoryRouter>
    )
  })
  it("renders the payment summary correctly", () => {
    expect(screen.getByText("Items (9):")).toBeInTheDocument()
    expect(
      within(screen.getByTestId("payment-summary-product-cost")).getByText(
        "$108.15"
      )
    ).toBeInTheDocument()
    expect(
      screen.getByTestId("payment-summary-shipping-cost")
    ).toHaveTextContent("$4.99")
    expect(
      screen.getByTestId("payment-summary-total-before-tax")
    ).toHaveTextContent("$113.14")
    expect(screen.getByTestId("payment-summary-tax")).toHaveTextContent(
      "$11.31"
    )
    expect(screen.getByTestId("payment-summary-total")).toHaveTextContent(
      "$124.45"
    )
  })

  it("handles place order button click", async () => {
    const user = userEvent.setup()
    await user.click(screen.getByTestId("payment-summary-place-order-button"))
    expect(axios.post).toHaveBeenCalledWith("/api/orders")
    expect(screen.getByTestId("location")).toHaveTextContent("/orders")
  })
})
