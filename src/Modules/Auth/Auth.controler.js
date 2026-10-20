import bcrypt from "bcrypt";
import { RolesTypes } from "../../DB/Models/User.model.js";
import { UserModel } from "../../DB/Models/User.model.js";
import cryptjs from "crypto-js"
import jwt from "jsonwebtoken";
import { Subjects } from "../../Servies/Sendingemail.js";
import { SendEmail } from "../../Servies/Sendingemail.js";
import { signUP_Temp } from "../../Servies/templete.js";
   
   // Register //

const register =  async(req,res,next)=>{
    try {
        const{name,email,password,confirmpassword,phone,gender,role} = req.body;

        // check email //

        const emailCheck = await UserModel.findOne({
            email
        });
        if(emailCheck){
            return next(new Error("email is already exist,choose another email "))
        }
        // Check Password //

        if(password !== confirmpassword){
            return next(new Error("Password doesnt match the confirm password"))

        }

        // register //

        const hshedPassword = bcrypt.hashSync(password,+process.env.SALT_ROUNDS);


        const EncryptPhone = cryptjs.AES.encrypt(phone,process.env.PHONE_KEY).toString()
        const user = await UserModel.create({
            name,
            email,
            password:hshedPassword,
            phone:EncryptPhone,
            gender,
            role 
        })

        /// Send Emaill ///

         const token = jwt.sign({email},"EmailKey")
         const link = `http://localhost:1000/auth/activate_Acc/${token}`
         await SendEmail({
             to:email,
             subject:Subjects.Register,
           // text:
           html:signUP_Temp(name,link)
         })
        res.json({message:"Registered Succesfully",user})
     } catch (error) {
         return next(error)
     }
}

// Login //
const login = async(req,res,next)=>{
        try {
        const{email,password} = req.body;

        // check email //

        const User = await UserModel.findOne({
            email
        });
        if(!User){
            return next(new Error("Invailed Credinality v1"))
        }

        
        // Check Password // 
        if(User.confirmEmail==false){
            return next(new Error("please activate your account first"))
        }
        const passwordMatch = bcrypt.compareSync(password,User.password);
        if( ! passwordMatch){
            return next(new Error("Invailed login v2"))
        }

        
        // Generate Token //
        
        const token = jwt.sign({id:User._id},User.role==RolesTypes.USER?process.env.USER_KEY:process.env.ADMIN_KEY,{expiresIn:"1d"})
        User.token.push(token);
        await User.save();   


       res.json({message:"user login Succesfully",token})

    } catch (error) {
       return next(error)
    }

}

const activate_Acc = async(req,res,next)=>{
    try {
        const{token}=req.params;
        const{email}=jwt.verify(token,"EmailKey")
        const user=await UserModel.findOne({email})
        if(!user){
            return next(new Error("user notfoundd to activate Account"))
        }
        user.confirmEmail=true;
       await user.save();
       res.json({message:"Account Activate Succesfully"})
    } catch (error) {
         return next(error)
    }
}



export{
    register,
    login,
    activate_Acc
}