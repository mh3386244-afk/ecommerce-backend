import jwt from "jsonwebtoken";
import { RolesTypes } from "../DB/Models/User.model.js";
import { UserModel } from "../DB/Models/User.model.js";
export const Authntication=async(req,res,next)=>{
    const{x} = req.headers;
    const[Bearer,token] = x.split(" ")
    let token_signature = undefined
    try {
         
         switch(Bearer){
            case 'user':
                token_signature = process.env.USER_KEY
                break;
            case 'admin':
                token_signature = process.env.ADMIN_KEY
                break;
            default:
                break;

         }
         // Verify Token // 
        
        const {id} =jwt.verify(token,token_signature);
            const userrr = await UserModel.findById(id)
        if(!userrr){
        return next(new Error("User not found"))
        }
        req.user=userrr;
        return next();
    }
    catch (error) {
        if(error.name== "TokenExpiredError" && error.message=="jwt expired"){
            const finduser = await UserModel.findOne({token});
            if(!finduser){
                 return next(new Error("user dosent exist to generate refresh token"))
            }
            // Create refresh token //
            const refreshtoken = jwt.sign({id:finduser._id},finduser.role==RolesTypes.USER?process.env.USER_KEY:process.env.ADMIN_KEY,{expiresIn:"1w"})
            finduser.token.push(refreshtoken);
            await finduser.save()
             return res.json({message:"Refreshtoken succesfully",refreshtoken})
        }
                                                                                                              
        return next(error)
    }
} 