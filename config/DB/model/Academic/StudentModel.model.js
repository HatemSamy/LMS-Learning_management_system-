import { Schema, model } from "mongoose";

import bcrypt from "bcryptjs"
const studentSchema = new Schema({

   Name: {
        type: String,
        required: [true, 'userName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    email: {
        type: String,
        unique: [true, 'email must be unique value'],
        required: [true, 'email is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
   
    role: {
        type: String,
        default: 'student',
        required: [true, 'role is required'],
        
    },
    confirmEmail: {
        type: Boolean,
        default:false,

    },
    Iswitdrawn: {
        type: Boolean,
        default:false,
    },
    IsSuspended: {
        type: Boolean,
        default:false,
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref:"subject",
 
    }],
    applicationStatus: {
        type: String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }, 
    program: {
        type: Schema.Types.ObjectId,
        ref:"program",
       
    },
    classLevels:[ {
        type: String,
        
    }],
   currentClassLevel: {
        type: String,
        default:function () {
         return this.classLevels[this.classLevels.length-1]
        }
    },
    examResults: [{
        type: Schema.Types.ObjectId,
        ref: "ExamResult",
    }],
    dateAdmitted
    : {
        type: Date,
        ref:"examResults",
    },
    exams: [{
        type: Schema.Types.ObjectId,
        ref:"Exam",
    }],
    AcademicYear: {
        type: Schema.Types.ObjectId,
        ref:"AcademicYear",
    },
    
    YearGraduatd: {
        type: Date,
    },
    
    isGraduated: {
        type: Boolean,
        default:false
    }

}, {
    timestamps: true
})
studentSchema.pre("save",  async function (next) {
    this.password = await bcrypt.hashSync(this.password, parseInt(process.env.SALTROUND))
    next()
})


const studentModel = model('Student', studentSchema)
export default studentModel