import { useNavigate } from "react-router-dom";

function Cart(props){

    const navigate = useNavigate();

const total = props.cart.reduce(

(sum,item)=>

sum +

(

Number(

item.price.toString().replace(/,/g,"")

)

*

item.quantity

),

0

);

return(

<div className="cart-page">

<h1>My Cart 🛒</h1>

{

props.cart.length === 0 ?

<h2>Cart Is Empty 😢</h2>

:

props.cart.map((item,index)=>(

<div className="cart-item" key={index}>

<img

src={

item.image.startsWith("http")

? item.image

: `http://localhost:5000/uploads/${item.image}`

}

alt={item.name}

/>

<div>

<h2>{item.name}</h2>

<h3>₹ {item.price}</h3>

<h4>Quantity:{item.quantity}</h4>

<button

onClick={()=>props.deleteProduct(index)}

className="remove-btn"

>

Remove

</button>

<button
   className="cart-buy-now-btn"
   onClick={() =>
      navigate("/checkout", {
         state: {
            buyNowProduct: item
         }
      })
   }
>
   Buy Now
</button>

<div className="quantity-box">

<button

onClick={()=>props.removeFromCart(index)}

>

-

</button>

<span>{item.quantity}</span>

<button

onClick={()=>props.addToCart(item)}

>

+

</button>

</div>

</div>

</div>

))

}

<h2 className="total-price">

Total : ₹ {total}

</h2>

</div>

)

}

export default Cart;