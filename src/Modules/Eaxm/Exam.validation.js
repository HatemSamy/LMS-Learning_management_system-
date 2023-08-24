import joi from "joi";


 //joi validation for creating Exam
export const CraetExam = {

    body: joi.object().required().keys({

        Name: joi.string().required().messages({

            "any.required": "id is required"
        }),
        subjectId: joi.string().required(),
        duration: joi.string().required(),
        description: joi.string().required(),
        examTime: joi.string().required(),
        examDate: joi.string().required(),
        examType: joi.string().required(),
        academicTermId: joi.string().required(),
        AcademicYearId: joi.string().required(),
        program: joi.string().required(),
        classLevel: joi.string().required()


    })
}
 //joi validation for get Exam

export const GetExamById = {

    params: joi.object().required().keys({

        id:joi.string().required(),
   
        
    })
}
 //joi validation for write exam

export const writeExam = {

    params: joi.object().required().keys({

        id: joi.string().required().messages({

            "any.required": "id is required"
        }),

    }),

    body:joi.object().required().keys({
        Answers:joi.array().required()

    })
}