import { useState,useEffect } from "react";
import Cart from"./pages/Cart";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import EditProduct from "./pages/EditProduct";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {

 
  const [search,setSearch] = useState("");

       const[selectedCategory,setSelectedCategory]
       =useState("");


  const [cart,setCart]=useState(
    
    JSON.parse(localStorage.getItem("cart"))||[]
  
  );
      const [wishlist,setWishlist] = useState(

JSON.parse(localStorage.getItem("wishlist")) || []

);
     const [darkMode,setDarkMode] = useState(

JSON.parse(localStorage.getItem("darkMode")) || false

);

function addToCart(product){

    const existingProduct = cart.find(
        (item)=> String (item._id) === String(product._id)
    );

    if(existingProduct){

        const updatedCart = cart.map((item)=>

           String (item._id) === String (product._id)

            ?

            {...item, quantity:(item.quantity ||1)+1}

            :

            item

        );

        setCart(updatedCart);

    }

    else{

        setCart([
            ...cart,
            {...product, quantity:1}
        ]);

        toast.success("Product Added To Cart Boss👍");

    }

}
function removeFromCart(index){

    const product = cart[index];

    if(product.quantity > 1){

        const updatedCart = cart.map((item,i)=>

            i === index

            ?

            {
                ...item,
                quantity:item.quantity - 1
            }

            :

            item

        );

        setCart(updatedCart);

    }

    else{

        const updatedCart = cart.filter(
            (item,i)=> i !== index
        );

        setCart(updatedCart);

    }

}

function addToWishlist(product){

    const alreadyExist = wishlist.find(
        (item)=> item._id === product._id
    );

    if(alreadyExist){

        toast.error("Already In Wishlist ❤️");

        return;
    }

    const updatedWishlist = [...wishlist,product];

setWishlist(updatedWishlist);

localStorage.setItem(

"wishlist",

JSON.stringify(updatedWishlist)

);

    toast.success("Added To Wishlist 😎");

}
function removeFromWishlist(index){

    const updatedWishlist = wishlist.filter(

        (item,i)=> i !== index

    );

    setWishlist(updatedWishlist);

    localStorage.setItem(

        "wishlist",

        JSON.stringify(updatedWishlist)

    );

}

function deleteProduct(index){

    const updatedCart = cart.filter(
        (item,i)=> i !== index
    );

    setCart(updatedCart);

}
useEffect(()=>{

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

},[cart]);

useEffect(()=>{

localStorage.setItem(

"darkMode",

JSON.stringify(darkMode)

);

},[darkMode]);

 return(

  <div className={darkMode ? "dark" : "light"}>

    <Navbar
      search={search}
      setSearch={setSearch}
      cart={cart}
      wishlist={wishlist}
     darkMode={darkMode}
     setDarkMode={setDarkMode}
     setSelectedCategory={setSelectedCategory}
    />

    <Routes>

      <Route
        path="/"
        element={
          <>
            <Hero />
          </>
        }
      />

      <Route
        path="/products"
        element={
          <Home
            addToCart={addToCart}
            search={search}
            addToWishlist={addToWishlist}
            selectedCategory={selectedCategory}
            showBanner={search ===""}
          />
        }
      />
             <Route

path="/wishlist"

element={

<Wishlist

wishlist={wishlist}
removeFromWishlist={removeFromWishlist}

/>

}

/>
      <Route
path="/cart"
element={
    <Cart
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        deleteProduct={deleteProduct}
    />
}
/>
        <Route
  path="/product/:id"
  element={<ProductDetails />}
/>
<Route
path="/checkout"
element={<Checkout cart={cart} />}
/>
<Route
path="/success"
element={<Success />}
/>

<Route
path="/login"
element={<Login />}
/>

<Route
path="/signup"
element={<Signup />}
/>
    <Route 
    path="/admin"
    element={<Admin/>}
/>

 <Route
  path="/edit/:id" 
  element={<EditProduct />}
   />

   <Route
path="/profile"
element={<Profile />}
/>
    </Routes>

    <Footer />

<ToastContainer
position="top-right"
autoClose={2500}
theme="dark"
/>

  </div>

);
}

export default App;