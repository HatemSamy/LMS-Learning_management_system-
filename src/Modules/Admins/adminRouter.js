import { Router } from "express";
import * as AdminController from "./controller/Admin.controller.js"
import { auth } from "../../middleware/auth.js";
import { AccessRoles } from "../../middleware/ValidationRole.js";
import validation from "../../middleware/validationFunction.js";
const router= Router()
import * as validators from "./admin.validation.js"




//update Amin
router.put("/",validation(validators.UpdateAdminPrifile),auth(AccessRoles.GetAmin),AdminController.UpdateAdminProfile)

//Get All admin
router.get("/",auth(AccessRoles.GetAmin),AdminController.AdminsList)

// Get  AdminProfile
router.get("/profile",auth(AccessRoles.GetAmin),AdminController.AdminProfile)


export default router