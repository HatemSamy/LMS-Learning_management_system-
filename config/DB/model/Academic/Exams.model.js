
import { Schema, model } from "mongoose";


const ExamSchema = new Schema({

    Name: {
        type: String,
        required: [true, 'userName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    description: {
        type: String,
        required: [true, 'userName is required'],
    },
    duration: {
        type: String,
        required: [true, 'duration is required'],
        default: "50 minutes"
    },
    examDate: {
        type: Date,
        required: [true, 'examDate is required'],

    },
    examTime: {
        type: String,
        required: [true, 'examTime is required'],
    },
    examType: {
        type: String,
        required: [true, 'examType is required'],
        default: "Quiz"
    },


    examStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "live"]
    },

    Questions: [{
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true

    }],

    Createdby: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    totalMark: {
        type: Number,
        required: true,
        default: 100
    },
    passMark: {
        type: Number,
        required: true,
        default: 50
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required:true,
    },
    academicTermId: {
        type: Schema.Types.ObjectId,
        ref: 'Academicterm',
        required: true
    },
    AcademicYearId: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicYear',
        required: true,
    },
    program: {
        type: Schema.Types.ObjectId,
        ref: 'program',
        required: true
    },
    classLevel: {
        type: Schema.Types.ObjectId,
        ref: 'classLevel',
        required: true
    },
}, {
    timestamps: true
})


const ExamModel = model('Exam', ExamSchema)
export default ExamModel