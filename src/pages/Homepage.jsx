import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import styles from "../css/Homepage.module.css";
import {
  BANNER_IMAGE,
  FAMILY_IMAGE,
  KID_IMAGE,
  MEN_IMAGE,
  SHOP_BY_CATEGORY_IMAGE,
  WOMEN_IMAGE,
} from "../utils/images/images";
import Carousal from "../components/Carousal";
import { useEffect } from "react";
import { clearCart, fetchCart } from "../features/cart/cartSlice";
import { clearOrders } from "../features/orders/orderSlice";

const Homepage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
    dispatch(clearOrders());
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  const categories = [
    { name: "All", image: FAMILY_IMAGE },
    { name: "Men", image: MEN_IMAGE },
    { name: "Women", image: WOMEN_IMAGE },
    { name: "Kids", image: KID_IMAGE },
  ];

  return (
    <div className="container">
      <div className="container-fluid">
        <Link to="/products/all">
          <img
            src={BANNER_IMAGE}
            alt=""
            className={`${styles.bannerImage} container-fluid img-fluid`}
          />
        </Link>
      </div>

      <div className={styles.categorySection}>
        <div>
          <img
            src={SHOP_BY_CATEGORY_IMAGE}
            alt=""
            className="container pt-3 pb-4"
          />
        </div>
        <div className="row">
          {categories.map((category, index) => (
            <div className="col-md-3 px-2" key={index}>
              <Link
                to={`/products/${category.name.toLocaleLowerCase()}`}
                className="category-link"
              >
                <div className={`${styles.categoryCard} mx-4 rounded`}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className={styles.categoryImage}
                  />
                  <div className={styles.categoryOverlay}>
                    <h2 className={styles.categoryText}>{category.name}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Link to="products/all">
        <Carousal />
      </Link>
    </div>
  );
};

export default Homepage;
