import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();
  return (
    <section className="banner">
      <img src="/images/banner6.jpg" alt="Fruit Banner" className="banner-img" />

      <div className="banner-text">
        <h1>FRUIT MARKET</h1>

        <p>
          Handpicked seasonal fruits delivered straight from farms to your doorstep. 
          Enjoy the natural sweetness, freshness, and health benefits in every bite.
        </p>

        <button onClick={() => navigate('/products', )}>Start Shopping</button>
      </div>
    </section>
  );
};

export default Banner;

