import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart } from "react-icons/fa";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import "../css/Header.css";
import { useEffect } from "react";
import { fetchCart } from "../features/cart/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  // const wishlistProductCount = useSelector(
  //   (state) => state.wishlist.products
  // ).length;

  const cartCount = useSelector((state) => state.cart.products).length;
  const cartStatus = useSelector((state) => state.cart.status);
  const wishlistCount = useSelector((state) => state.wishlist.products).length;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch, cartStatus]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid px-5">
        <Link
          to="/"
          className="navbar-brand font-monospace text-decoration-underline fw-bold font-monospace fs-4"
        >
          ShopMe
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="form-inline mx-auto">
            <div className="search-container">
              <input
                className="form-control search-input"
                type="search"
                placeholder="Search for products"
                aria-label="Search"
              />
              <FaSearch className="search-icon" />
            </div>
          </form>
          <div className="icons">
            <div className="wishlist-icon-container">
              <Link to="/wishlist" style={{ textDecoration: "none" }}>
                <FaHeart
                  className="ms-auto"
                  style={{
                    fontSize: "1.5rem",
                    color: "red",
                  }}
                />

                <span className="wishlist-item-count">{}</span>
              </Link>
            </div>
            <div className="cart-icon-container">
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <CiShoppingCart
                  style={{
                    fontSize: "1.5rem",
                    color: "black",
                  }}
                />
                <span className="cart-item-count">{cartCount}</span>
              </Link>
            </div>
            <div className="user-icon-container">
              <Link to="/user" style={{ textDecoration: "none" }}>
                <CiUser
                  style={{
                    fontSize: "1.5rem",
                    color: "black",
                  }}
                />
                {/* <span className="cart-item-count">{cartCount}</span> */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
