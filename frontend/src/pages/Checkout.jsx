import {useState} from "react";
import {Link,Navigate,useLocation} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function Checkout(props){

    const navigate = useNavigate();

    const location = useLocation();
   const buyNowProduct =
location.state?.buyNowProduct ||

JSON.parse(
localStorage.getItem("buyNowProduct")
);

    const [paymentMethod,setPaymentMethod] = useState("Cash On Delivery");

const [upiId,setUpiId] = useState("");

const total = buyNowProduct
? Number(
buyNowProduct.price
.toString()
.replace(/,/g,"")
)
: 0;

  const user = localStorage.getItem("user");
   
  if(!user){
    return <Navigate to="/login"/>
  }
  
       const handlePayment = async () => {

try {

const response = await axios.post(
"http://localhost:5000/create-order",
{
amount: total
}
);

const options = {

key: import.meta.env.VITE_RAZORPAY_KEY_ID,

amount: response.data.amount,

currency: response.data.currency,

name: "FF Mart",

description: buyNowProduct?.name,

order_id: response.data.id,

handler: function () {

navigate("/success");

},

method: {

upi: true,

card: true,

netbanking: true,

wallet: true

},

theme: {

color: "#FFD700"

}

};

const rzp = new window.Razorpay(options);

rzp.open();

}

catch(err){

console.log(err);

}

};

  return(

        <div className="checkout-page">

            <h1>Checkout 🛒</h1>

            <input
            type="text"
            placeholder="Enter Address"
            />

            <select

value={paymentMethod}

onChange={(e)=>setPaymentMethod(e.target.value)}

>

<option>Cash On Delivery</option>

<option>UPI</option>

<option>Card Payment</option>

</select>

{

paymentMethod === "UPI" && (

<div className="upi-box">

<input

type="text"

placeholder="Enter UPI ID"

value={upiId}

onChange={(e)=>setUpiId(e.target.value)}

/>

</div>

)

}

 <h2>
Product : {buyNowProduct?.name}
</h2>

<h2>
Total Amount : ₹ {total}
</h2>

{
paymentMethod === "Cash On Delivery" ?

<Link to="/success">
   <button>
      Place Order 🚚
   </button>
</Link>

:

<button onClick={handlePayment}>
   Pay Now 💳
</button>
}
        </div>

    )

}

export default Checkout;