import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const cartItemCount = 1;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary ">
      <div className="container">
        <a
          className="navbar-brand font-monospace text-decoration-underline fw-bold font-monospace fs-4"
          href="#"
        >
          Drip&Flex
        </a>
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
            <FaHeart
              style={{ fontSize: "1.5rem", marginRight: "20px", color: "red" }}
            />
            <div className="cart-icon-container">
              <CiShoppingCart style={{ fontSize: "1.5rem", color: "black" }} />
              {cartItemCount > 0 && (
                <span className="cart-item-count">{cartItemCount}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
