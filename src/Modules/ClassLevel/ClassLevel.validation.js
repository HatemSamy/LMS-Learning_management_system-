import joi from "joi";


//joi validation for creating ClassLevel
export const CraetClassLevel = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()



    }).options({ allowUnknown: true }),
    body: joi.object().required().keys({

        Name: joi.string().required().messages({

            "any.required": "id is required"
        }),

        description: joi.string().required(),
       

    })
}
//joi validation for get ClassLevel

export const GetClassLevelById = {

    params: joi.object().required().keys({

        id: joi.string().required(),

    })
}

//joi validation for update ClassLevel

export const updateClassLevel = {

    params: joi.object().required().keys({

        id: joi.string().required(),

    }),
    body: joi.object().required().keys({
        Name:joi.string(),
        description: joi.string()
        

    }),
    headers: joi.object().required().keys({

        authorization: joi.string().required(),


    }).options({allowUnknown:true})
}