const mongoose = require('mongoose');
const SpecialistModel = require('./specialist.model');
const UserModel  = require('./user.model')

const appointmentSchema = mongoose.Schema({
    date: { type: String },
    time: { type: String, enum: ["11AM-12AM", "12AM-1PM",  "4PM-5PM", "5PM-6PM", "6PM-7PM"]},
    specialistID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: SpecialistModel,
        required: true
    },
    status : {type : String, enum: ["Pending", "Cancel", "Reject", "Confirm"], default:"Pending"},
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    service:{type:String}
}, {
    versionKey: false,
    timestamps: true
});

const AppointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = 
    AppointmentModel
