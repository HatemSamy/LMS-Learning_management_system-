import AsyndHandler from "express-async-handler"
import studentModel from "../../../../config/DB/model/Academic/StudentModel.model.js"
import ExamResultModel from "../../../../config/DB/model/Academic/ExamResualt.model.js"



export const checkExamResult= AsyndHandler(async(req,res,next)=>{
  
    const StudentFound= await studentModel.findById(req.user._id)
    if (!StudentFound) {
        return next(new Error("not register student"))
    }

    const examResult= await ExamResultModel.findOne({
        studentId:req.user._id,
        ExamId:req.params.examId
    }).populate({
        path:"ExamId",
        populate:{
         path:"Questions",
         select:"Question"
        },
    })
    if (!examResult) {
        return next(new Error("examResult not found"))  
    }
    if (!examResult.IsPublished) {
        return next(new Error("examResult not published yet ,back later"))

    } else {

       return res.status(200).json({message:"Done your Result ",examResult})

    }



})


// Admin obscure Results
export const publishedExamResult= AsyndHandler(async(req,res,next)=>{
  

    const examResult= await ExamResultModel.findById(req.params.examId)
    if (!examResult) {
        return  next(new Error(" result not found"))
    } else {
        const obscure= await ExamResultModel.findByIdAndUpdate(req.params.id,{IsPublished:req.body.IsPublished},{new:true})
        return res.status(200).json({message:"Done your Result ",obscure})

    }
       


})