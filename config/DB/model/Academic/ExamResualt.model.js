

import { Schema, model } from "mongoose";


const ExamResultSchema = new Schema({


    status: {
        type: String,
        required: true,
        enum: ["fialed", "passed"],
        default: "failed"
    },
    remark: {
        type: String,
        required: true,
        enum: ["good","Very good", "poor","Excellent","fair"],
        default: "poor"
    },

    score:{
        type: Number,
        required: true,
    },
    grade:{
        type: Number,
        required: true,
    },
    passMark: {
        type: Number,
        required: true,
        default:50
    },
    IsPublished: {
        type: Boolean,
        default:false
    },


    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    answerQesutions: [{
        type: Object,
    }],
    ExamId: {
        type: Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
  
    AcademicYearId: {
        type: Schema.Types.ObjectId,
        ref:"AcademicYear",
        required:true
    },
    AcademictermId: {
        type: Schema.Types.ObjectId,
        ref:"Academicterm",
        required:true
    },
    classLevelId: {
        type: Schema.Types.ObjectId,
        ref:"classLevel",
        required:true
    },


}, {
    timestamps: true
})


const ExamResultModel = model('ExamResult', ExamResultSchema)
export default ExamResultModel