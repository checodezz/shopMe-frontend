import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchProductById } from "../features/products/productDetailsSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { updatedCart, fetchCart } from "../features/cart/cartSlice";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

import styles from "../css/ProductDetails.module.css";

const ProductDetails = () => {
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [showGoToCart, setShowGoToCart] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    product = {},
    status = "idle",
    error = null,
  } = useSelector((state) => state.productDetails.product || {});
  const cartProducts = useSelector((state) => state.cart.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchCart());
  }, [dispatch, id]);

  useEffect(() => {
    if (product.wishlist !== undefined) {
      setAddedToWishlist(product.wishlist);
    }
    const isInCart = cartProducts.some((item) => item.productId._id === id);
    setInCart(isInCart);
  }, [product.wishlist, cartProducts, id]);

  const handleAddtoWishlist = (productId) => {
    dispatch(toggleWishlist(productId));
    setAddedToWishlist(!addedToWishlist);
    if (!addedToWishlist) {
      navigate("/wishlist");
    }
  };

  const handleAddtoCart = () => {
    dispatch(updatedCart({ id, operation: "increment" }));
    setInCart(true);
    setShowGoToCart(true); // Show "Go to Cart" button
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error}</div>;
  }

  if (!product || Object.keys(product).length === 0) {
    return <div>No product found</div>;
  }

  return (
    <div>
      <h1 className="text-center pt-4">Product Details</h1>
      <div className="d-flex justify-content-center align-items-center pb-3">
        <div className={`card ${styles.card} w-75 `}>
          <div className="row g-0">
            <div className={`col-md-4 ${styles.cardImgContainer}`}>
              <img
                src={product.productImage}
                alt={product.name}
                className={`img-fluid ${styles.cardImg}`}
              />
            </div>
            <div className="col-md-8">
              <div className={styles.cardBody}>
                <h1 className={styles.cardTitle}>{product.name}</h1>
                <p className={styles.cardText}>
                  {product.description ||
                    `Elevate your wardrobe with this stylish and versatile fashion piece. Designed with a keen eye for modern trends and timeless elegance, this ${product.name} combines comfort and sophistication seamlessly. Crafted from high-quality materials, it offers a flattering fit and a refined look, perfect for both casual and formal occasions.

  Whether you're dressing up for a night out or keeping it chic for a day at the office, this ${product.name} provides effortless style and unmatched versatility. The [feature details, such as "adjustable straps," "tailored fit," or "breathable fabric"] ensure you stay comfortable and look your best throughout the day.`}
                </p>
                <p className={styles.details}>
                  <strong>Category :</strong> {product.category}
                </p>
                <p className={styles.details}>
                  <strong>Ratings :</strong> {product.rating} Stars
                </p>
                <p className={styles.details}>
                  <strong>Price :</strong> ₹{product.price}
                </p>
                <p className={styles.details}>
                  <strong>Delivery :</strong> 4 Days
                </p>
                <p className={styles.textMuted}>
                  <small>
                    All the products have a return policy of 10 days. Please
                    read about the return policy carefully.
                  </small>
                </p>
                <div className={styles.buttonContainer}>
                  <button
                    className={`btn btn-outline-danger ${styles.button}`}
                    onClick={() => handleAddtoWishlist(id)}
                  >
                    <FaHeart size={25} className="me-1" />
                    {"   "}
                    {addedToWishlist
                      ? "Remove from wishlist"
                      : "Add to wishlist"}
                  </button>
                  {!showGoToCart ? (
                    <button
                      className={`btn btn-outline-primary ${styles.button}`}
                      onClick={handleAddtoCart}
                    >
                      <FaCartShopping size={26} />
                      {"    "}
                      {inCart ? "Go to Cart" : "Add to Cart"}
                    </button>
                  ) : (
                    <button
                      className={`btn btn-outline-primary ${styles.button}`}
                      onClick={handleGoToCart}
                    >
                      Go to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
