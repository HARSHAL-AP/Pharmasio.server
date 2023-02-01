const express=require("express")
const {connection}=require("./config/db")
const {userRoute}=require("./routes/userRoute")
const {adminRoute}=require("./routes/adminRoute")
const {productRouter}=require("./routes/productRoutes")
const { authonticate}=require("./midlewere/authonticate.middleware")
require("dotenv").config()
const cors=require("cors")
const { application } = require("express")

const app=express()
app.use(cors({
    origin:"*"
}))

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/product",productRouter)

app.use("/user",userRoute)
app.use("/admin",adminRoute)


app.listen(process.env.port,async()=>{
try {
    await connection
    console.log("Connected To DB")
} catch (error) {
    console.log("Unable TO Connect Db")
    console.log(error)
}


})