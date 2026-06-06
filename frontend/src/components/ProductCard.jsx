import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import { useNavigate } from "react-router-dom";
function ProductCard(props) {

  const navigate = useNavigate();

  return (
   <div

className="product-card"
>
     <Link to={`/product/${props.id}`}>
      <img

src={
props.image.startsWith("http")
? props.image
: `http://localhost:5000/uploads/${props.image}`
}

alt={props.name}

/>

      <h2 className="product-title">

{props.name}

<span
className={
props.stock
? "stock-dot in-stock"
: "stock-dot out-stock"
}
>

</span>

</h2>

      <p>{props.price}</p>
      </Link>

  <motion.button 
   className="wishlist-btn"
whileHover={{

    scale:1.08

}}

whileTap={{

    scale:0.9

}}

   onClick={props.addToWishlist}
    >

    <span
style={{
fontSize:"28px",

}}
>
❤️
</span>

    </motion.button>

<motion.button

className="buy-btn"

whileHover={{

    scale:1.08

}}

whileTap={{

    scale:0.9

}}

onClick={()=>

navigate(`/product/${props.id}`)

}

>

Buy Now ⚡

</motion.button>




     <motion.button

className="cart-btn"

whileHover={{

    scale:1.08

}}

whileTap={{

    scale:0.92

}}

onClick={props.addToCart}

>
        Add To Cart
      </motion.button>

    </div>
  );
}

export default ProductCard;