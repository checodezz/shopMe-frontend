import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchProducts,
  setCategories,
  setRating,
  setSort,
  clearFilters,
} from "../features/products/productSlice";
import "../css/Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const { products, categories, rating, sort } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    dispatch(
      setCategories({ value: e.target.value, checked: e.target.checked })
    );
  };

  const handleRadioInput = (e) => {
    dispatch(setRating(e.target.value));
  };

  const handleSort = (e) => {
    dispatch(setSort(e.target.value));
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = categories.length
      ? categories.includes(product.category)
      : true;
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

  const isAllChecked = categories.length === 3;

  return (
    <div className="products-page">
      <div className="row">
        <div className="col-md-3 filters my-3 px-5">
          <div className="d-flex justify-content-between mb-3">
            <h3>Filters</h3>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(clearFilters())}
            >
              Clear
            </span>
          </div>
          <div>
            <div className="form-check">
              <input
                type="checkbox"
                id="all"
                value="All"
                onChange={handleCategoryChange}
                checked={isAllChecked}
                className="form-check-input"
              />
              <label htmlFor="all" className="form-check-label">
                All
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="men"
                value="Men"
                onChange={handleCategoryChange}
                checked={categories.includes("Men")}
                className="form-check-input"
              />
              <label htmlFor="men" className="form-check-label">
                Men
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="women"
                value="Women"
                onChange={handleCategoryChange}
                checked={categories.includes("Women")}
                className="form-check-input"
              />
              <label htmlFor="women" className="form-check-label">
                Women
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="kids"
                value="Kids"
                onChange={handleCategoryChange}
                checked={categories.includes("Kids")}
                className="form-check-input"
              />
              <label htmlFor="kids" className="form-check-label">
                Kids
              </label>
            </div>

            <h3 className="mt-4">Rating</h3>
            <div className="form-check">
              <input
                type="radio"
                id="rating-4"
                name="rating"
                value="4"
                onChange={handleRadioInput}
                checked={rating === "4"}
                className="form-check-input"
              />
              <label htmlFor="rating-4" className="form-check-label">
                4 star and above
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="rating-3"
                name="rating"
                value="3"
                onChange={handleRadioInput}
                checked={rating === "3"}
                className="form-check-input"
              />
              <label htmlFor="rating-3" className="form-check-label">
                3 star and above
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="rating-2"
                name="rating"
                value="2"
                onChange={handleRadioInput}
                checked={rating === "2"}
                className="form-check-input"
              />
              <label htmlFor="rating-2" className="form-check-label">
                2 star and above
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="rating-1"
                name="rating"
                value="1"
                onChange={handleRadioInput}
                checked={rating === "1"}
                className="form-check-input"
              />
              <label htmlFor="rating-1" className="form-check-label">
                1 star and above
              </label>
            </div>

            <h3 className="mt-4">Sort by Price</h3>
            <div className="form-check">
              <input
                type="radio"
                id="ascending"
                name="sort"
                value="ascending"
                onChange={handleSort}
                checked={sort === "ascending"}
                className="form-check-input"
              />
              <label htmlFor="ascending" className="form-check-label">
                Low to High
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="descending"
                name="sort"
                value="descending"
                onChange={handleSort}
                checked={sort === "descending"}
                className="form-check-input"
              />
              <label htmlFor="descending" className="form-check-label">
                High to Low
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center mb-4">All Products</h1>
          <div className="row">
            {sortedProducts.map((product) => {
              const discountedPrice = product.price - product.discount;
              return (
                <div key={product._id} className="col-md-3 mb-4">
                  <div className="card h-100">
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
                    <a href="#" className="btn btn-primary btn-block">
                      View Product
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
