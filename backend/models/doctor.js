//doctor model created
const mongoose = require('mongoose');
var Doctor = mongoose.model("Doctor", {
    doctor_name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    appointment_slot_time: {
        type: Array,
        'default': ['15min', '30min', '45min', '60min']
    },
    day_start_time: {
        type: String
    },
    day_end_time: {
        type: String
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },
})

module.exports = {
    Doctor
}