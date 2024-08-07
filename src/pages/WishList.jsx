import { useSelector } from "react-redux";

const WishList = () => {
  //   console.log(first);
  const product = useSelector((state) => state.wishlist.products);
  console.log(product);

  return <h1>Wishlist</h1>;
};

export default WishList;
