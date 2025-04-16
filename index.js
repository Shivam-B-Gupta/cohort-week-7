const express = require('express');
const {UserModel, TodoModel} = require('./db/db');
const jwt = require('jsonwebtoken');
const jwt_secret = "123456789" 
const bcrypt = require('bcryptjs')

const app = express();
app.use(express.json());

app.post('/signup', async function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    let errorThrown = false;
    try{

        const hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword);
        
        await UserModel.create({
            email: email,
            password: hashedPassword,
            username: username
        })
        console.log("Created user:");
    }
    catch(e){
        res.json({
            message: "user already exists"
        })
        errorThrown = true;
    }
    if(!errorThrown){

        res.json({
            mssg: "you are logged in"
        });
    }
})

app.post('/signin', async function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
    })

    if(!user){
        res.status(403).json({
            message: "user not found in the db"
        })
        return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if(passwordMatch){
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