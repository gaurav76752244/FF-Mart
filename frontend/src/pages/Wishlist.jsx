function Wishlist(props){

    return(

        <div className="cart-page">

            <h1>My Wishlist ❤️</h1>

            {

                props.wishlist.length === 0 ?

                <h2>Wishlist Is Empty 😢</h2>

                :

                props.wishlist.map((item,index)=>(

                    <div className="cart-card" key={index}>

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
                            <button

className="remove-btn"

onClick={()=>props.removeFromWishlist(index)}

>

Remove

</button>

                        </div>

                    </div>

                ))

            }

        </div>

    )

}

export default Wishlist;