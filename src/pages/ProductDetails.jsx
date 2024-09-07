import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchProductById } from "../features/products/productDetailsSlice";
import { FaHeart } from "react-icons/fa";
import { updatedCart, fetchCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";

const ProductDetails = () => {
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [showGoToCart, setShowGoToCart] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch product details and cart from the Redux store
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
    <div className="container">
      <h2 className="display-5 text-center">Product Details</h2>
      <div className="card m-3 mt-4">
        <div className="row g-0">
          <div className="col-md-4 card-img-container">
            <img
              src={product.productImage}
              className="img-fluid"
              alt={product.name}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body ms-2">
              <h1 className="card-title py-2" style={{ fontSize: "50px" }}>
                {product.name}
              </h1>
              <p className="card-text">
                {product.description ||
                  `Elevate your wardrobe with this stylish and versatile fashion piece. Designed with a keen eye for modern trends and timeless elegance, this ${product.name} combines comfort and sophistication seamlessly. Crafted from high-quality materials, it offers a flattering fit and a refined look, perfect for both casual and formal occasions.

  Whether you're dressing up for a night out or keeping it chic for a day at the office, this ${product.name} provides effortless style and unmatched versatility. The [feature details, such as "adjustable straps," "tailored fit," or "breathable fabric"] ensure you stay comfortable and look your best throughout the day.`}
              </p>
              <p>
                <strong>Category :</strong> {product.category}
              </p>
              <p>
                <strong>Ratings :</strong> {product.rating} Stars
              </p>
              <p>
                <strong>Price :</strong> ₹{product.price}
              </p>
              <p>
                <strong>Delivery :</strong> 4 Days
              </p>
              <p>
                <small className="text-muted">
                  All the products have a return policy of 10 days. Please read
                  about the return policy carefully.
                </small>
              </p>
              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleAddtoWishlist(id)}
                >
                  <FaHeart className="me-1" />
                  {addedToWishlist ? "Remove from wishlist" : "Add to wishlist"}
                </button>
                {!showGoToCart ? (
                  <button className="btn btn-primary" onClick={handleAddtoCart}>
                    {inCart ? "Go to Cart" : "Add to Cart"}
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={handleGoToCart}>
                    Go to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
