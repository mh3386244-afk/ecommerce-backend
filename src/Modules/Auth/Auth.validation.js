import joi from "joi"
export const registerSchema = joi.object({

name:joi.string().required().min(3).max(30),
email:joi.string().required().email({tlds:[".com",".net"]}).pattern( /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
password:joi.string().required().min(8),
confirmpassword:joi.string().required().valid(joi.ref("password")),
phone:joi.string(),
gender:joi.string().valid("male","female"),
role: joi.string().valid("user", "admin").default("user")
}).required()


export const loginSchema = joi.object({
email:joi.string().required().email({tlds:[".com",".net"]}).pattern( /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
password:joi.string().required().min(8),
}).required()
