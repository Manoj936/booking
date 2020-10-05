const express = require('express');
const bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json());
const path = require('path');
let constant = "./config/config.dev.js";
process.config = require(constant);
const mongoose = require('mongoose');
//setting up CORS
app.use(function (req, res, next) {
    res.setHeader('set-cookie', [
        'same-site-cookie=bar; SameSite=Lax',
        'cross-site-cookie=foo; SameSite=None; Secure',
    ]);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
//connection_to_mongodb cloud
mongoose.connect(`mongodb+srv://${process.config.mongocloud.username}:${process.config.mongocloud.password}@cluster0.mgyjn.mongodb.net/${process.config.mongocloud.dbname}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('db connected');
}).catch(err => {
    console.log(err);
    console.log('connection failed');
})
//initializing server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App is listing at port  :' + port)
})
//initilizing routing and api
var routerConfig = require("./routes/route");
app.use('/api', routerConfig);
app.use('/', (req, res) => {
    res.send('Api is working')
})