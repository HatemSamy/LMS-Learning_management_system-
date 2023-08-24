import { Schema, model } from "mongoose";


const academictermSchema = new Schema({

   Name: {
        type: String,
        required: [true, 'Name of year is required'],
    },
    description:{
        type:String,
        required:true
    },
    duration:{
    type:String,
    required:true,
    default:"3 months"
    },
    
    Createdby: {
        type:Schema.Types.ObjectId ,
        ref: 'Admin',
        required:true
    }
   
}, {
    timestamps: true
})


const AcademictermModel = model('Academicterm', academictermSchema)
export default AcademictermModel