import { describe, it, expect } from "vitest"

import { formatMoney } from "./money"

describe("formatMoney", () => {
  it("formats cents as dollars", () => {
    expect(formatMoney(1000)).toBe("$10.00")
    expect(formatMoney(100)).toBe("$1.00")
    expect(formatMoney(0)).toBe("$0.00")
  })

  it("shows 2 decimals", () => {
    expect(formatMoney(1000)).toBe("$10.00")
    expect(formatMoney(100)).toBe("$1.00")
    expect(formatMoney(0)).toBe("$0.00")
  })
})
