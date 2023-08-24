import express from 'express'
import authRouter from "./src/Modules/Auth/auth.router.js"
import  AdminRouter from "./src/Modules/Admins/adminRouter.js"
import  AcademicYearRouter from "././src/Modules/AcademicYear/AcademicYear.Router.js"
import  AcademicTermRouter from "./src/Modules/AcademicTerm/Academicterm.Router.js"
import  ClassLevelRouter from "./src/Modules/ClassLevel/ClassLevel.Router.js"
import  ProgramRouter from "./src/Modules/program/program.Router.js"
import  SubjectRouter from "./src/Modules/Subject/subject.Router.js"
import  YearGroupRouter from "./src/Modules//YearGroub/YearGroup.Router.js"
import  TeacherRouter from "./src/Modules/Teacher/TeacherRouter.js"
import  ExamRouter from "./src/Modules/Eaxm/Exam.Router.js"
import  StudentRouter from "./src/Modules/Student/StudentRouter.js"
import  QuestionRouter from "./src/Modules/Qesustion/Questions.Router .js"
import  ResultRouter from "./src/Modules/Result/Result.Router.js"
import { NotFoundError, globalErrorHandling } from "./src/middleware/erroeHandling.js"
import connectDB from "./config/DB/connection.js"


 const AppRouter= (app)=>{

 //convert Buffer Data
 app.use(express.json())
 app.use(express.urlencoded({ extended: false }))


 app.get("/",(req,res)=>{

    res.send('<h1> School Management System Home page</h1>')
})
 const baseUrl = process.env.BASEURL
//Setup API Routing 
app.use(`${baseUrl}/Admins`, AdminRouter)
app.use(`${baseUrl}/AcademicYear/`, AcademicYearRouter)
app.use(`${baseUrl}/AcademicTerm/`, AcademicTermRouter)
app.use(`${baseUrl}/ClassLevel/`, ClassLevelRouter)
app.use(`${baseUrl}/Program/`, ProgramRouter)
app.use(`${baseUrl}/Subject/`, SubjectRouter)
app.use(`${baseUrl}/YearGroup/`, YearGroupRouter)
app.use(`${baseUrl}/Teacher/`, TeacherRouter)
app.use(`${baseUrl}/Exam/`, ExamRouter)
app.use(`${baseUrl}/Student/`, StudentRouter)
app.use(`${baseUrl}/Question/`, QuestionRouter)
app.use(`${baseUrl}/Resualt/`, ResultRouter)
app.use(`${baseUrl}/auth/`, authRouter)

app.use('*', (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method")
})


connectDB()
// not foundErrorHandling
app.use(NotFoundError)
// Handling Error
app.use(globalErrorHandling)
}




export default AppRouter





