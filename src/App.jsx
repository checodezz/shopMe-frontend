import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import WishList from "./pages/WishList";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import User from "./components/User";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<User />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<PaymentSuccess />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
