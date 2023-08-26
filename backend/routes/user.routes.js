const express=require("express")
const ServiceModel=require("../model/services.model")
const SpecialistModel=require("../model/specialist.model")
const userRouter=express.Router()



//this route is for homepage when we click on any category of services then we will be directed
//to the another page where there will be divs and each div will shows the srvice name,
//saloon name and address of the saloon.
userRouter.get("/services",async(req,res)=>{
    const {type}= req.query
    try {
       const services=await ServiceModel.find({serviceName:type})
       let arr=[]
       for(let i=0; i<services.length; i++){
          const specialist= await SpecialistModel.find({_id:services[i].specialistID})
          arr.push(specialist)
       }
       //console.log(arr)
       //console.log(services.length)
       res.status(200).json({services:services,specialist:arr})
       //in arr we have the data in 2d format please check this
    } catch (error) {
       res.status(400).json({error:error.message}) 
    }
})


// whenever we click on any of the div the api call should be happen with specialistid as a param
// and then the page should shows the saloon information and services of that particular saloon
userRouter.get("/services/specialist/:id",async(req,res)=>{
    const Id=req.params.id
    try {
        const specialist= await SpecialistModel.find({_id:Id})
        const services=await ServiceModel.find({specialistID:Id})
        res.send({specialist:specialist,services:services})
    } catch (error) {
        res.status(400).json({error:error.message}) 
    }
})

//appointment booking route


module.exports=userRouter