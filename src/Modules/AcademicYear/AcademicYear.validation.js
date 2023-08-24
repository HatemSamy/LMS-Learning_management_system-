import joi from "joi";


//joi validation for creating AcademicYear
export const CraetAcademicYear = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()

    }).options({ allowUnknown: true }),
    body: joi.object().required().keys({

        Name: joi.string().required().messages({

            "any.required": "id is required"
        }),

        fromYear: joi.date().required(),
        IsCurrent: joi.boolean().required(),
        ToYear: joi.date().required(),

    })
}
//joi validation for get AcademicYear

export const GetAcademicYearById = {

    params: joi.object().required().keys({

        id: joi.string().required(),

    })
}

//joi validation for update AcademicYear

export const updateAcademicYear = {

    params: joi.object().required().keys({

        id: joi.string().required(),

    }),
    body: joi.object().required().keys({
        Name:joi.string(),
        fromYear: joi.date(),
        IsCurrent: joi.boolean(),
        ToYear: joi.date(),

    }),
    headers: joi.object().required().keys({

        authorization: joi.string().required(),


    }).options({allowUnknown:true})
}