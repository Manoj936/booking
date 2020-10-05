'use strict';
let express = require("express"),
router = express.Router();
//importing controllers
let userController = require('../controllers/userController');
let docController = require('../controllers/doctorController');
let appointmentController = require('../controllers/appointmentController');

//routes
router.post('/user-signup' ,userController.signup); //create user api route
router.post('/create-doctor',docController.createDoc); //create doctor api route
router.post('/doctor-login',docController.docLogin);
router.get('/get-all-doctors', docController.getDoc); //getting all doctor api route
router.post('/create-appointment', appointmentController.createAppointment); //creating a new appointment
router.get('/get-appointment/:id', appointmentController.getAppointmentsBydocid); //fetching appointments for a dco
router.patch('/changeStatus/:id' , appointmentController.changeAppointmentStatus);
module.exports = router;  