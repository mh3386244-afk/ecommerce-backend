import mongoose,{ Schema } from "mongoose";
export const ProductSchema = new Schema({
    tittle:{
        type:String,
        required:true,
    },
    price:{
        type:Intger,
        
    }

},    
    {timestamps:true})




    const ProductModel = mongoose.model("Product",ProductSchema);