import { Schema, model } from "mongoose";


const YearGroupSchema = new Schema({

   Name: {
        type: String,
        required: [true, 'Name of year is required'],
    },
    
    AcademicYaer:{
    type:Schema.Types.ObjectId,
    ref:"AcademicYear",
    required:true
    },
    
    Createdby: {
        type:Schema.Types.ObjectId ,
        ref: 'Admin',
        required:true
    }
   
}, {
    timestamps: true
})


const YearGroupModel = model('YearGroup', YearGroupSchema)
export default YearGroupModel