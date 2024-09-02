import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setRating,
  setSort,
  clearFilters,
} from "../features/products/productSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const { categories, rating, sort } = useSelector((state) => state.products);

  // Handle category checkbox changes
  const handleCategoryChange = (e) => {
    dispatch(
      setCategories({
        value: e.target.value.toLowerCase(),
        checked: e.target.checked,
      })
    );
  };

  // Handle rating radio button changes
  const handleRadioInput = (e) => {
    dispatch(setRating(e.target.value));
  };

  // Handle sorting options changes
  const handleSort = (e) => {
    dispatch(setSort(e.target.value));
  };

  // Check if all categories are selected
  const isAllChecked = categories.every((cat) => cat.checked);

  return (
    <div className="filters mt-5 px-5">
      <div className="d-flex justify-content-between mb-3">
        <h3>Filters</h3>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(clearFilters())}
          className="fw-bold fs-6"
        >
          Clear
        </span>
      </div>
      <div>
        <div className="form-check">
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
          <div className="form-check" key={cat.value}>
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
              {cat.value}
            </label>
          </div>
        ))}

        <h3 className="mt-4">Rating</h3>
        {[4, 3, 2, 1].map((ratingValue) => (
          <div className="form-check" key={ratingValue}>
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
  );
};

export default Filters;
