import joi from "joi";

//joi validation for Creating subject

export const Createsubject = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()

    }).options({ allowUnknown: true }),
    body: joi.object().required().keys({
        
        Name: joi.string().required(),
        Academicterm: joi.string().required(),
        description:joi.string().required(),
    
    }),
    params: joi.object().required().keys({

        id: joi.string().required(),

    })
}

//joi validation for get subject

export const GetSubjectById = {

    params: joi.object().required().keys({

        id: joi.string().required(),

    })
}

//joi validation for update subject

export const updateSubject = {

    headers: joi.object().required().keys({
        authorization: joi.string().required()

    }).options({ allowUnknown: true }),
    body: joi.object().required().keys({
        
        Name: joi.string(),
        Academicterm: joi.string(),
        description:joi.string(),
    
    })
}