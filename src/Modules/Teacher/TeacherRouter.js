import { Router } from "express";
import * as TeacherController from "./controller/Teacher.controller.js"
import { auth } from "../../middleware/auth.js";
import { AccessRoles } from "../../middleware/ValidationRole.js";
import validation from "../../middleware/validationFunction.js";
import * as validators from './Teacher.validation.js'
const router= Router()




//update Amin
router.put("/:id",validation(validators.UpdateTeacherPofile),auth(AccessRoles.TeacherRole),TeacherController.UpdateTeacherProfile)

// //UPdate TeacherBY Admin

router.put("/Admin/:id",validation(validators.assiginTeacherRole),auth(AccessRoles.AdminRole),TeacherController.assigningTeacherRole)


//Get All Teachers
router.get("/",validation(validators.GetTeachers),auth(AccessRoles.AdminRole),TeacherController.GetTeacher)
// Get  Teacher ById
router.get("/profile",validation(validators.getTeacherPofile),auth(AccessRoles.TeacherRole),TeacherController.GetTeacherProfile)

// Get  Teacher ById
router.get("/:id",auth(AccessRoles.AdminRole),TeacherController.GetTeacherById)



export default router