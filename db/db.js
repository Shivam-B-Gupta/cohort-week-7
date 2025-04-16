const mongoose = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const connection = mongoose.connect('mongodb+srv://sshivamgupta33:BXpskq8o1dOycdT0@cluster0.j7ombhi.mongodb.net/todo-app'
    // {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     tlsAllowInvalidCertificates: true,
    //     serverSelectionTimeoutMS: 10000,
    //     ssl: true
    //   }
)

const User = new Schema({
    email : {type: String, unique: true},
    password : String,
    username : String
})

const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId
})

const UserModel = mongoose.model('user', User);
const TodoModel = mongoose.model('todo', Todo);

module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}