import joi from "joi";

//joi validation for Creating Question

export const UpdateQuestion = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()

    }).options({ allowUnknown: true }),
    body: joi.object().required().keys({
        
        Question: joi.string(),
        optionA: joi.string(),
        optionB:joi.string(),
        optionC:joi.string(),
        optionD:joi.string(),
        correctAnswer:joi.string()
       

    })
}

//joi validation for get Question

export const GetQuestionById = {

    params: joi.object().required().keys({

        id: joi.string().required(),

    })
}

//joi validation for create Questioon

export const createQuestioon = {

    headers: joi.object().required().keys({
        authorization: joi.string().required()

    }).options({ allowUnknown: true }),

    body: joi.object().required().keys({
        
        Question: joi.string().required(),
        optionA: joi.string().required(),
        optionB:joi.string().required(),
        optionC:joi.string().required(),
        optionD:joi.string().required(),
        correctAnswer:joi.string().required()
       

    })
}