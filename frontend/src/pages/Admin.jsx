import {useEffect,useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Admin.css";
function Admin(){

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")||"{}"
);
    if(user?.role !== "admin"){
    return (
   <div className="access-denied">
      <h1>🚫 Access Denied</h1>
      <p>Only Admins Can Access This Page Bro 🫠</p>
   </div>
)
}

    const[name,setName]=useState("");

    const[price,setPrice]=useState("");

    const[image,setImage]=useState(null);

    const[products,setProducts]=useState([]);

    useEffect(()=>{

fetchProducts();

},[])

async function fetchProducts(){

const res = await axios.get(
"http://localhost:5000/products"
)

setProducts(res.data)

}

    const handleSubmit=async(e)=>{

        e.preventDefault();

        const formData = new FormData();

        formData.append("name",name);

        formData.append("price",price);

        formData.append("image",image);

        try{

            const res = await axios.post(

                "http://localhost:5000/add-product",

                formData,
              {
                headers:{
                    "content-type":"multipart/form-data"
                }
              }
            );

            toast.success(res.data.message);
           fetchProducts();
        }

        catch(err){

            console.log(err);

        }

    };

    return(

        <div className="admin-page">

            <h1>Add Product</h1>

            <form onSubmit={handleSubmit}>

                <input

                type="text"

                placeholder="Product Name"

                onChange={(e)=>setName(e.target.value)}

                />

                <input

                type="text"

                placeholder="Price"

                onChange={(e)=>setPrice(e.target.value)}

                />

                <input

                type="file"

                onChange={(e)=>setImage(e.target.files[0])}

                />

                <button type="submit">

                    Add Product

                </button>

            </form>
        <div>

<h2>All Products</h2>

<div className="admin-products">
    {
products.map((product)=>(

<div key={product._id}
  className="admin-product-card"
>

<img
src={`http://localhost:5000/uploads/${product.image}`}
width="100"
/>

<h3>{product.name}</h3>

<p>₹ {product.price}</p>

<button>

Delete

</button>

<button
onClick={()=>
navigate(`/edit/${product._id}`)
}
>

Edit

</button>

</div>

))

}
</div>
</div>
        </div>

    );

}

export default Admin;