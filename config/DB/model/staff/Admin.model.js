import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs"


const AdminSchema = new Schema({

    Name: {
        type: String,
        required: [true, 'Name is required'],
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
        default: 'Admin',
        required: [true, 'role is required'],

    },
    confirmEmail: {
        type: Boolean,
        default:false,

    },
    classLevel: [{
        type: Schema.Types.ObjectId,
        ref: "classLevel"
    }],
    AcademicYear: [{
        type: Schema.Types.ObjectId,
        ref: "AcademicYear"
    }],
    Academicterm: [{
        type: Schema.Types.ObjectId,
        ref: "Academicterm"
    }],
    Teachers: [{
        type: Schema.Types.ObjectId,
        ref: "Teacher"
    }],
    Studens: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
    }],
    progrm: [{
        type: Schema.Types.ObjectId,
        ref: "Program"
    }],

}, {
    timestamps: true
})


//Hashing password using Hooks
AdminSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALTROUND))
    next()
})
const AdminModel = model('Admin', AdminSchema)
export default AdminModel