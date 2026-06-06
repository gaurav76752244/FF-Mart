import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Profile(){

const navigate = useNavigate();

const storedUser = JSON.parse(

localStorage.getItem("user") || "{}"

);

const [name,setName] = useState(

storedUser.name || ""

);

const [email,setEmail] = useState(

storedUser.email || ""

);

const [number,setNumber] = useState(

storedUser.number || ""

);

const [image,setImage] = useState(

storedUser.profileImage

?

`http://localhost:5000/uploads/${storedUser.profileImage}`

:

"https://i.pravatar.cc/150"

);
const [selectedFile,setSelectedFile] = useState(null);

async function saveProfile(){

try{

const formData = new FormData();

formData.append("name",name);

formData.append("email",email);

formData.append("number",number);

if(selectedFile){

formData.append(
"image",
selectedFile
);

}

const response =
await axios.put(

`http://localhost:5000/update-profile/${storedUser._id}`,

formData

);

if(response.data.success){

localStorage.setItem(

"user",

JSON.stringify(response.data.user)

);

toast.success("Profile Updated 😎🔥");

window.location.reload();

}

}

catch(err){

console.log(err);

toast.error("Update Failed 😢");

}

}

return(

<div className="profile-page">  

<div className="profile-card"> 

<h1 className="welcome-user">
Welcome, {storedUser.name || "User"} 👋
</h1>

     <img

src={image}

alt="profile"

className="profile-image"

/>

<input

type="file"

onChange={(e)=>{

const file = e.target.files[0];

if(file){

    setSelectedFile(file);

setImage(

URL.createObjectURL(file)

);

}

}}

/>

<input

type="text"

value={name}

onChange={(e)=>setName(e.target.value)}

placeholder="Enter Name"

/>

<input

type="email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

placeholder="Enter Email"

/>

<input

type="text"

value={number}

onChange={(e)=>setNumber(e.target.value)}

placeholder="Enter Number"

/>

<div className="profile-buttons"> 
    
    <button onClick={saveProfile}>  
        
        Save Changes 💾

</button> 

 <button

className="logout-btn"

onClick={()=>{

localStorage.removeItem("user");

toast.success("Logged out successfully 👋");

navigate("/login");

window.location.reload();

}}

> 

Logout 🚪

</button>  </div>  <div className="order-history">  <h2>Order History 📦</h2>  <div className="order-card">  <p>iPhone 15 Pro Max</p>  <span>Delivered ✅</span>

</div>  <div className="order-card">  <p>Nike Sneakers</p>  <span>Shipped 🚚</span>

</div>  <div className="order-card">  <p>Gaming Laptop</p>  <span>Processing ⏳</span>

</div>  </div>  </div>  </div>  )

}

export default Profile;