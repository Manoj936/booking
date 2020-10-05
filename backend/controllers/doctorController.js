const {
    Doctor
} = require("../models/doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
//getting all doctors
let getDoc = (req, res, next) => {
    Doctor.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error is fetching doctors:' + JSON.stringify(err, undefined, 2));
        }
    }).sort({
        created_at: 'desc'
    })
}
//creating doctor
let createDoc = (req, res, next) => {
    var doc = new Doctor({
        doctor_name: req.body.doctor_name,
        user_id: req.body.user_id,
        day_start_time: req.body.day_start_time,
        day_end_time: req.body.day_end_time,
        created_at: Date.now(),
        updated_at: Date.now()
    })
    doc.save((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error in saving doc :' + JSON.stringify(err, undefined, 2));
        }
    })
}

let docLogin = (req, res, next) => {
    let fetchedUser;
    let isUser;
    Doctor.find().populate('user_id').exec((err, docs) => {
        docs.filter((doc) => {
            if (doc.user_id.email.match(req.body.email.trim())) {
                isUser = true;
                fetchedUser = doc;
            } else {
                isUser = false;
            }
        })
        if (!isUser) {
            return res.json({
                status: 403,
                message: 'User email is not registred.'
            })
        } else {
            return bcrypt.compare(req.body.password, fetchedUser.user_id.password)
                .then(result => {
                    if (!result) {
                        res.status(401).json({
                            message: "Authentication Failed, Please check your credentials."
                        });
                    }
                    const token = jwt.sign({
                            email: fetchedUser.user_id.email,
                            userId: fetchedUser._id
                        },
                        "secret_this_should_be_longer", {
                            expiresIn: "1h"
                        }
                    );
                    return res.json({
                        status: 200,
                        email: fetchedUser.user_id.email,
                        token: token,
                        name : fetchedUser.doctor_name,
                        user_id: fetchedUser._id
                    });
                })
                .catch(err => {
                    return res.json({
                        Error: 'UNEXPECTED ERROR'
                    })
                });
        }
    })
};
module.exports = {
    createDoc,
    getDoc,
    docLogin
}