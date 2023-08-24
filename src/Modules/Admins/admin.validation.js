


import joi from "joi";


 //joi validation for creating Exam
export const UpdateAdminPrifile = {

    body: joi.object().required().keys({

        Name: joi.string().required().messages({

            "any.required": "id is required"
        }),
  
        email: joi.string().email(),
        


    })
}
 //joi validation for get Exam

export const GetExamById = {

    params: joi.object().required().keys({

        id:joi.string().required(),
   
        
    })
}
