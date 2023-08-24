import { Router } from "express";
import  * as authController from "../Auth/controller/authentication.js"
import validation from "../../middleware/validationFunction.js";
import * as validators from "./auth.validation.js"
import { auth } from "../../middleware/auth.js";
import { AccessRoles } from "../../middleware/ValidationRole.js";
const router=Router()
router.post("/AdminRegister",validation(validators.AdminRegister),authController.Adminregister)

router.post("/register",validation(validators.Register),auth(AccessRoles.AdminRole),authController.UserRegister)

router.post("/login",validation(validators.login),authController.login)

router.get("/confirmEmail/:token",validation(validators.confirmEmail),authController.confirmEmail)

router.get("/refreshtoken/:token",validation(validators.refreshtoken),authController.refreshtoken)

















export default router