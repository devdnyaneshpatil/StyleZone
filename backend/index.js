const express=require("express")
const connection= require("./db")
const specialistRouter=require("./routes/specialist.routes")
const serviceRouter=require("./routes/service.routes")
const userRouter = require("./routes/user.routes")
//const cors= require("cors")
const app=express()

//app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/specialist",specialistRouter)
app.use("/service",serviceRouter)


app.listen(8080,async()=>{
 try {
    await connection
    console.log("connected to the server")
 } catch (error) {
    console.log(error.message)
 }
})