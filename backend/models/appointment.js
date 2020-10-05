//appointment model created
const mongoose = require('mongoose');

var Appointment = mongoose.model("Appointment", {
    appointment_date: {
        type: Date,
        required: true
    },
    appointment_time: {
        type: String,
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patient_name: {
        type: String,
        required: true
    },
    patient_email: {
        type: String,
        required: true
    },
    patient_phone: {
        type: String,
        required: true
    },
    appointment_status: {
        type: String,
        required: 'true',
        default: 'open'
    },
    created_at: {
        type: Date,

    },
    updated_at: {
        type: Date,

    },
})

module.exports = {
    Appointment
}