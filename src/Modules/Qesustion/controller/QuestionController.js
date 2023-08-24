
import AsyndHandler from "express-async-handler"
import QuestionModel from "../../../../config/DB/model/Academic/Question.model.js"
import ExamModel from "../../../../config/DB/model/Academic/Exams.model.js"




export const CraeteQuestion = AsyndHandler(async (req, res, next) => {

    const { Question, optionA, optionB, optionC, optionD, correctAnswer } = req.body
    //find exam
    const ExamFound = await ExamModel.findById(req.params.id)
    if (!ExamFound) {
        return next(new Error("exam Not found"))
    } else {

        const QuestionFound = await QuestionModel.findOne({ Question })
        if (QuestionFound) {
            return next(new Error("Question is aready Exist"))

        } else {
            // Create Question
            const CreateQuestion = await QuestionModel.create({
                Question,
                optionA,
                optionB,
                optionC,
                optionD,
                correctAnswer,
                CreatedBy:req.user._id
            })
            //Push question to exam
            ExamFound.Questions.push(CreateQuestion)
            ExamFound.save()

            return res.status(200).json({ message: "QuestionCreated Successfully", CreateQuestion })
        }
    }

})


export const GetQuestions = AsyndHandler(async (req, res, next) => {

    const CheckQuestion = await QuestionModel.find({})
    if (!CheckQuestion) {
        return next(new Error("not found  Question"))
    } else {

        return res.status(200).json({ message: "This is  Question", CheckQuestion })

    }

})

export const GetSingleQuestion = AsyndHandler(async (req, res, next) => {


    const Question = await QuestionModel.findById(req.params.id)
    if (!Question) {
        return next(new Error(`not found Question by id: ${req.params.id}`))
    } else {

        return res.status(200).json({ message: " Question feched succssefully", Question })
    }
})

export const UpdateQuestion = AsyndHandler(async (req, res, next) => {
    req.body.UpdatedBy = req.user._id
    const Checkexist = await QuestionModel.findOne({ _id: req.params.id })

    if (!Checkexist) {
        return next(new Error(` Question by id: ${req.params.id} not found`))

    } else {
        const updatedQuestion = await QuestionModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.status(200).json({ message: `Question with id: ${req.params.id} Updated Succssfully`, updatedQuestion })

    }


})


export const DeleteQuestion = AsyndHandler(async (req, res, next) => {

    const CheckQuestion =  await QuestionModel.findByIdAndDelete(req.params.id)

   return res.status(200).json({ message: `Question by id: ${req.params.id} Deleted Successfully`, CheckQuestion })

})