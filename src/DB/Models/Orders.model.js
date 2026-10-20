import mongoose, { Schema } from "mongoose";
const OrderSchema = new Schema({
    

},    
    {timestamps:true})



    const OrderModel = mongoose.model("Order",OrderSchema);