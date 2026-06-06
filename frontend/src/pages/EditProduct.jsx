import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./EditProduct.css";
import axios from "axios";

function EditProduct(){

const navigate = useNavigate();

const {id} = useParams();

const[name,setName] = useState("");

const[price,setPrice] = useState("");

const [description,setDescription]=useState("");

const [category,setCategory]=useState("");

const [stock,setStock]=useState(true);

const [preview,setPreview]=useState("");

const [image,setImage]=useState(null);

useEffect(()=>{

fetchProduct();

},[])

async function fetchProduct(){

const res = await axios.get(`http://localhost:5000/products/${id}`);

setName(res.data.name);

setPrice(res.data.price);

setDescription(res.data.description || "");

setCategory(res.data.category || "");

setStock(res.data.stock ?? true);

setPreview(

`http://localhost:5000/uploads/${res.data.image}`

);

}

async function updateProduct(e){

e.preventDefault();

try{

await axios.put(

`http://localhost:5000/update-product/${id}`,

{

name,

price,

description,

category,

stock

}

)

toast.success("Product Updated 😎🔥")

navigate("/admin");
window.scrollTo(0,0);

}

catch(err){

console.log(err)

}

}

return(

<div className="edit-page">

<div className="edit-form">

<h1>Edit Product 😎</h1>

<form onSubmit={updateProduct}>

<input

type="text"

value={name}

onChange={(e)=>setName(e.target.value)}

placeholder="Product Name"

/>

<input

type="text"

value={price}

onChange={(e)=>setPrice(e.target.value)}

placeholder="Price"

/>

<textarea

value={description}

onChange={(e)=>setDescription(e.target.value)}

placeholder="Description"

/>

<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

>

<option value="">Select Category</option>

<option value="Mobiles">Mobiles</option>

<option value="Laptops">Laptops</option>

<option value="Fashion">Fashion</option>

<option value="Shoes">Shoes</option>

<option value="Electronics">Electronics</option>

<option value="Accessories">Accessories</option>

</select>

<div className="stock-box">

<label>

{stock ? "🟢 In Stock" : "🔴 Out Of Stock"}

</label>

<div

className={`stock-toggle ${stock ? "active" : ""}`}

onClick={()=>setStock(!stock)}

>

<div className="toggle-circle"></div>

</div>

</div>

{

preview && (

<>

<img

src={preview}

className="preview-image"

/>

<input

type="file"

onChange={(e)=>{

setImage(e.target.files[0])

setPreview(

URL.createObjectURL(e.target.files[0])

)

}}

/>

</>

)

}

<button type="submit">

Update Product

</button>

</form>

</div>

</div>

)

}

export default EditProduct;