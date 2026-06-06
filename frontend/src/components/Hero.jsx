import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to FF Mart 🚀</h1>

        <p>
          Best products at amazing prices.
        </p>

        <Link to="/products">
        <button>
                 Shop Now
        </button>
       </Link>

    <div className="features-section">

  <div className="feature-card">
    <span>🚚</span>
    <h3>Free Delivery</h3>
    <p>On all orders above ₹499</p>
  </div>

  <div className="feature-card">
    <span>🔒</span>
    <h3>Secure Payment</h3>
    <p>100% secure payment</p>
  </div>

  <div className="feature-card">
    <span>🏆</span>
    <h3>Best Quality</h3>
    <p>Top quality products</p>
  </div>

  <div className="feature-card">
    <span>🎧</span>
    <h3>24/7 Support</h3>
    <p>Dedicated support</p>
  </div>
    </div>


      </div>
    </section>
  );
}

export default Hero;