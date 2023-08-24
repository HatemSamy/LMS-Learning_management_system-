import { Schema, model } from "mongoose";


const academicYearSchema = new Schema({

   Name: {
        type: String,
        required: [true, 'Name of year is required'],
       

    },
    IsCurrent: {
        type: Boolean,
        default:false
    },
    fromYear: {
        type: Date,
        required: true,
    },
    ToYear: {
        type: Date,
        required: true,
    },
   
    
    Createdby: {
        type:Schema.Types.ObjectId ,
        ref: 'Admin',
        required:true
    },
    UpdatedBy: {
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
}, {
    timestamps: true
})


const AcademicYearModel = model('AcademicYear', academicYearSchema)
export default AcademicYearModel