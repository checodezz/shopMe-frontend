import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import "../css/Homepage.css";
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

const Homepage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

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
            className="banner-image container-fluid m-0 p-0"
          />
        </Link>
      </div>

      <div className="category-section">
        <div>
          <img src={SHOP_BY_CATEGORY_IMAGE} alt="" className="container mb-2" />
        </div>
        <div className="row">
          {categories.map((category, index) => (
            <div className="col-md-3 px-2" key={index}>
              <Link
                to={`/products/${category.name.toLocaleLowerCase()}`}
                className="category-link"
              >
                <div className="category-card mx-4 rounded">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                  />
                  <div className="category-overlay">
                    <h2 className="category-text">{category.name}</h2>
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
