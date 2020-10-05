const bcrypt = require("bcryptjs");
const User = require("../models/user");
//user creating
let signup = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
          name: req.body.name, 
          email: req.body.email,
          password: hash,
          created_at : Date.now(),
          updated_at: Date.now()
        });
        user
          .save()
          .then(result => {
            res.status(201).json({
              message: "User created!",
              result: result
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      });
}

module.exports = {
    signup
}
