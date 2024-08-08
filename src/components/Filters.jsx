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

  const isAllChecked = categories.length === 3;

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
            <strong>4</strong> Star & Above
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
            <strong>3</strong> Star & Above
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
            <strong>2</strong> Star & Above
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
            <strong>1</strong> Star & Above
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
  );
};

export default Filters;
