const mongoose =require("mongoose")


const specialistSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    buisnessName:String,
    services: {
        type: [String],
        default: []
    }
})

const SpecialistModel=mongoose.model("specialist",specialistSchema)


module.exports=SpecialistModel