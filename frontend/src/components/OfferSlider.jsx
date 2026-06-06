import { useEffect, useState } from "react";

function OfferSlider(){

const banners = [

"https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

"https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1420&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

"https://images.unsplash.com/photo-1505740420928-5e560c06d30e"

];

const bannerContent = [

{
title:"Big Billion Days 😍🔥",
subtitle:"Up To 80% OFF On Trending Products"
},

{
title:"Electronics Mega Sale ⚡",
subtitle:"Best Deals On Gadgets & Accessories"
},

{
title:"Free Delivery Week 🚚",
subtitle:"Extra Cashback & Fast Shipping"
}

];

const [current,setCurrent] = useState(0);

useEffect(()=>{

const interval = setInterval(()=>{

setCurrent((prev)=>

prev === banners.length - 1

? 0

: prev + 1

)

},5000);

return ()=>clearInterval(interval);

},[])

return(

<div className="offer-slider">

<div

className="slider-wrapper"

style={{

transform:`translateX(-${current * 100}%)`

}}

>

{

banners.map((item,index)=>(

<img

src={item}

key={index}

alt=""

/>

))

}

</div>

<div className="offer-overlay">

<h1>{bannerContent[current].title}</h1>

<p>{bannerContent[current].subtitle}</p>

<button>Shop Now ✨</button>

</div>

<div className="slider-dots">

{banners.map((_,index)=>(

<span
key={index}
className={current === index ? "active-dot" : ""}
onClick={()=>setCurrent(index)}
></span>

))}

</div>

</div>

)

}

export default OfferSlider;