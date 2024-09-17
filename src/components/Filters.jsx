import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setRating,
  setSort,
  clearFilters,
} from "../features/products/productSlice";
// import styles from "../css/Filter.module.css";
import styles from "../css/Filter.module.css";

const Filters = () => {
  const dispatch = useDispatch();
  const { categories, rating, sort } = useSelector((state) => state.products);

  const handleCategoryChange = (e) => {
    dispatch(
      setCategories({
        value: e.target.value.toLowerCase(),
        checked: e.target.checked,
      })
    );
  };

  const handleRadioInput = (e) => {
    dispatch(setRating(e.target.value));
  };

  const handleSort = (e) => {
    dispatch(setSort(e.target.value));
  };

  const isAllChecked =
    categories.every((cat) => cat.checked) ||
    categories.every((cat) => !cat.checked);

  return (
    <div className={styles.filters}>
      <div className={styles.filtersHeader}>
        <h3>Filters</h3>
        <span
          onClick={() => dispatch(clearFilters())}
          className={styles.clearButton}
        >
          Clear
        </span>
      </div>
      <div className={styles.filterSection}>
        <div className={`${styles.filterItem} form-check`}>
          <input
            type="checkbox"
            id="all"
            value="all"
            onChange={(e) =>
              dispatch(
                setCategories({ value: "all", checked: e.target.checked })
              )
            }
            checked={isAllChecked}
            className="form-check-input"
          />
          <label htmlFor="all" className="form-check-label">
            All
          </label>
        </div>
        {categories.map((cat) => (
          <div className={`${styles.filterItem} form-check`} key={cat.value}>
            <input
              type="checkbox"
              id={cat.value.toLowerCase()}
              value={cat.value.toLowerCase()}
              onChange={handleCategoryChange}
              checked={cat.checked}
              className="form-check-input"
            />
            <label
              htmlFor={cat.value.toLowerCase()}
              className="form-check-label"
            >
              {cat.value.charAt(0).toUpperCase() + cat.value.slice(1)}
            </label>
          </div>
        ))}
        <div className={styles.filterSeparator}></div>
        <h3 className={styles.filterTitle}>Rating</h3>
        {[4, 3, 2, 1].map((ratingValue) => (
          <div className={`${styles.filterItem} form-check`} key={ratingValue}>
            <input
              type="radio"
              id={`rating-${ratingValue}`}
              name="rating"
              value={ratingValue}
              onChange={handleRadioInput}
              checked={rating === ratingValue.toString()}
              className="form-check-input"
            />
            <label
              htmlFor={`rating-${ratingValue}`}
              className="form-check-label"
            >
              <strong>{ratingValue}</strong> Star & Above
            </label>
          </div>
        ))}
        <div className={styles.filterSeparator}></div>
        <h3 className={styles.filterTitle}>Sort by Price</h3>
        <div className={`${styles.filterItem} form-check`}>
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
        <div className={`${styles.filterItem} form-check`}>
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
  );
};

export default Filters;
