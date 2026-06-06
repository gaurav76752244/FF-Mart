import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar(props) {

const navigate = useNavigate();

  const location = useLocation();

  const [showCategories, setShowCategories] = useState(false);

 const user = JSON.parse(
localStorage.getItem("user") || "null"
);

  return (

    <nav className="navbar">

      <Link to="/" className="logo-link">
        <h1 className="logo">FF Mart</h1>
      </Link>

      <div className="search-box">

        <span className="search-icon"></span>
        <input
          type="text"
          placeholder="Search products..."
          value={props.search}
          onChange={(e) => props.setSearch(e.target.value)}
        />

      </div>

      <ul className="nav-links">

        <li className ={location.pathname==="/"?"active-nav":""}>

          <Link to="/">Home</Link>
        
        </li>

        <li
          className="categories-menu"
          onClick={() => setShowCategories(!showCategories)}
        >

          <span>Categories ▼</span>

          {

            showCategories && (

              <div className="dropdown-menu">

                <p onClick={() => props.setSelectedCategory("")}>
                  All
                </p>

                <p onClick={() => props.setSelectedCategory("Mobiles")}>
                  Mobiles
                </p>

                <p onClick={() => props.setSelectedCategory("Laptops")}>
                  Laptops
                </p>

                <p onClick={() => props.setSelectedCategory("Fashion")}>
                  Fashion
                </p>

                <p onClick={() => props.setSelectedCategory("Shoes")}>
                  Shoes
                </p>

                <p onClick={() => props.setSelectedCategory("Electronics")}>
                  Electronics
                </p>

                <p onClick={() => props.setSelectedCategory("Accessories")}>
                  Accessories
                </p>

              </div>

            )

          }

        </li>

        <li className={location.pathname === "/products" ? "active-nav" : ""}>

<Link to="/products">Products</Link>

</li>

       <li className={location.pathname === "/admin" ? "active-nav" : ""}>

<Link to="/admin">Admin</Link>

</li>
        <li className={location.pathname === "/cart" ? "active-nav" : ""}>

<Link to="/cart">

Cart 🛒 ({props.cart.length})

</Link>

</li>

        <li className={location.pathname === "/wishlist" ? "active-nav" : ""}>

<Link to="/wishlist">

❤️ Wishlist ({props.wishlist.length})

</Link>

</li>

        {

          !user ?

            <>

              <li className={location.pathname === "/login" ? "active-nav" : ""}>

<Link to="/login">
Login
</Link>

</li>

             <li className={location.pathname === "/signup" ? "active-nav" : ""}>

<Link to="/signup">
Signup
</Link>

</li>

            </>

            :

            <li className="profile-box">

                <Link to="/profile">
            
              <img
  src={
    user?.profileImage
      ? `http://localhost:5000/uploads/${user.profileImage}`
      : "https://i.pravatar.cc/40"
  }
  alt="Profile"
/>
                  </Link>

              <button
               onClick={() => {

  localStorage.removeItem("user");

  navigate("/login");

}}
              >

                Logout

              </button>

            </li>

        }

        <div
          className={`theme-toggle ${props.darkMode ? "dark-active" : ""}`}
          onClick={() => props.setDarkMode(!props.darkMode)}
        >

          <div className="toggle-circle">

            {
              props.darkMode
                ? "🌙"
                : "☀️"
            }

          </div>

        </div>

      </ul>

    </nav>

  );

}

export default Navbar;