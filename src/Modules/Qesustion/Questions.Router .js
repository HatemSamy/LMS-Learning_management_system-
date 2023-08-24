import { Router } from "express";
import * as QuestionController from "./controller/QuestionController.js"
import { auth } from "../../middleware/auth.js";
import { AccessRoles } from "../../middleware/ValidationRole.js";
import * as validators from "./Question.Validation.js"
import validation from "../../middleware/validationFunction.js";
const router= Router()


//Question routers
router.post("/:id",validation(validators.createQuestioon),auth(AccessRoles.TeacherRole),QuestionController.CraeteQuestion)

router.get("/",auth(AccessRoles.TeacherRole),QuestionController.GetQuestions)

router.get("/:id",validation(validators.GetQuestionById),auth(AccessRoles.TeacherRole),QuestionController.GetSingleQuestion)

router.put("/:id",validation(validators.UpdateQuestion),auth(AccessRoles.TeacherRole),QuestionController.UpdateQuestion)

router.delete("/:id",auth(AccessRoles.TeacherRole),QuestionController.DeleteQuestion)



export default router