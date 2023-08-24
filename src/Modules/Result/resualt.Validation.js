import joi from "joi"

//joi validation for ExsamResult

export const publishedExsamResult = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()

    }).options({ allowUnknown: true }),
 
       
    params: joi.object().required().keys({

        id: joi.string().required(),

    }),
    body: joi.object().required().keys({

        IsPublished:joi.boolean().required(),

    }),
    
}

//joi validation for  check ExsamResult

export const checkExsamResult = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()

    }).options({ allowUnknown: true }),
    params: joi.object().required().keys({

        examId: joi.string().required().min(24),

    })
}

//joi validation for fetch ExsamResul

export const fetchExsamResult = {

    params: joi.object().required().keys({

        id: joi.string().required().min(24),

    })
}