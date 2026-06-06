import {useState}from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
function Signup(){

    const navigate = useNavigate();

     const [showPassword,setShowPassword] = useState(false);
     const [name,setName] = useState("");

const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

async function handleSignup(){

    const response = await axios.post(

        "http://localhost:5000/signup",

        {
            name,
            email,
            password
        }

    );

    toast.success(response.data.message);

    setTimeout(() =>{
    navigate("/login");
    },1000);

}

    return(

        <div className="auth-page">
             <div className="auth-box">

            <h1>Signup 😎</h1>

           <input
type="text"
placeholder="Enter Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>
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
            

            <button onClick={handleSignup}>
            Signup
            </button>
                      </div>
        </div>

    )

}

export default Signup;