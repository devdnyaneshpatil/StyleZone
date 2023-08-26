const express=require("express")
const auth=require("../middleware/auth.middleware")
const ServiceModel = require("../model/services.model")
const serviceRouter=express.Router()


// This Route is for Posting the service 
serviceRouter.post("/add",auth,async(req,res)=>{
    const {serviceName,serviceType}=req.body
    try {
        const service= new ServiceModel({serviceName:serviceName,serviceType:serviceType,specialistID:req.ID})
        await service.save()
        res.status(200).json({msg:"Your service has been added successfully!!"})
    } catch (error) {
        res.status(400).json({error:error.msg})
    }
})



//Route for getting all Specialists services
serviceRouter.get("/",auth,async(req,res)=>{
    try {
        const services=await ServiceModel.find()
        res.status(200).json({msg:services})
    } catch (error) {
        res.status(400).json({error:error.msg}) 
    }
})



//Route for getting only that particular Specialists services
serviceRouter.get("/select",auth,async(req,res)=>{
    try {
        const services=await ServiceModel.find({specialistID:req.ID})
        res.status(200).json({msg:services})
    } catch (error) {
        res.status(400).json({error:error.msg}) 
    }
})


// Route for updating the service Only for Particular Specialist
serviceRouter.post("/update/:id",auth,async(req,res)=>{
  const serviceId=req.params.id
  const payload=req.body
  try {
    const service=ServiceModel.findOne({_id:serviceId})
    if(req.ID==service.specialistID){
       await ServiceModel.findByIdAndUpdate({_id:serviceId},payload)
       res.status(200).json({msg:"Your service has been Updated successfully!!"})
    }else{
        res.status(200).json({msg:"Not Authorized"})
    }
  } catch (error) {
    res.status(400).json({error:error.msg}) 
  }
})


//Route for Deleting the service By the particular Specialist.
serviceRouter.delete("/update/:id",auth,async(req,res)=>{
    const serviceId=req.params.id
    //const payload=req.body
    try {
      const service=ServiceModel.findOne({_id:serviceId})
      if(req.ID===service.specialistID){
         await ServiceModel.findByIdAndDelete({_id:serviceId})
         res.status(200).json({msg:"Your service has been Deleted successfully!!"})
      }else{
          res.status(200).json({msg:"Not Authorized"})
      }
    } catch (error) {
      res.status(400).json({error:error.msg}) 
    }
  })



module.exports=serviceRouter