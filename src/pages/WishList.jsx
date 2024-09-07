import { useSelector, useDispatch } from "react-redux";
import {
  toggleWishlist,
  toggleWishlistOptimistic,
} from "../features/wishlist/wishlistSlice";
import { fetchProducts } from "../features/products/productSlice";
import { useEffect } from "react";
// import "./Wishlist.css"; // Import your custom CSS file
import "../css/Wishlist.css";

const WishList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  // Filtering wishlist products directly
  const wishlistProducts = products.filter((product) => product.wishlist);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, wishlistProducts]);

  const handleWishlistToggle = (productId) => {
    dispatch(toggleWishlistOptimistic(productId));
    dispatch(toggleWishlist(productId));
  };

  if (wishlistProducts <= 0)
    return (
      <div className="container">
        <h1 className="wishlist-title">Wishlist</h1>
        <h4 className=" text-center p-5 m-5" style={{ height: "350px" }}>
          Your Wishlist is Empty
        </h4>
      </div>
    );

  return (
    <div className="wishlist-page">
      <h1 className="wishlist-title">Wishlist</h1>
      <div className="wishlist-container">
        {wishlistProducts.length > 0 ? (
          wishlistProducts.map((product) => (
            <div key={product._id} className="wishlist-card">
              <img
                src={product.productImage}
                alt={product.name}
                className="wishlist-image"
              />
              <div className="wishlist-info">
                <h2 className="wishlist-product-name">{product.name}</h2>
                <p className="wishlist-product-price">
                  Price: ₹{product.price}
                </p>
                <button
                  className="wishlist-toggle-btn"
                  onClick={() => handleWishlistToggle(product._id)}
                >
                  {product.wishlist
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WishList;
