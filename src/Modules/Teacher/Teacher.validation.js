


import joi from "joi";


 //joi validation for assginnig responsability to teacher
export const assiginTeacherRole = {

    body: joi.object().required().keys({

        AcademicYear: joi.string(),
        Academicterm: joi.string(),
        program: joi.string(),
        classLevel: joi.string()


    })
}
 //joi validation for get teacher

export const GetTeachers = {

    query: joi.object().required().keys({

        page:joi.number(),
        size:joi.number(),
        
    })
}
 //joi validation for UpdateTeacherPofile

export const UpdateTeacherPofile = {
    
        headers: joi.object().keys({
          authorization: joi.string().required().messages({
            'any.required': 'Token is required.'
          })
        }). options({allowUnknown: true}),
   
    body: joi.object().required().keys({

        Name: joi.string().messages({

            "any.required": "id is required"
        }),
        email: joi.string().email(),
        password: joi.string()

    })
}
 //joi validation for  getTeacherPofile

export const getTeacherPofile = {
    
    headers: joi.object().keys({
      authorization: joi.string().required().messages({
        'any.required': 'Token is required.'
      })
    }). options({allowUnknown: true}),

}
