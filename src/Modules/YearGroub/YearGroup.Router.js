import { Router } from "express";
import * as YearGroupController from "./controller/YearGroupController.js"
import { auth } from "../../middleware/auth.js";
import { AccessRoles } from "../../middleware/ValidationRole.js";
import validation from "../../middleware/validationFunction.js"
import * as validators from "./YearGroub.Validation.js"
const router = Router()


//Year Group routers
router.post("/:id", validation(validators.CraeteYearGroub), auth(AccessRoles.AdminRole), YearGroupController.CraeteYearGroup)
router.get("/", auth(AccessRoles.AdminRole), YearGroupController.GetYearGroup)
router.get("/:id", validation(validators.GetYearGroub), auth(AccessRoles.AdminRole), YearGroupController.GetSingleYearGroup)
router.put("/:id", validation(validators.UpdatreYaerGroub), auth(AccessRoles.AdminRole), YearGroupController.UpdateYearGroup)
router.delete("/:id", auth(AccessRoles.AdminRole), YearGroupController.DeleteYearGroup)








export default router