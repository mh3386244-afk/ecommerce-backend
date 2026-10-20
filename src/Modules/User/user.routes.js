import { Router } from "express";
import * as UC from "./user.controler.js"
import { Authntication } from "../../MiddleWare/Authntication.midle.js";
import { Authrization } from "../../MiddleWare/Authrization.middle.js";
import { AllowedExtensions, multerFunction } from "../../Servies/MulterLocally.js";
import { RolesTypes } from "../../DB/Models/User.model.js";
import { MulterWithCloudinary } from "../../Servies/multercloudnary.js";
const router = Router();



router.post("/profile",Authntication,Authrization([RolesTypes.USER]),multerFunction(AllowedExtensions.Files).single("profile"),UC.get_user_profile)    

router.post("/upload/:_id",MulterWithCloudinary().single("image"),UC.Upload_Profile_Picture)



export default router ;




