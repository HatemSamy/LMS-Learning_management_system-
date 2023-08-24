import { Router } from "express";
import * as StudentController from "./controller/Student.controller.js"
import * as validators from "./student.validation.js"
import { auth } from "../../middleware/auth.js";
import { AccessRoles } from "../../middleware/ValidationRole.js";
import validation from "../../middleware/validationFunction.js";

const router= Router()

 //UPdate  Student Profile

router.put("/",(validation(validators.UpdateStudentPofile)),auth(AccessRoles.StudentRole),StudentController.UpdateStudentProfile)

//UPdate  Student Profile

router.put("/:id",validation(validators.UpdateStudentData),auth(AccessRoles.AdminRole),StudentController.UpdateStudentData)
// Get All Students
router.get("/",validation(validators.GetStudents),auth(AccessRoles.AdminRole),StudentController.GetStudent)
// Get  Student Profile
router.get("/profile",auth(AccessRoles.StudentRole),StudentController.GetStudentProfile)

// Get  Student ById
router.get("/singleUser/:id",validation(validators.GetStudentById),auth(AccessRoles.AdminRole),StudentController.GetStudentById)



router.post("/promoting/:id",auth(AccessRoles.AdminRole),StudentController.promotingStudent)

export default router