import joi from "joi";

//joi validation for Creating Program
export const CreateProgram = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()

    }).options({ allowUnknown: true }),
    body: joi.object().required().keys({

        Name: joi.string().required().messages({

            "any.required": "id is required"
        }),

        duration: joi.string().required(),
        description: joi.string().required(),
        code:joi.string().required()

    })
}
//joi validation for get Program

export const GetProgramById = {

    params: joi.object().required().keys({

        id: joi.string().required(),

    })
}

//joi validation for update Program

export const updateProgram = {

    headers: joi.object().required().keys({
        authorization: joi.string().required()

    }).options({ allowUnknown: true }),

    body: joi.object().required().keys({
        Name: joi.string().messages({

            "any.required": "id is required"
        }),

        duration: joi.string(),
        description: joi.string(),
        code:joi.string()

    })
}