import { Schema } from "mongoose";
const brandsSchema = new Schema({
    name: {
      type: [String,"Name Must be String"],
      required: [true,"Name Must be listed"],
      trim: true,
      unique:true,
      minlength: [2, "Name must be atleast 2 characters length"],
    },
    slug:{
        type:String,
        lowercase:true
    },
    logo:{
        secure_url:{
        type:String,
        required:true
      },
      public_id:{
        type:String,
        required:true
      }
    },
    brandsId:{
        type:Schema.ObjectId,
        ref:"subcategory"
    }

},    
    {timestamps:true})



    const brandModel = mongoose.model("brand",brandsSchema);