import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* <Route to="/" element={<Homepage />} />
           */}
          <Route path="/" element={<Homepage />} />
          <Route path="/products/all" element={<Products />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
