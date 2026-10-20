import multer from "multer";
import { customAlphabet } from "nanoid";
import path from "path"
const nanoid = customAlphabet("abcde12345678910",5)

 export const AllowedExtensions = {
        Images:["image/png","image/jpeg","image/avif"],
        Files:["application/pdf"],
        Video:["video/mp4"]
    }

export const multerFunction = (AllowedExtensionsArr)=>{

    // Storage //
    const storage = multer.diskStorage({
        /**
         * destination
         * File Name 
         */

        destination:function(req,file,cb){
            const fullpath = path.resolve("Media")  
            cb(null,fullpath)
        },
        filename:function(req,file,cb){
            const Uniquename = nanoid()+file.originalname;
            cb(null,Uniquename)
        }
    })

    const Filefilter =function (req,file,cb){
        if(AllowedExtensionsArr.includes(file.mimetype)){
            return cb(null,true)
        }
        cb(new Error("Invailed Extention"),false)
    }


    const FileUpload =  multer({fileFilter:Filefilter,storage})
    return FileUpload;

}