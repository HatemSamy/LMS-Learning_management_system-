import { Router } from "express";
import * as AcademictermControler from "./controller/AcademictermController.js"
import { auth } from "../../middleware/auth.js";
import { AccessRoles } from "../../middleware/ValidationRole.js";
import validation from "../../middleware/validationFunction.js";
import * as validators from "./AcademicTerm.validation.js";
const router= Router()


//AcademicTerm routers
router.post("/",validation(validators.CraetAcademicTerm),auth(AccessRoles.AdminRole),AcademictermControler.CraeteAcademicTerm)
router.get("/",auth(AccessRoles.AdminRole),AcademictermControler.GetAcademicTerms)
router.get("/:id",validation(validators.GetAcademicTermById),auth(AccessRoles.AdminRole),AcademictermControler.GetSingleAcademicTerm)
router.put("/:id",validation(validators.updateAcademicTerm),auth(AccessRoles.AdminRole),AcademictermControler.UpdateAcademicterm)
router.delete("/:id",auth(AccessRoles.AdminRole),AcademictermControler.DeleteAcademicTerm)



export default router