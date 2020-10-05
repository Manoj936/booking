const {Appointment} = require("../models/appointment");
var docId= require('mongoose').Types.ObjectId;

//getting appointment by doctor id
let getAppointmentsBydocid = (req , res , next)=>{
    if(!docId.isValid(req.params.id)){
        res.status(400).send(`The requested Id is invalid doctor Id:  ${req.params.id}`);
    }
    else{
        Appointment.find({doctor_id : req.params.id}, (err,docs)=>{
            if(!err){
                res.send(docs);
            }
            else{
                console.log('Error in getting appointments details: ' + JSON.stringify(err,undefined,2));
            }
        })
    }
}

//creating appointment
let createAppointment = (req, res, next)=>{
    var appointment = new Appointment({
        appointment_date: req.body.appointment_date,
        appointment_time: req.body.appointment_time,
        doctor_id: req.body.doctor_id,
        patient_name: req.body.patient_name,
        patient_email: req.body.patient_email,
        patient_phone: req.body.patient_phone,
        created_at: Date.now(),
        updated_at: Date.now()
    })
    appointment.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }
        else{
            console.log('Error in saving appointment :' +JSON.stringify(err, undefined,2));
        }
    })
}
 let changeAppointmentStatus = (req,res,next)=>{
           var data = {
            appointment_status : req.body.appointment_status  
            }
    
            Appointment.findByIdAndUpdate({ _id: req.params.id }, { $set: data }, { new: true }).then(function(user) {
                res.send(user);
                console.log(user);
            });
     
 }
module.exports = {
    createAppointment,
    getAppointmentsBydocid,
    changeAppointmentStatus
}