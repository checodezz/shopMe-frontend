import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const products = useSelector((state) => state.products.products);
  const cartCount = useSelector((state) => state.cart.products.length);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.trim().toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleProductClick = (productId) => {
    setSearchQuery("");
    setFilteredProducts([]);
    navigate(`/productDetails/${productId}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-secondary">
      <div className="container-fluid px-5">
        <Link
          to="/"
          className="navbar-brand font-monospace text-decoration-underline fw-bold font-monospace fs-4"
        >
          ShopMe
        </Link>

        {/* Add the navbar-toggler button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
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
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label="Search"
              />
              <FaSearch className="search-icon" />
            </div>

            {filteredProducts.length > 0 && (
              <div className="dropdown-menu show search-results">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="dropdown-item"
                    onClick={() => handleProductClick(product._id)}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </form>

          <div className="icons">
            <Link to="/wishlist" style={{ textDecoration: "none" }}>
              <FaHeart
                className="ms-auto"
                style={{
                  fontSize: "1.5rem",
                  color: "red",
                  marginRight: "1rem",
                }}
              />
            </Link>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <CiShoppingCart style={{ fontSize: "1.5rem", color: "black" }} />
              <span className="cart-item-count">{cartCount}</span>
            </Link>
            <Link to="/user" style={{ textDecoration: "none" }}>
              <CiUser style={{ fontSize: "1.5rem", color: "black" }} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
