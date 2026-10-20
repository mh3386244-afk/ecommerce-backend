import mongoose, { Schema } from "mongoose";
export const RolesTypes = {
    ADMIN: "admin",
    USER: "user"
};
export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be atleast 3 characters length"],
      maxlength: [30, "Name must be atmost 30 characters length"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: [8, "Password Must be atleast 8 characters length"],
    },
    confirmpassword:{
      type: String,
     // required: true
    },

    gender: {
      type: String,
      enum: {
        values: ["male", "female", "not specified"],
        default: "not specified",
      },
    },

    confirmEmail: {
      type: Boolean,
      default: false,
    },

    address: [String],

    phone: String,

    role:{
      type:String,
      enum:{
         values: Object.values(RolesTypes),
         message:"role must be user or admin "
      },
      default:RolesTypes.USER
    },
    token:[String],
    image:{
      secure_url:{
        type:String,
        required:true
      },
      public_id:{
        type:String,
        required:true
      }
    }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);