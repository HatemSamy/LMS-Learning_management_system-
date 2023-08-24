import classLevelModel from "../../../../config/DB/model/Academic/classLevel.model.js"
import AsyndHandler from "express-async-handler"
import AdminModel from "../../../../config/DB/model/staff/Admin.model.js"


// create new ClassLevel
export const CraeteClassLevel = AsyndHandler(async (req, res, next) => {

    const { Name, description } = req.body
    req.body.Createdby = req.user._id
    const ExistClassLevel = await classLevelModel.findOne({ Name })
    if (ExistClassLevel) {
        return next(new Error("this ClassLevel Aready Exist"))
    }


    const ClassLevel = await classLevelModel.create(req.body)

    if (ClassLevel) {
        const Admin = await AdminModel.findByIdAndUpdate(req.user._id)
        Admin.classLevel.push(ClassLevel._id)
        Admin.save()
    }
    
    return  res.status(200).json({ message: " ClassLevel Added", ClassLevel })

})

// Get ClassLevels
export const GetAcademicClassLevels = AsyndHandler(async (req, res, next) => {

    const CheckClassLevel = await classLevelModel.find({})
    if (!CheckClassLevel) {
        return next(new Error("not found  ClassLevel"))
    } else {

        return res.status(200).json({ message: "This is  ClassLevel", CheckClassLevel })

    }

})

// get spacefic ClassLevel
export const GetSingleAcademicClassLevel = AsyndHandler(async (req, res, next) => {


    const ClassLevel = await classLevelModel.findById(req.params.id)
    if (!ClassLevel) {
        return next(new Error(`not found ClassLevel by id: ${req.params.id}`))
    } else {

        return res.status(200).json({ message: "This is ClassLevel", ClassLevel })

    }

})

// Update ClassLevel
export const UpdateAcademicClassLevel = AsyndHandler(async (req, res, next) => {
    req.body.UpdatedBy = req.user._id
    const Checkexist = await classLevelModel.findOne({ Name:req.body.Name })

    if (Checkexist) {
       return next(new Error(`Name of  classLevel by id: ${req.params.id} is aready exist`))
    } else {
        const CheckLevel = await classLevelModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
         if (!CheckLevel) {
       return next(new Error(`classLevel with id: ${req.params.id} not found`))
            
         }
        return res.status(200).json({ message: `classLevel  by id: ${req.params.id} Updated Succssfly`, CheckLevel })

    }

})

// Delete ClassLevel
export const DeleteAcademicTerm = AsyndHandler(async (req, res, next) => {

    const CheckAcademicTerm = await classLevelModel.findByIdAndDelete(req.params.id)

    return res.status(200).json({ message: `ClassLevel with id: ${req.params.id} Deleted Successfully`, CheckAcademicTerm })

})