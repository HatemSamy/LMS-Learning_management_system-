import jwt from 'jsonwebtoken'
import AsyncHandler from "express-async-handler"
import AdminModel from '../../config/DB/model/staff/Admin.model.js';
import TeacherModel from '../../config/DB/model/staff/teacherModel.model.js';
import studentModel from '../../config/DB/model/Academic/StudentModel.model.js';




    


export const auth = (accessRole) => {
    return AsyncHandler(async (req,res, next) => {

        const { authorization } = req.headers
        // console.log(authorization);

        if (!authorization?.startsWith(process.env.BearerKey)) {
            // res.status(401).json({ message: "invalid bearerKey" })
        next (new Error("invalid bearerKey"))

        }

        const token = authorization.split(process.env.BearerKey)[1]
        const decoded =  await jwt.verify(token,process.env.tokenSignature)
        if (!decoded.id || !decoded?.isLoggedIn) {
            res.status(401).json({ message: "invalid token Payload" })


        } else {

            const user = await AdminModel.findById(decoded.id) ||await TeacherModel.findById(decoded.id)||await studentModel.findById(decoded.id)
            if (!user) {
                res.status(404).json({ message: " validation error ,user not found" })

            } else {
                if (!accessRole.includes(user.role)) {
                    next (new Error("access Denied, not authraized role"))
                } else {
                    req.user = user
                    next() 
                }
            
            }

        }

    })

}