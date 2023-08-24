import joi from "joi";


 //joi validation for Craete YearGroub
export const CraeteYearGroub = {
   
    headers: joi.object().keys({
              authorization: joi.string().required().messages({
                'any.required': 'Token is required.'
              })
            }). options({allowUnknown: true}),
    body: joi.object().required().keys({

        Name: joi.string().required(),
        description: joi.string().required(),
        AcademicYaer: joi.string().required(),


    })
}
 

 //joi validation for Get YearGroub

export const GetYearGroub = {
    headers: joi.object().keys({
        authorization: joi.string().required().messages({
          'any.required': 'Token is required.'
        })
      }). options({allowUnknown: true}),
        params: joi.object().keys({
          id: joi.string().required().min(24)
        }). options({allowUnknown: true}),
   
    }

    export const UpdatreYaerGroub = {
   
        headers: joi.object().keys({
                  authorization: joi.string().required().messages({
                    'any.required': 'Token is required.'
                  })
                }). options({allowUnknown: true}),
        body: joi.object().required().keys({
    
            Name: joi.string(),
            description: joi.string(),
            AcademicYaer: joi.string(),
    
    
        })
    }