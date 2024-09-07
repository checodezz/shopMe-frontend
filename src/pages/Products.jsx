import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchProducts,
  setCategories,
  clearFilters,
} from "../features/products/productSlice";
import Filters from "../components/Filters";
import "../css/Products.css";

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
    <div className="products-page">
      <div className="row ps-4 bg-body-tertiary">
        <div className="col-md-3">
          <Filters />
        </div>
        <div className="col-md-9">
          <h3 className="text-center pt-3 pb-2 display-6">
            {category
              ? `${
                  category.charAt(0).toUpperCase() + category.slice(1)
                } Products`
              : "All Products"}
          </h3>
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
                      <div className="card h-100 product-card">
                        <img
                          src={
                            product.productImage ||
                            "https://via.placeholder.com/150"
                          }
                          className="card-img-top"
                          alt={product.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-category text-secondary">
                            {product.category}
                          </p>
                          <p className="card-rating fw-semibold">
                            Rating: {product.rating} ⭐️
                          </p>
                          <p className="card-price">
                            ₹{discountedPrice.toFixed(2)}{" "}
                            <span className="text-muted text-decoration-line-through">
                              ₹{product.price.toFixed(2)}
                            </span>
                          </p>
                        </div>
                        <button className="btn btn-primary btn-block">
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
