import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  updatedCart,
  updateQuantity,
  deleteProduct,
  deleteProductFromCart,
} from "../features/cart/cartSlice";
import { useEffect } from "react";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);
  console.log(cartItems);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = (productId, operation) => {
    dispatch(updateQuantity({ productId: productId._id, operation }));
    dispatch(updatedCart({ id: productId._id, operation }));
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
    dispatch(deleteProductFromCart(productId));
  };
  return (
    <div className="container mt-3" style={{ fontSize: "0.9rem" }}>
      <h2 className="text-center mb-4">Your Cart</h2>
      <div className="row container m-2">
        <div className="col-md-8">
          {cartItems.map((item) => {
            const { productId, quantity } = item;
            const discountedPrice = productId.price - productId.discount;

            return (
              <div key={item._id} className="card mb-0">
                <div className="row d-flex align-items-center g-0">
                  {/* Image Section */}
                  <div
                    className="col-md-3 d-flex align-items-center justify-content-center"
                    style={{ height: "200px", overflow: "hidden" }}
                  >
                    <img
                      src={
                        productId.productImage ||
                        "https://via.placeholder.com/150"
                      }
                      className="img-fluid"
                      alt={productId.name}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Details and Quantity Section */}
                  <div className="col-md-5">
                    <div className="card-body d-flex flex-column justify-content-between h-100">
                      <div>
                        <h5 className="card-title text-truncate">
                          {productId.name}
                        </h5>
                        <p className="card-category text-secondary mb-1 text-truncate">
                          {productId.category}
                        </p>
                        <p className="card-price mb-1">
                          ₹{discountedPrice.toFixed(2)}{" "}
                          <span className="text-muted text-decoration-line-through">
                            ₹{productId.price.toFixed(2)}
                          </span>
                        </p>
                      </div>
                      <div className="d-flex align-items-center pt-2">
                        <p className="mb-1 me-2">Quantity:</p>
                        <CiSquareMinus
                          style={{ fontSize: "1.9rem", cursor: "pointer" }}
                          onClick={() =>
                            handleQuantityChange(productId, "decrement")
                          }
                        />
                        <span className="mx-2">{quantity}</span>
                        <CiSquarePlus
                          style={{ fontSize: "1.9rem", cursor: "pointer" }}
                          onClick={() =>
                            handleQuantityChange(productId, "increment")
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Section */}
                  <div className="col-md-4 d-flex justify-content-end">
                    <div className="d-flex align-items-right pt-5 mt-5 px-3">
                      <button
                        className="btn btn-outline-danger btn-sm ms-3 px-3"
                        onClick={() => handleDeleteProduct(item._id)}
                      >
                        <AiFillDelete /> Remove from Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">CART PRICE DETAILS</h5>
              <hr />
              {cartItems.map((item) => (
                <p key={item._id} className="d-flex justify-content-between">
                  {item.productId.name} ({item.quantity}){" "}
                  <span>₹{item.productId.price * item.quantity}</span>
                </p>
              ))}
              <hr />
              <p className="d-flex justify-content-between">
                <strong>Total price:</strong>{" "}
                <strong>
                  ₹
                  {cartItems
                    .reduce(
                      (acc, item) => acc + item.productId.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </strong>
              </p>
              <button className="btn btn-primary w-100">CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
