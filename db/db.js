const mongoose = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const connection = mongoose.connect('mongodb+srv://sshivamgupta833:KuA-GF8kd7ps7aJ@cluster0.j7ombhi.mongodb.net/todo-app')

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