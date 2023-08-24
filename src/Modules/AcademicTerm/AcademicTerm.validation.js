import joi from "joi";


//joi validation for creating AcademicTerm
export const CraetAcademicTerm = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()



    }).options({ allowUnknown: true }),
    body: joi.object().required().keys({

        Name: joi.string().required().messages({

            "any.required": "id is required"
        }),

        duration: joi.string().required(),
        description: joi.string().required(),

    })
}
//joi validation for get AcademicTerm

export const GetAcademicTermById = {

    params: joi.object().required().keys({

        id: joi.string().required(),

    })
}

//joi validation for update AcademicTerm

export const updateAcademicTerm = {

    params: joi.object().required().keys({

        id: joi.string().required(),

    }),
    body: joi.object().required().keys({

        Name: joi.string(),
        fromYear: joi.string(),
        ToYear: joi.string()

    }),
    headers: joi.object().required().keys({

        authorization: joi.string().required(),


    }).options({allowUnknown:true})
}
