import AcademicYearModel from "../../../../config/DB/model/Academic/academicYear.model.js"
import AsyndHandler from "express-async-handler"
import AdminModel from "../../../../config/DB/model/Academic/academicYear.model.js"



export const CraeteAcademicYear = AsyndHandler(async (req, res, next) => {

    const ExistYear = await AcademicYearModel.findOne({Name:req.body.Name})
    if (ExistYear) {
      return  next(new Error("this Year Aready Exist"))
    }
    req.body.Createdby = req.user._id

    const NewYear = await AcademicYearModel.create(req.body)

    if (NewYear) {
        const Admin = await AdminModel.findById(req.user._id)
        Admin.AcademicYear.push(NewYear._id)
        Admin.save()
    }

    return res.status(200).json({ message: "Academic year Add", NewYear })

})

export const GetAcademicYears = AsyndHandler(async (req, res, next) => {

    const CheckYears = await AcademicYearModel.find({})
    if (!CheckYears) {
        return next(new Error("not found Acdemic Years"))
    } else {

        return res.status(200).json({ message: "This is Acdemic Years", CheckYears })

    }

})

export const GetSingleAcademicYear = AsyndHandler(async (req, res, next) => {


    const CheckYear = await AcademicYearModel.findById(req.params.id)
    if (!CheckYear) {
        return next(new Error(`not found Acdemic Year by id: ${req.params.id}`))
    } else {

        return  res.status(200).json({ message: "This is Acdemic Year", CheckYear })

    }

})

export const UpdateAcademicYear = AsyndHandler(async (req, res, next) => {
    req.body.UpdatedBy = req.user._id
    const Checkexist = await AcademicYearModel.findOne({Name:req.body.Name})

    if (Checkexist) {
        console.log(Checkexist);
        return next(new Error(`Name of AcdemicYear by id: ${req.params.id} is aready exist`))

    } else {
        const Checkexist = await AcademicYearModel.findByIdAndUpdate(req.params.id,req.body, { new: true })

        return   res.status(200).json({ message: `Acdemic Year by id: ${req.params.id} Updated Succssfly`, Checkexist })

    }

})

export const DeleteAcademicYear = AsyndHandler(async (req, res, next) => {

    const CheckAcademicYear = await AcademicYearModel.findByIdAndDelete(req.params.id)

    return res.status(200).json({ message: `Acdemic Year by id: ${req.params.id} Deleted Succssfly`, CheckAcademicYear })

})