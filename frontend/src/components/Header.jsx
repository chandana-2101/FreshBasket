import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalCount } = useCart();

  return (
    <header>
      <div className="fruit" onClick={() => navigate("/products")}>
        <img
            src="/images/fruitBasket.jpg"
            alt="Cart"
            className="cart-icon"
          />
        <span className="logo">FreshBasket</span>
      </div>

      <div className="nav-container">
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          &#9776;
        </button>

        <nav className={`navbar ${menuOpen ? "open" : ""}`}>
          <div className="nav-links">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink to="/products" onClick={() => setMenuOpen(false)}>Products</NavLink>
            <NavLink to="/checkout" onClick={() => setMenuOpen(false)}>Checkout</NavLink>
          </div>
        </nav>

        <div className="cart" onClick={() => navigate("/cart")}>
          <img
            src="/images/Cart1.jpg"
            alt="Cart"
            className="cart-icon"
          />
          {totalCount > 0 && (
            <span className="cart-badge">{totalCount}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;