import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state?.cart?.products);
  console.log(cart);
  return <h2>Cart</h2>;
};

export default Cart;
