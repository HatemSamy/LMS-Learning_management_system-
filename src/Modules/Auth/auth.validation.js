
import joi from "joi";



export const Register = {

    body: joi.object().required().keys({
        Name: joi.string().required(),
        email: joi.string().required().email(),
        role:joi.string().required(),
        password: joi.string().required(),

    })
}

export const AdminRegister = {

    body: joi.object().required().keys({
        Name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required(),

    })
}
export const login = {

    body: joi.object().required().keys({

        email: joi.string().required().email(),
        role:joi.string().required(),
        password: joi.string().required(),

    })
}


export const confirmEmail = {

    params: joi.object().required().keys({

        token: joi.string().required()
       

    })
}

export const refreshtoken = {

    params: joi.object().required().keys({

        token: joi.string().required()
       

    })
}