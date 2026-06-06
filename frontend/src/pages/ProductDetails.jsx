import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails(){
     const { id } = useParams();
 console.log("ID:",id);
const [product,setProduct] = useState({});
const [review,setReview] = useState("");

const [reviews,setReviews] = useState([]);

useEffect(()=>{

  axios.get(`http://localhost:5000/products/${id}`)

  .then((res)=>{
    setProduct(res.data);
  })

  .catch((err)=>{
    console.log(err);
  });

},[]);
if(!product.name){
   return <h1>Loading...</h1>
}

return(
  <div className="product-details">

  <img

src={

product.image.startsWith("http")

? product.image

: `http://localhost:5000/uploads/${product.image}`

}

alt={product.name}

/>

  <div className="product-info">

    <h1>{product.name}</h1>
<p className="product-rating">
⭐⭐⭐⭐☆
</p>

<p className="product-description">

{product.description || "No Description Available ..."}

</p>


    <h2>₹ {product.price}</h2>

    <button>Add To Cart</button>

    <Link
to="/checkout"
onClick={()=>
localStorage.setItem(
"buyNowProduct",
JSON.stringify(product)
)
}
>

    <button className="buy-now-btn-2">
      BUY NOW 😁
    </button>

    </Link>

<div className="review-box">

<h2>Reviews ⭐</h2>

<input

type="text"

placeholder="Write Review..."

value={review}

onChange={(e)=>setReview(e.target.value)}

/>

<button

onClick={()=>{

setReviews([...reviews,review]);

setReview("");

}}

>

Add Review

</button>

{

reviews.map((item,index)=>(

<p key={index}>
{item}
</p>

))

}

</div>

  </div>

</div>

);
}

export default ProductDetails;