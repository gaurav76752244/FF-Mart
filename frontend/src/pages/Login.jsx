import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Login(){

const navigate = useNavigate();

const [showPassword,setShowPassword] = useState(false);

const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

async function handleLogin(){

try{

const response = await axios.post(

"http://localhost:5000/login",

{
email,
password
}

);

if(response.data.success){

localStorage.setItem(

"user",

JSON.stringify(response.data.user)

);

toast.success(
`Hey ${response.data.user.name}, Welcome Back 🫶`,
{
  position: "top-center",
  
  style: {
    fontSize: "18px",
    padding: "16px"
  }
}
);

setTimeout(()=>{
navigate("/products");

window.location.reload();

},1500);
}

else{

toast.error(response.data.message);

}

}

catch(err){

console.log(err);

toast.error("Something Went Wrong 😢");

}

}

return(

<div className="auth-page">

<div className="auth-box">

<h1>Login 🔐</h1>

<input

type="email"

placeholder="Enter Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>

<div className="password-box">

<input

type={showPassword ? "text" : "password"}

placeholder="Enter Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>

<span

onClick={()=>setShowPassword(!showPassword)}

>

👁️

</span>

</div>

<button onClick={handleLogin}>

Login

</button>

</div>


</div>

)

}

export default Login;