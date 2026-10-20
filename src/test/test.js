import joi from "joi"
import { Schema } from "mongoose"
const user ={
    name:"ali",
    email:"alijj@gmail.com",
    age:25,
    password:"12512",
    confirmpassword:"12512"
}

// 2- SChema

const schema = joioi.object({
    name:joi.string().required().min(3).max(30),
    email:joi.string().required().email({tlds:[".com",".net"]}).pattern( /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    age:joi.number().min(20).max(50),
    password:joi.string().required().min(8),
    confirmpassword:joi.string().required().valid(joi.ref("password"))
}).required()

// 3- Compare Date From Schema

const result = schema.validate(user,{abortEarly:false});
console.log(result);
