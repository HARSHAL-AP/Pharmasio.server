const express=require("express")
const {connection}=require("./config/db")
const {userRoute}=require("./routes/userRoute")
const {adminRoute}=require("./routes/adminRoute")
const {productRouter}=require("./routes/productRoutes")
const {labtestRouter}=require("./routes/labtestRoute")
const {productorderRouter}=require("./routes/productorderRoute")
const {labtestorderRouter}=require("./routes/labtestorderRoute")
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
app.use("/productorder",productorderRouter)
app.use("/labtestorder",labtestorderRouter)
app.use("/labtests",labtestRouter)
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