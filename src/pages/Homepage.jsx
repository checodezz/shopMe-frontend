import "../css/Homepage.css"; // Assuming you have a separate CSS file for styles
import { Link } from "react-router-dom";
import {
  BANNER_IMAGE,
  FAMILY_IMAGE,
  KID_IMAGE,
  MEN_IMAGE,
  WOMEN_IMAGE,
} from "../utils/images/images";

const Homepage = () => {
  const categories = [
    { name: "Men", image: MEN_IMAGE, link: "/category/men" },
    { name: "Women", image: WOMEN_IMAGE, link: "/category/women" },
    { name: "Kids", image: KID_IMAGE, link: "/category/kids" },
    { name: "Discover", image: FAMILY_IMAGE, link: "/products/all" },
  ];

  return (
    <div>
      <div className="container-fluid mb-5 ">
        <img
          src={BANNER_IMAGE}
          alt=""
          className="banner-image container-fluid m-0 p-0"
        />
      </div>

      <div className="category-section">
        <div className="row">
          {categories.map((category, index) => (
            <div className="col-md-3 px-2" key={index}>
              <Link to={category.link} className="category-link">
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
    </div>
  );
};

export default Homepage;
