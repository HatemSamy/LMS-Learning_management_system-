import AsyndHandler from "express-async-handler"
import TeacherModel from "../../../../config/DB/model/staff/teacherModel.model.js"
import studentModel from "../../../../config/DB/model/Academic/StudentModel.model.js"
import ExamResultModel from "../../../../config/DB/model/Academic/ExamResualt.model.js"
import ExamModel from "../../../../config/DB/model/Academic/Exams.model.js"

export const CraetExam = AsyndHandler(async (req, res, next) => {

    const { 
        Name,
        duration,
        description,
        examDate,
        examTime,
        examType,
        academicTermId,
        AcademicYearId,
        program,
        classLevel,
        subjectId
    } = req.body
    // check Teacher found
    const Teacher= await TeacherModel.findById(req.user._id)
    if (!Teacher) {
        next(new Error("Teacher not found"))
    }else{
        const Exam= await ExamModel.findOne({Name})
        if (Exam) {
            next(new Error("Exam  aready exist"))
        }else{
            req.body.Createdby=req.user._id
            const NewExam= await ExamModel.create(req.body)
            await Teacher.exams.push(NewExam)
            Teacher.save()
       
           res.status(200).json({ message: "Academic Term Add", NewExam })
       
        }
      
    }

    
})

export const GetExams = AsyndHandler(async (req, res, next) => {

    const Exams = await ExamModel.find({}).populate(
        {
            path:"Questions",
            select:"-correctAnswer -Incorrect -updatedAt -createdAt",
            populate:{ 
                path:"CreatedBy",
                select:"Name",
            }
        },
            
    ).select(" Name duration Questions ")
    if (!Exams) {
        next(new Error("not found Exams "))
    } else {

        res.status(200).json({ message: "This is Exams ", Exams })

    }

})

export const GetExamById = AsyndHandler(async (req, res, next) => {


    const Exam = await ExamModel.findById(req.params.id)
    if (!Exam) {
        next(new Error(`not found Exam  with id: ${req.params.id}`))
    } else {

        res.status(200).json({ message: "This is Exam ", Exam })

    }

})

export const UpdateExam = AsyndHandler(async (req, res, next) => {

    const Exam = await ExamModel.findById(req.params.id)
    if (!Exam) {
        next(new Error(`not found Exam  with id: ${req.params.id}`))
    } else {

       const UpdateExam= await ExamModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
       res.status(200).json({ message: " Exam Updated ",UpdateExam })

    }

})


export const WriteExam = AsyndHandler(async (req, res, next) => {

    //  student found
    const StudentFound = await studentModel.findById(req.user._id)
    if (!StudentFound) {
        next(new Error("studen not found"))
        return;
    }
    if (StudentFound.IsSuspended || StudentFound.Iswitdrawn) {
        next(new Error("You can not take this exam you are IsSuspended  or Iswitdrawn"))
        return;
    }

    // Exam found
    const ExamFound = await ExamModel.findById(req.params.id).populate(
        "Questions",
    ).populate("academicTermId")
    console.log(ExamFound)


    if (!ExamFound) {
        next(new Error("exam not found"))
        return;
    }
    const questions = ExamFound.Questions
    console.log(ExamFound);
    //check if student take the examExamResultModel

    const examResualt = await ExamResultModel.findOne({ studentId: StudentFound._id, ExamId: ExamFound._id })
    if (examResualt) {
        next(new Error("You have aready tack this exam"))
        return;
    }

    //check if student answer All Questios
    const StudentAnswer = req.body.Answers
    if (questions.length != StudentAnswer.length) {
        next(new Error(" you have answer all questions"))
        return;
    }
    let correctAnswer = 0
    let WrongAnswer = 0
    let score = 0
    let AnsweredQuestions = 0
    let grade = 0
    let TotalQuestion = 0
    let status = ""
    let remark = ""

    // check  exam Answers
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i]
        if (question.correctAnswer === StudentAnswer[i]) {
            correctAnswer++
            score++
            question.Incorrect = true
        } else {

            WrongAnswer++

        }

    }
    /// Exam Report
    TotalQuestion = questions.length
    grade = (correctAnswer / TotalQuestion) * 100
    AnsweredQuestions = questions.map(question => {
        return {
            question: question.question,
            correctAnswer: question.correctAnswer,
            Incorrect: question.Incorrect
        }

    })

    // student status
    if (grade >= 50) {
        status = "passed"
    } else {
        status = "failed"
    }

    // remark
    if (grade >= 80) {
        remark = "Excellent"
    } else if (grade >= 70) {
        remark = "Very good"
    } else if (grade >= 60) {
        remark = "good"
    } else if (grade >= 50) {
        remark = "fair"
    } else {
        remark = "poor"
    }

    // // assgin resualt 
    const finalResualt = await ExamResultModel.create({

        ExamId: ExamFound._id,
        studentId: StudentFound._id,
        classLevelId: ExamFound.classLevel,
        AcademictermId: ExamFound.academicTermId,
        AcademicYearId: ExamFound.AcademicYearId,
        grade,
        score,
        remark,
        status,
        answerQesutions: AnsweredQuestions,

    })
    // push resualt to student
    StudentFound.examResults.push(finalResualt)
    await StudentFound.save()

    res.status(201).json({ message: " you are Submit  come back for check  resualt later",finalResualt
    })

})


export const DeleteExam = AsyndHandler(async (req, res, next) => {

    const Exam = await ExamModel.findById(req.params.id)
    if (!Exam) {
        next(new Error(`not found Exam  with id: ${req.params.id}`))
    } else {

       const UpdateExam= await ExamModel.findByIdAndDelete(req.params.id,{new:true})
       res.status(200).json({ message: " Exam Deleted successfully ", UpdateExam })

    }

})






