import { Router } from "express";
import * as SubjectController from "./controller/SubjectController.js"
import { auth } from "../../middleware/auth.js";
import { AccessRoles } from "../../middleware/ValidationRole.js";
import * as validators from "./subject.validation.js"
import validation from "../../middleware/validationFunction.js";
const router= Router()


//Subject routers
router.post("/:id",validation(validators.Createsubject),auth(AccessRoles.AdminRole),SubjectController.Craetesubject)
router.get("/",auth(AccessRoles.AdminRole),SubjectController.Getsubjecs)
router.get("/subjectById/:id",validation(validators.GetSubjectById),auth(AccessRoles.AdminRole),SubjectController.GetSinglesubject)
router.put("/:id",validation(validators.updateSubject),auth(AccessRoles.AdminRole),SubjectController.Updatesubject)
router.delete("/:id",auth(AccessRoles.AdminRole),SubjectController.Deletesubject)









export default router