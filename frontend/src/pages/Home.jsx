import { useEffect, useState } from "react";
import axios from "axios";
import OfferSlider from "../components/OfferSlider";
import ProductCard from "../components/ProductCard";

function Home(props) {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [visibleProducts, setVisibleProducts] = useState(15);

  useEffect(() => {

    axios.get("http://localhost:5000/products")

      .then((res) => {

        setProducts(res.data);

        setLoading(false);

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);

  const filteredProducts = products.filter((item)=>

    item.name
    .toLowerCase()
    .includes(props.search.toLowerCase())

    &&

    (

      props.selectedCategory === ""

      ||

      item.category === props.selectedCategory

    )

  );

  // SHIMMER LOADING 😎🔥

  if (loading) {

    return (

      <div className="shimmer-container">

        {

          [...Array(8)].map((_, index) => (

            <div className="shimmer-card" key={index}></div>

          ))

        }

      </div>

    );

  }

  return (

    <div className="products-section">

<div className="scrolling-text">

✨ Discover. Desire. Deliver. ✨ | Welcome to FF Mart – Where Great Deals Meet Great Quality 🛍️  |  Fast & Furious 🩷

</div>

      {
      props.showBanner && <OfferSlider/>
      }
      <h1>Trending Products</h1>

      <div className="products-container">

        {

          filteredProducts.length === 0 ?

            <h1 className="no-products">

              No Products Found 😢

            </h1>

            :

            filteredProducts.slice(0, 4).map((item, index) => (

              <ProductCard

                key={index}

                id={item._id}

                image={item.image}

                name={item.name}

                price={item.price}

                stock={item.stock}

                description={item.description}

                category={item.category}

                stock={item.stock}

                addToCart={() => props.addToCart(item)}

                addToWishlist={() => props.addToWishlist(item)}

              />

            ))

        }

      </div>

      <h1 className="section-title">

        All Products

      </h1>

      <div className="products-container">

        {

          filteredProducts.slice(4, visibleProducts).map((item, index) => (

            <ProductCard

              key={index}

              id={item._id}

              image={item.image}

              name={item.name}

              price={item.price}

              description={item.description}

              category={item.category}

              stock={item.stock}

              addToCart={() => props.addToCart(item)}

              addToWishlist={() => props.addToWishlist(item)}

            />

          ))

        }

      </div>

      <button

        className="load-more-btn"

        onClick={() => setVisibleProducts(visibleProducts + 12)}

      >

        Load More 😎

      </button>

    </div>

  );

}

export default Home;