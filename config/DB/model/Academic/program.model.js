
import { Schema, model } from "mongoose";


const programSchema = new Schema({

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
        default:"4 years"
    },
    code:{
        type:String,
        required:true
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
    students:[ {
        type:Schema.Types.ObjectId ,
        ref: 'student',
    }], 
    //  subjects:[{
    //     type:Schema.Types.ObjectId ,
    //     ref: 'subject',
    // }],
}, {
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtual:true}
    
})

programSchema.virtual("subject",{
    ref:"Subject",
    localField:"_id",
    foreignField:"programId"
    }
    )



const programModel = model('program', programSchema)
export default programModel