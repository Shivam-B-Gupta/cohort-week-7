const express = require('express');
const {UserModel, TodoModel} = require('./db/db');
const jwt = require('jsonwebtoken');
const jwt_secret = "123456789" 

const app = express();
app.use(express.json());

app.post('/signup', async function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    await UserModel.create({
        email: email,
        password: password,
        username: username
    })
    console.log("Created user:");

    res.json({
        mssg: "you are logged in"
    })
})

app.post('/signin', async function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const user = UserModel.findOne({
        email: email,
        password: password
    })

    if(user){
        const token = jwt.sign({
            id: user._id
        }, jwt_secret);
        res.json({
            token: token
        })
    }
    else{
        res.status(403).json({
            mssg: "Error while signing in"
        })
    }
})

app.listen(4000);