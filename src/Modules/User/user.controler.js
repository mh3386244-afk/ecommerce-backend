import cryptjs from "crypto-js";
import cloudinary from "../../Servies/Ccloud.config.js";
import { UserModel } from "../../DB/Models/User.model.js";
const get_user_profile = async(req,res,next)=>{
    try {
       
       //Decrypt phone //
        const{user}=req;
         user.phone=cryptjs.AES.decrypt(user.phone,process.env.PHONE_KEY).toString(
            cryptjs.enc.Utf8
        )
       res.json({message:"User profile exist",data:user})
        
        
    } catch (error) {
        return next(error)
    }
}


const Upload_Profile_Picture = async(req,res,next)=>{
    try {
        //const result =  await cloudinary.uploader.upload(req.file.path);

        const{_id}=req.params;
        const user =await UserModel.findById({_id});
        if(!user){
            return next(new Error("User Delete Account "))
        } 

        const{secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
            folder:`Ecomerce_cicle5/${_id}/profile_pictures`,
            overwrite:true
        });

        user.image={
            secure_url,
            public_id
        }

        await user.save()
        res.json({message:"Profile picture Uploaded Successfuly",user})
    } catch (error) {
        return next(error)
    }
}


export{
    get_user_profile,
    Upload_Profile_Picture
}