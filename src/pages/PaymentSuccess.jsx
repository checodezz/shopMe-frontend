import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import styles from "../css/PaymentSuccess.module.css";
import { clearCart, deleteProductFromCart } from "../features/cart/cartSlice";
import { placeOrder } from "../features/orders/orderSlice";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const orders = useSelector((state) => state.orders.orders);

  // Calculate total price
  const totalPrice = products.reduce(
    (total, item) =>
      total + (item.productId?.price || 0) * (item.quantity || 0),
    0
  );

  useEffect(() => {
    const placeOrderAndClearCart = async () => {
      if (products.length > 0) {
        try {
          // Place the order
          await dispatch(
            placeOrder({ products, totalAmount: totalPrice })
          ).unwrap();

          // Delete products from cart and then clear the cart
          for (const product of products) {
            await dispatch(
              deleteProductFromCart(product.productId._id)
            ).unwrap();
          }

          // Clear the cart
          dispatch(clearCart());
        } catch (error) {
          console.error("Failed to place order and clear cart:", error);
        }
      }
    };

    placeOrderAndClearCart();
  }, [dispatch, products, totalPrice]);

  if (!orders.length) {
    return <div>No orders found.</div>;
  }

  return (
    <Container className={`${styles.container} col-md-7`}>
      <h1 className="text-center mb-4">Order Successful</h1>

      {/* Orders List */}
      {orders.map((order) => (
        <div key={order.orderId} className="mb-4">
          <h4 className="mb-3">Order ID: {order.orderId}</h4>
          <ListGroup className="mb-4">
            {order.products.map((item) => (
              <ListGroup.Item key={item._id} className="py-3 bg-body-tertiary">
                <Row>
                  <Col md={2}>
                    <img
                      src={item.productId?.productImage}
                      alt={item.productId?.name}
                      className={styles.productImage}
                    />
                  </Col>
                  <Col md={6}>
                    <h5>{item.productId?.name}</h5>
                    <p>Quantity: {item.quantity}</p>
                  </Col>
                  <Col md={4} className="text-md-center">
                    <p>Price: ₹{item.productId?.price}</p>
                    <p>
                      Subtotal: ₹
                      {(item.productId?.price || 0) * (item.quantity || 0)}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="text-center text-primary pb-3">
            <h4>Total: ₹{order.totalAmount}</h4>
            <hr />
          </div>
        </div>
      ))}

      <div className="text-center pb-4">
        <h3>Thank you for shopping with us.</h3>
        <p className="fw-semibold">Your order will be delivered soon.</p>
        <p>
          For product-related queries, contact customer support or give a missed
          call to the toll-free number 080-190-2339.
        </p>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
