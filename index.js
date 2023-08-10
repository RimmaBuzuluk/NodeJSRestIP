import express from "express";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

mongoose.connect('mongodb+srv://admin:18102000@cluster0.o8jtjes.mongodb.net/?retryWrites=true&w=majority').then(()=>console.log('db ok'))
.catch((err)=>console.log('db error',err))

const app =express();

app.use(express.json())

app.get('/',(req, res)=>{
    res.send('hello world')
})

app.post('/auth/login',(req,res)=>{
    console.log(req.body)

    const token=jwt.sign({
        email:req.body.email,
        fullName:"Rymma Buzuluk"
    },
    'secret123',
    )
    res.json({
        success:true,
        token,
    });
})

app.listen(4444, (err)=>{
    if(err){
        return console.log(err)
    }
    console.log('server ok')
}) ;