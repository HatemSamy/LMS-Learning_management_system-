import { Schema, model } from "mongoose";


const classLevelSchema = new Schema({
//Ex:100/200/300
   Name: {
        type: String,
        required: [true, 'Name of ClassLevel is required']

    },
    description: {
        type: String,
        required: [true,'description is required']

    },
    
    Createdby: {
        type:Schema.Types.ObjectId ,
        ref: 'Admin',
    },
    Teachers: [{
        type:Schema.Types.ObjectId ,
        ref: 'Teacher',
    }],
    students: [{
        type:Schema.Types.ObjectId ,
        ref: 'student',
    }], 
    subjects: [{
        type:Schema.Types.ObjectId ,
        ref: 'subject',
    }], 
}, {
    timestamps: true
})


const classLevelModel = model('classLevel', classLevelSchema)
export default classLevelModel