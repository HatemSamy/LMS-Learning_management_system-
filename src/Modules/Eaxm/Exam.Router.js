import { Router } from "express";
import * as ExamControler from "./controller/ExamController.js"
import { auth } from "../../middleware/auth.js";
import ResualtRouter from "../Result/Result.Router.js"
import { AccessRoles } from "../../middleware/ValidationRole.js";
import validation from "../../middleware/validationFunction.js";
import * as Validators from "./Exam.validation.js";
const router = Router()

router.use("/:examId/Result",ResualtRouter)  // internal navigate
//Exam routers
router.post("/", validation(Validators.CraetExam),auth(AccessRoles.TeacherRole), ExamControler.CraetExam)
// fetched Exams
router.get("/", auth(AccessRoles.AdminRole), ExamControler.GetExams)
// fetched  spacefic Exam
router.get("/spaceficExam/:id",validation(Validators.GetExamById) ,auth(AccessRoles.AdminRole), ExamControler.GetExamById)
// update Exam by id
router.put("/:id", auth(AccessRoles.TeacherRole), ExamControler.UpdateExam)
// Student get and write exam
router.post("/write/:id",validation(Validators.writeExam),auth(AccessRoles.StudentRole),ExamControler.WriteExam)
// Delete Exam
router.delete("/:id", auth(AccessRoles.MultipleRole), ExamControler.DeleteExam)








export default router