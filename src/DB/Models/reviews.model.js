import { Schema } from "mongoose";
const reviewsSchema = new Schema({
    

},    
    {timestamps:true})



    const reviewModel = mongoose.model("review",reviewsSchema);