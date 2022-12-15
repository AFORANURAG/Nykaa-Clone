// hello devlopers---------

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
    origin : "*"
}))

const connection = require("./config/db")
const productRouter = require("./routes/product.route");
const sellerRoute = require("./routes/seller.route");
const authenticate = require("./middlewares/seller.auth");
const { UserRouter } = require("./routes/User.route");

app.get("/" , (req,res) => {
    res.send("Welcome to beautybomb server")
})



app.use("/user",UserRouter)
app.use("/products" , authenticate)
app.use("/products" , productRouter)

app.use("/seller" , sellerRoute)

app.listen(8000 , async () => {
    try{
        await connection;
        console.log("Connected to DB Successfully");
    }
    catch(err){
        console.log("Error connecting DB");
        console.log(err);
    }
    console.log("Server Started at 8000");
})
