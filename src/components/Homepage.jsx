import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <div className="">
        <img
          src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/5/21/91b180cd-de53-4a07-8cd2-3e5b8d37efd41716229933950-Desktop-Banner.jpg"
          alt=""
          className="container-fluid"
        />
      </div>
      <div className="text-center">
        <Link to="/products" className="btn btn-primary ">
          Browse Products
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
