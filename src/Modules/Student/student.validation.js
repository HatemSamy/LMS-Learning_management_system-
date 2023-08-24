import joi from "joi";



export const GetStudentById = {

    params: joi.object().required().keys({

        id: joi.string().required().messages({

            "any.required": "id is required"
        }),

    })
}
export const UpdateStudentPofile = {

    body: joi.object().required().keys({

        Name: joi.string().messages({

            "any.required": "id is required"
        }),
        email: joi.string().email(),
        password: joi.string()

    })
}

export const UpdateStudentData = {

    body: joi.object().required().keys({

        subjects:joi.string(),
        AcademicYear:joi.string(),
        program:joi.string(),
        classLevels:joi.string(),
        IsSuspended:joi.boolean(),
        Iswitdrawn:joi.boolean(),
        
    })
}

export const GetStudents = {
  headers: joi.object().keys({
    authorization: joi.string().required().messages({
      'any.required': 'Token is required.'
    })
  }). options({allowUnknown: true})
};


