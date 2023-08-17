import express from "express";
import mongoose from "mongoose";

import {registerValidation, loginValidation, postCreateValidation} from "./validations.js"

import checkAuth from './utils/checkAuth.js'

import * as UserController from './controllers/UserControllers.js'
import * as PostController from './controllers/PostController.js'


mongoose.connect('mongodb+srv://admin:18102000@cluster0.o8jtjes.mongodb.net/blog?retryWrites=true&w=majority').then(() => {
    console.log('DB ok');
}).catch((err) => {
    console.error('DB error', err);
});

const app =express();

app.use(express.json())

app.post('/auth/login', loginValidation,UserController.login);
app.post('/auth/register',registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)


app.get('/posts', PostController.getAll);
app.post('/posts', checkAuth, postCreateValidation,PostController.create);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id',checkAuth, PostController.remove);


app.listen(4444, (err)=>{
    if(err){
        return console.log(err)
    }
    console.log('server ok')
}) ;