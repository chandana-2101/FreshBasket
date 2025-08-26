
import React from "react";
import { motion } from "framer-motion";

import fruu2 from '../assets/images/fruu2.jpg'; 
import fruu3 from '../assets/images/fruu3.jpg';
import fruit from '../assets/images/fruit.jpg';
import fruit1 from '../assets/images/fruit1.jpg';
import { useNavigate} from "react-router-dom";
import "./About.css";

const About = () => {
  const navigate= useNavigate();
  return (
    <section 
      className="about-section"
      // Use an inline style to set the background image
      style={{ backgroundImage: `url(${fruu3})` }}>
      {/* Section 1 */}
      <div className="about-container">
        <motion.div
          className="about-image"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Use the imported variable and a class name for consistency */}
          <img className="about-item-image" src={fruu2} alt="Citrus Fruits" />
        </motion.div>

        <motion.div
          className="about-text"
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>About Us</h2>
          <p>
            At <strong>Fresh Basket</strong>, we believe in delivering nature’s
            goodness directly to your table. Our fruits are carefully sourced
            from trusted farmers, ensuring freshness, natural sweetness, and
            nutrition in every bite.
          </p>
        </motion.div>
      </div>

      
      <div className="about-container reverse">
        <motion.div
          className="about-text"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>Our Mission</h2>
          <p>
            With a passion for healthy living, we strive to make eating fresh
            and organic produce easy and affordable for everyone.
          </p>
        </motion.div>

        <motion.div
          className="about-image"
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Use the imported variable and a class name for consistency */}
          <img className="about-item-image" src={fruit} alt="Healthy Lifestyle" />
        </motion.div>
      </div>

      
      <div className="about-container">
        <motion.div
          className="about-image"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Use the imported variable and a class name for consistency */}
          <img className="about-item-image" src={fruit1} alt="Tropical Fruits" />
        </motion.div>

        <motion.div
          className="about-text"
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>Our Products</h2>
          <p>
            From the sun-kissed citrus of our groves to the juicy berries from
            our fields, our selection offers a taste of pure, unadulterated
            nature. We are committed to providing you with the finest seasonal
            and exotic fruits.
          </p>
        </motion.div>
        
      </div>
      <button  onClick={() => navigate("/products")}>Explore our products</button>
    </section>
  );
};

export default About;
