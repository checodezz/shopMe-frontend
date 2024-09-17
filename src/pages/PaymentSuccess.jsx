import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Container, ListGroup, Row, Col } from "react-bootstrap";
import styles from "../css/PaymentSuccess.module.css"; // Assuming you have a CSS module for styling

const PaymentSuccess = () => {
  const { products } = useSelector((state) => state.cart);

  // Calculate total price
  const totalPrice = products.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <Container className={`${styles.container} col-md-7 `}>
      <h1 className="text-center mb-4">Order Successful</h1>

      {/* Product List */}
      <ListGroup className="mb-4">
        {products.map((item) => (
          <ListGroup.Item key={item._id} className="py-3 bg-body-tertiary">
            <Row>
              <Col md={2}>
                <img
                  src={item.productId.productImage}
                  alt={item.productId.name}
                  className={styles.productImage}
                />
              </Col>
              <Col md={6}>
                <h5>{item.productId.name}</h5>
                <p>Quantity: {item.quantity}</p>
              </Col>
              <Col md={4} className="text-md-center">
                <p>Price: ₹{item.productId.price}</p>
                <p>Subtotal: ₹{item.productId.price * item.quantity}</p>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Total Price */}
      <div className="text-center text-primary pb-3 ">
        <h4>Total: ₹{totalPrice}</h4>
        <hr />
      </div>
      <div className="text-center pb-4">
        <h3>Thank you for shopping with us. </h3>
        <p className="fw-semibold">Your order will be delivered soon.</p>
        <p>
          For product related query, contact customer support or give a missed
          call to the toll-free number 080-190-2339
        </p>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
