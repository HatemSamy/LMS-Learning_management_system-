import { Router } from "express";
import * as ClassLevelControler from "./Controller/ClassLevelController.js"
import { auth } from "../../middleware/auth.js";
import { AccessRoles } from "../../middleware/ValidationRole.js";
import validation from "../../middleware/validationFunction.js";
import * as Validators from "./ClassLevel.validation.js";

const router= Router()
// ClassLevelRoutes
router.post("/",validation(Validators.CraetClassLevel),auth(AccessRoles.AdminRole),ClassLevelControler.CraeteClassLevel)

router.get("/",auth(AccessRoles.AdminRole),ClassLevelControler.GetAcademicClassLevels)

router.get("/:id",validation(Validators.GetClassLevelById),auth(AccessRoles.AdminRole),ClassLevelControler.GetSingleAcademicClassLevel)

router.put("/:id",validation(Validators.updateClassLevel),auth(AccessRoles.AdminRole),ClassLevelControler.UpdateAcademicClassLevel)

router.delete("/:id",auth(AccessRoles.AdminRole),ClassLevelControler.DeleteAcademicTerm)


export default router