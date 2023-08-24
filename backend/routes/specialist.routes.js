const express=require("express")
const SpecialistModel=require("../model/specialist.model")
const bcrypt = require('bcrypt');
const auth=require("../middleware/auth.middleware")
var jwt = require('jsonwebtoken');
const specialistRouter=express.Router()

specialistRouter.post("/register",async(req,res)=>{
   //signup
   const {name,email,password}=req.body
   try {
    const specialist=await SpecialistModel.findOne({email:email})
    if(specialist){
        res.status(200).json({msg:"Specialist already Exist!!"})
    }else{
        bcrypt.hash(password, 3, async(err, hash)=>{
            // Store hash in your password DB.
            if(err){
                res.status(400).json({error:err.message})  
            }else{
                const specialist =new SpecialistModel({name,email,password:hash})
                await specialist.save()
                res.status(200).json({msg:"Specialist has been Registered successfully!!"}) 
            }
        });
    }
    } catch (error) {
    res.status(400).json({error:error.message})
   }
})

specialistRouter.post("/login",async(req,res)=>{
    //login
    const {email,password}=req.body
    try {
       const specialist= await SpecialistModel.findOne({email:email})
       if(specialist){
        bcrypt.compare(password, specialist.password, function(err, result) {
            // result == true
            if(result){
                var token = jwt.sign({ email:specialist.email,ID:specialist._id }, 'conpic');
                res.status(200).json({msg:"Login Successfull !!",token:token})
            }else{
                res.status(200).json({msg:"Please check your Password !!"})
            }
        });
       }else{
        res.status(200).json({msg:"specialist doesn't Exist!!"})
       }
    } catch (error) {
       res.status(400).json({error:error.message}) 
    }
})

specialistRouter.post("/services/add",auth,async(req,res)=>{
    try {
        const specialist= await SpecialistModel.findOne({email:req.email})
        if (!specialist) {
            return res.status(404).json({ error: "Specialist not found" });
        }

        // Add new services to the specialist's services array
        specialist.services.push("Haircut", "Dressing");

        // Save the updated specialist
        const updatedSpecialist = await specialist.save();

        res.send(updatedSpecialist);
    } catch (error) {
        res.status(400).json({error:error.message})   
    }
})


module.exports=specialistRouter