
import AsyndHandler from "express-async-handler"

import AdminModel from "../../../../config/DB/model/staff/Admin.model.js"


// Admin GetAdmin profile
export const AdminProfile = AsyndHandler(async (req, res, next) => {

    const Admin = await AdminModel.findById(req.user._id).select("Name email role").populate("AcademicYear")
    if (!Admin) {
        next(new Error("Admin not found"))
    } else {
        res.status(201).json({ message: " Done this is Admin Profile", Admin })

    }

})
// Admin Get all Admins
export const AdminsList = AsyndHandler(async (req, res, next) => {

    const Admins = await AdminModel.find({})
    if (!Admins) {
        next(new Error("Admins not found"))
    } else {
        res.status(201).json({ message: " Done this is Admins list", Admins })

    }

})
export const UpdateAdminProfile = AsyndHandler(async (req, res, next) => {
    const { email, Name } = req.body

    const checkEmail = await AdminModel.findOne({ email })
    if (checkEmail) {
        next(new Error("this email is taken/exist"))
    }

    const updateProfile = await AdminModel.findOneAndUpdate(req.user._id, { email, Name }, { new: true })
    res.status(201).json({ message: " Done  AdminProfile Updated ", updateProfile })

})