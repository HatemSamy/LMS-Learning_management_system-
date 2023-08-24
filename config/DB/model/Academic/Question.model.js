
import { Schema, model } from "mongoose";


const QuestionSchema = new Schema({

   
   

    Question: {
        type:String,
        required: true

    },

    optionA: {
        type: String,
        required: true
    },
    optionB: {
        type: String,
        required: true
    },
    optionC: {
        type: String,
        required: true
    }, 
    optionD: {
        type: String,
        required: true
    }, 
    
    
    correctAnswer: {
        type: String,
        required: true
    },
    Incorrect: {
        type: Boolean,
        default:false
    },
   
    CreatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
   
}, {
    timestamps: true
})


const QuestionModel = model('Question', QuestionSchema)
export default QuestionModel