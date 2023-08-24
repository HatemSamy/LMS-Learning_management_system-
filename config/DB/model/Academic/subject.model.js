import { Schema, model } from "mongoose";


const subjectSchema = new Schema({

    Name: {
        type: String,
        required: [true, 'userName is required'],


    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    duration: {
        type: String,
        required: [true, 'duration is required'],
        default: "3 months"
    },

    Createdby: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    UpdatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    },
    Teachers: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    Academicterm: {
        type: Schema.Types.ObjectId,
        ref: 'Academicterm',
    },
    programId: {
        type: Schema.Types.ObjectId,
        ref: 'program',
    },

}, {
    timestamps: true
})


const subjectModel = model('Subject', subjectSchema)
export default subjectModel