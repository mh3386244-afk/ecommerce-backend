import mongoose from "mongoose";

export const DBconnection =async()=>{
    return await mongoose.connect(process.env.CONNECTION) 
    .then(()=>{
        console.log("Dbconnection Succeffuly");
    })
    .catch((err)=>{
        console.log("Failed connection",err);
        
    })
}