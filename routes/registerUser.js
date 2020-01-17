// import User from "../sequelize.js"
var User = require('../sequelize');
var bcrypt = require('bcrypt');
var prometheus = require('../prometheus');

var randomstring = require("randomstring");

const BCRYPT_SALT_ROUNDS = 12;

module.exports = (app) => {
    app.post('/registerUser', (req, res) => {
        // console.log("i am here");
        // const  data = {
        //     first_name: randomstring.generate(6),
        //     last_name: randomstring.generate(4),
        //     email: randomstring.generate(10),
        //     username: randomstring.generate(4),
        //     password: randomstring.generate(10)
        // };
        const  data = {
            first_name: req.body.fname,
            last_name: req.body.lname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };
        if(data.password === "" || data.username === "") {
            res.json('em[ty fileds');
        }
        prometheus.dbReqCounters('findOne');
        User.findOne({
            where: {
                username: data.username
            }
        })
            .then(user => {
                if(user != null) {
                    console.log('alredy threre');
                    res.json('already therer');
                }
                else {
                    bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS)
                        .then((hashedPassword) => {
                            console.log(hashedPassword);
                            prometheus.dbReqCounters('create');
                            User.create({
                                first_name: data.first_name,
                                last_name: data.last_name,
                                email: data.email,
                                username: data.username,
                                password: hashedPassword
                            })
                        })
                        .then(()=> {
                            console.log('created');
                            res.json('created');
                        })
                }
            })
            .catch(err => {
                console.log("something went wrong");
                res.status(500).json(err);
            })
    })
    app.get('/registerUser', (req, res) => {
        // console.log("i am here");
        const  data = {
            first_name: randomstring.generate(6),
            last_name: randomstring.generate(4),
            email: randomstring.generate(10),
            username: randomstring.generate(4),
            password: randomstring.generate(10)
        };
        if(data.password === "" || data.username === "") {
            res.json('em[ty fileds');
        }
        prometheus.dbReqCounters('findOne');
        User.findOne({
            where: {
                username: data.username
            }
        })
            .then(user => {
                if(user != null) {
                    console.log('alredy threre');
                    res.json('already therer');
                }
                else {
                    bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS)
                        .then((hashedPassword) => {
                            console.log(hashedPassword);
                            prometheus.dbReqCounters('create');
                            User.create({
                                first_name: data.first_name,
                                last_name: data.last_name,
                                email: data.email,
                                username: data.username,
                                password: hashedPassword
                            })
                        })
                        .then(()=> {
                            console.log('created');
                            res.json('created');
                        })
                }
            })
            .catch(err => {
                console.log("something went wrong");
                res.status(500).json(err);
            })
    });
    app.get('/searchUserById', (req, res) => {
        const key = req.body.key;
        prometheus.dbReqCounters('findOne');
        User.findOne({
            where: {
                id : key
            }
        })
            .then(user => {
                if(user == null) {
                    res.json({data: "Not Found"});
                }
                else {
                    res.json(user.dataValues);
                }
            })
            .catch(err => {
                console.log("something went wrong");
                res.status(500).json(err);
            })
    });
    app.get('/searchUserByUsername', (req, res) => {
        const key = req.body.key;
        prometheus.dbReqCounters('findOne');
        User.findOne({
            where: {
                username : key
            }
        })
            .then(user => {
                if(user == null) {
                    res.json({data: "Not Found"});
                }
                else {
                    res.json(user.dataValues);
                }
            })
            .catch(err => {
                console.log("something went wrong");
                res.status(500).json(err);
            })
    });
    app.post('/multipleRegisterUser', (req, res) => {
        var error = 0;
        req.body.forEach((newUser) => {
            const data = {
                first_name: newUser.fname,
                last_name: newUser.lname,
                email: newUser.email,
                username: newUser.username,
                password: newUser.password
            };
            prometheus.dbReqCounters('findOne');
            User.findOne({
                where: {
                    username: data.username
                }
            })
                .then(user=> {
                    bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS)
                        .then((hashedPassword) => {
                            console.log(hashedPassword);
                            prometheus.dbReqCounters('create');
                            User.create({
                                first_name: data.first_name,
                                last_name: data.last_name,
                                email: data.email,
                                username: data.username,
                                password: hashedPassword
                            })
                        })
                        .then(()=> {
                            console.log('created');
                        })
                })
                .catch(err => {
                    console.log("something went wrong");
                    res.status(400).json("NOT-OK");
                })
        });
        res.status(200).json("OK");
    });

    // app.post('/multipleRegisterUser', (req, res) => {
    //     var error = 0;
    //     for(var i =0;i<req.body.length;i++) {
    //         var newUser = req.body[i];
    //         if(error != 0) {
    //             break;
    //         }
    //         const  data = {
    //             first_name: newUser.fname,
    //             last_name: newUser.lname,
    //             email: newUser.email,
    //             username: newUser.username,
    //             password: newUser.password
    //         };
    //         if(data.password === "" || data.username === "") {
    //             error = 1;
    //             break;
    //         }
    //         prometheus.dbReqCounters('findOne');
    //         User.findOne({
    //             where: {
    //                 username: data.username
    //             }
    //         })
    //             .then(user =>{
    //                 if(user != null) {
    //                     console.log('alredy threre');
    //                     error = 2;
    //                 }
    //                 else {
    //                     bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS)
    //                         .then((hashedPassword) => {
    //                             console.log(hashedPassword);
    //                             prometheus.dbReqCounters('create');
    //                             User.create({
    //                                 first_name: data.first_name,
    //                                 last_name: data.last_name,
    //                                 email: data.email,
    //                                 username: data.username,
    //                                 password: hashedPassword
    //                             })
    //                         })
    //                         .then(()=> {
    //                             console.log('created');
    //                         })
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log("something went wrong");
    //                 error = 3;
    //             })
    //     }
    //     if(error != 0) {
    //         if(error === 1) {
    //             res.status(400).json("No username/password provided");
    //         }
    //         if(error === 2) {
    //             res.status(400).json("Alreday there");
    //         }
    //         else {
    //             res.status(500).json("something went wrong");
    //         }
    //     }
    //     else {
    //         res.status(200).json("OK");
    //     }
    // });

};