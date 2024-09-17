import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchProducts,
  setCategories,
  clearFilters,
} from "../features/products/productSlice";
import Filters from "../components/Filters";
import styles from "../css/Product.module.css";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { PiStarHalfFill } from "react-icons/pi";
import { PiSealCheckDuotone } from "react-icons/pi";

const Products = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  const { products, categories, rating, sort } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(clearFilters());
    if (category) {
      dispatch(setCategories({ value: category, checked: true }));
    }
  }, [dispatch, category]);

  const filteredProducts = products.filter((product) => {
    const selectedCategories = categories
      .filter((cat) => cat.checked)
      .map((cat) => cat.value.toLowerCase());

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category.toLowerCase());

    const ratingMatch = rating ? product.rating >= rating : true;

    return categoryMatch && ratingMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "ascending") {
      return a.price - b.price;
    } else if (sort === "descending") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className={styles.productsPage}>
      <div className="row ps-4 bg-body-tertiary">
        <div className="col-md-3">
          <Filters />
        </div>
        <div className="col-md-9 pe-4">
          <h1 className="text-center  pb-2 text-body">
            {category
              ? `${
                  category.charAt(0).toUpperCase() + category.slice(1)
                } Products (${sortedProducts.length})`
              : "All Products"}
          </h1>
          <div className="row">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => {
                const discountedPrice = product.price - product.discount;
                return (
                  <div key={product._id} className="col-md-3 mb-4">
                    <Link
                      to={`/productDetails/${product._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className={`card h-100 ${styles.productCard}`}>
                        <img
                          src={
                            product.productImage ||
                            "https://via.placeholder.com/150"
                          }
                          className={styles.cardImage}
                          alt={product.name}
                        />
                        <div className="card-body">
                          <h5 className={styles.cardTitle}>{product.name}</h5>
                          <p className={styles.cardCategory}>
                            {product.category}
                          </p>
                          <p className={styles.cardRating}>
                            Rating: {product.rating}{" "}
                            <PiStarHalfFill
                              size={35}
                              color="gold"
                              className="pb-2"
                            />
                          </p>
                          <p className={styles.cardPrice}>
                            ₹{discountedPrice.toFixed(2)}{" "}
                            <span
                              className="text-muted text-decoration-line-through"
                              style={{ fontSize: "0.85rem" }}
                            >
                              ₹{product.price.toFixed(2)}
                            </span>
                          </p>
                          <p className="">
                            {" "}
                            <CiDeliveryTruck size={25} color="" /> Instant
                            Delivery
                          </p>
                          <p className="">
                            {" "}
                            <PiSealCheckDuotone size={25} color="" /> Certified
                            Seller
                          </p>
                        </div>
                        <button className={styles.viewButton}>
                          View Product
                        </button>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <p className="text-center">No products found in this category</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
