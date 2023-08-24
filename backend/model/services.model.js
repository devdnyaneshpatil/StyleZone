const mongoose=require("mongoose")

const serviceSchema=mongoose.Schema({
    serviceName:String,
    serviceType:{
        type:[Object]
    },
    specialistID:String
})
const ServiceModel= mongoose.model("service",serviceSchema)


module.exports=ServiceModel

