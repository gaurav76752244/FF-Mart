import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// ================= MULTER =================

const storage = multer.diskStorage({

destination:(req,file,cb)=>{  

    cb(null,"uploads");  

},  

filename:(req,file,cb)=>{  

    cb(null,Date.now()+path.extname(file.originalname));  

}

});

const upload = multer({storage});

// ================= MIDDLEWARE =================

app.use(cors());

app.use("/uploads",express.static("uploads"));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

// ================= MONGODB =================

mongoose.connect("mongodb://127.0.0.1:27017/ffmart")

.then(()=>{

console.log("MongoDB Connected 😎");

})

.catch((err)=>{

console.log("ERROR=>",err);

});

       // ================= RazorPay ================                 

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ================= PRODUCT SCHEMA =================

const ProductSchema = new mongoose.Schema({

name:String,  

price:String,  

image:String,  

description:String,  

category:String,  

stock:Boolean

});

const Product = mongoose.model("Product", ProductSchema);

// ================= USER SCHEMA =================

const UserSchema = new mongoose.Schema({

name:String,  

email:String,  

password:String,  

profileImage:String,

number:String,

role:{  

    type:String,  

    default:"user"  

}

});

const User = mongoose.model("User", UserSchema);

// ================= HOME =================

app.get("/", (req,res)=>{

res.send("Backend Running 😎");

});

// ================= GET PRODUCTS =================

app.get("/products", async(req,res)=>{

const products = await Product.find();  

res.json(products);

});

// ================= ADD PRODUCT =================

app.post("/add-product",upload.single("image"),async(req,res)=>{

try{  

    console.log(req.body);  

    console.log(req.file);  

    const product = new Product({  

        name:req.body.name,  

        price:req.body.price,  

        image:req.file.filename  

    });  

    await product.save();  

    res.json({  

        success:true,  

        message:"Product Added 😎"  

    });  

}  

catch(err){  

    console.log(err);  

    res.json({  

        success:false,  

        message:"Error"  

    });  

}

});

// ================= DELETE PRODUCT =================

app.delete("/delete-product/:id", async(req,res)=>{

await Product.findByIdAndDelete(req.params.id);  

res.json({  

    success:true,  

    message:"Product Deleted 😎"  

});

});

app.put("/update-product/:id", async(req,res)=>{

try{

await Product.findByIdAndUpdate(

req.params.id,

{

name:req.body.name,

price:req.body.price,

description:req.body.description,

category:req.body.category,

stock:req.body.stock

}

)

res.json({

success:true,

message:"Product Updated 😎"

})

}

catch(err){

console.log(err)

}

})

// ================= PRODUCT DETAILS =================

app.get("/products/:id", async(req,res)=>{

const product = await Product.findById(req.params.id);  

res.json(product);

});

// ================= SIGNUP =================

app.post("/signup", async(req,res)=>{

const user = new User(req.body);  

await user.save();  

res.json({  

    message:"User Signup Successfully 😎"  

});

});

// ================= LOGIN =================

app.post("/login", async(req,res)=>{

const user = await User.findOne({  

    email:req.body.email,  

    password:req.body.password  

});  

if(user){  

    res.json({  

        success:true,  

        role:user.role,  

        message:"Login Successful 😎",  
       
        user:user

    });  

}  

else{  

    res.json({  

        success:false,  

        message:"Invalid Email Or Password 😭"  

    });  

}

});

// ================= UPDATE PROFILE =================

app.put(
"/update-profile/:id",
upload.single("image"),
async(req,res)=>{

try{

const updatedData = {

name:req.body.name,

email:req.body.email,

number:req.body.number

};

if(req.file){

updatedData.profileImage =
req.file.filename;

}

const user =
await User.findByIdAndUpdate(

req.params.id,

updatedData,

{new:true}

);

res.json({

success:true,

user

});

}

catch(err){

console.log(err);

res.json({

success:false,

message:"Profile Update Failed"

});

}

}
);

// ================= ADD STATIC PRODUCTS =================

app.post("/create-order", async (req, res) => {

try {

const options = {
amount: req.body.amount * 100,
currency: "INR",
receipt: "FFMART_" + Date.now()
};

const order = await razorpay.orders.create(options);

res.json(order);

}

catch (err) {

   console.log("RAZORPAY ERROR =>", err);

   console.log("ERROR RESPONSE =>", err?.error);

   res.status(500).json({
      success:false,
      message:"Order creation failed"
   });

}

});



// ================= START SERVER =================

app.listen(5000, ()=>{

console.log("Server Started On Port 5000 🚀");

});
