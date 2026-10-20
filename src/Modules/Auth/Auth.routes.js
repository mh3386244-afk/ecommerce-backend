import { Router } from "express";
import * as UC from './Auth.controler.js'
import * as AuthMiddle from "../Auth/Auth.validation.js"
import { validationMiddle } from "../../MiddleWare/validation.middle.js";
const router = Router();

router.post("/register",validationMiddle(AuthMiddle.registerSchema),UC.register)
router.post("/login",UC.login)
router.get("/activate_Acc/:token",UC.activate_Acc)

export default router