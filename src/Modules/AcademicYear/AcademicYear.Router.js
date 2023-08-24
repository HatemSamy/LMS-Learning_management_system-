import { Router } from "express";
import * as AcademicYearController from "./controller/AcademicYearController.js"
import { auth } from "../../middleware/auth.js";
import { AccessRoles } from "../../middleware/ValidationRole.js";
import validation from "../../middleware/validationFunction.js";
import * as validators from "./AcademicYear.validation.js";
const router= Router()


//AcademicYear
router.post("/",validation(validators.CraetAcademicYear) ,auth(AccessRoles.AdminRole),AcademicYearController.CraeteAcademicYear)
router.get("/",auth(AccessRoles.AdminRole),AcademicYearController.GetAcademicYears)
router.get("/:id",validation(validators.GetAcademicYearById) ,auth(AccessRoles.AdminRole),AcademicYearController.GetSingleAcademicYear)
router.put("/:id",validation(validators.updateAcademicYear) ,auth(AccessRoles.AdminRole),AcademicYearController.UpdateAcademicYear)
router.delete("/:id",auth(AccessRoles.AdminRole),AcademicYearController.DeleteAcademicYear)


//AcademicYear
// router.post("/",AcademicYearController.)






export default router