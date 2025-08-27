import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import LogoWhite from "../assets/images/logo-white.png"

import MobileLogoWhite from "../assets/images/mobile-logo-white.png"

import CartIcon from "../assets/images/icons/cart-icon.png"

import SearchIcon from "../assets/images/icons/search-icon.png"

import CloseIcon from "../assets/images/icons/xmark-solid-full.svg"

import "./Header.css"

function Header({ cartItems, initialSearchText = "" }) {
  const [searchText, setSearchText] = useState(initialSearchText)
  const navigate = useNavigate()
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  function handleSearch(event) {
    if (event.key === "Enter") {
      navigate(`/?search=${searchText}`)
    }
  }
  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={LogoWhite} />
          <img className="mobile-logo" src={MobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <div className="search-bar-container">
          <input
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="search-bar"
            type="text"
            placeholder="Search"
            onKeyDown={handleSearch}
          />
          {searchText && <img className="close-icon" src={CloseIcon} onClick={() => setSearchText("")} />}
        </div>

        <button className="search-button">
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  )
}

export default Header
