import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import Banner from "./components/Banner";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
    <Router>
      
        <Header />
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      
    </Router>
    </CartProvider>
  );
}

export default App;