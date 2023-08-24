import { Router } from "express";
import * as programController from "./controller/programController.js"
import { auth } from "../../middleware/auth.js";
import { AccessRoles } from "../../middleware/ValidationRole.js";
import * as validators from "./program.validation.js"
import validation from "../../middleware/validationFunction.js";
const router= Router()


//Program Routers
router.post("/",validation(validators.CreateProgram),auth(AccessRoles.AdminRole),programController.Craeteprogram)
router.get("/",auth(AccessRoles.AdminRole),programController.Getprograms)
router.get("/:id",validation(validators.GetProgramById),auth(AccessRoles.AdminRole),programController.GetSingleprogram)
router.put("/:id",validation(validators.updateProgram),auth(AccessRoles.AdminRole),programController.Updateprogram)
router.delete("/:id",auth(AccessRoles.AdminRole),programController.DeleteProgram)

export default router