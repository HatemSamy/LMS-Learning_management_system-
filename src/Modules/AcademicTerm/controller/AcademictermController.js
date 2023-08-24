import AcademictermModel from "../../../../config/DB/model/Academic/academicTerm.model.js"
import AsyndHandler from "express-async-handler"
import AdminModel from "../../../../config/DB/model/staff/Admin.model.js"



export const CraeteAcademicTerm = AsyndHandler(async (req, res, next) => {
    req.body.Createdby = req.user._id
    const ExistTerm = await AcademictermModel.findOne({ Name: req.body.Name})
    if (ExistTerm) {
       return next(new Error("this Term Aready Exist"))
    }
   

    const term = await AcademictermModel.create(req.body)

    if (term) {
        const Admin = await AdminModel.findByIdAndUpdate(req.user._id)
        Admin.Academicterm.push(term._id)
        Admin.save()
    }

    return  res.status(200).json({ message: "Academic Term Add", term })

})

export const GetAcademicTerms = AsyndHandler(async (req, res, next) => {

    const CheckTerm = await AcademictermModel.find({})
    if (!CheckTerm) {
        next(new Error("not found Acdemic Term"))
    } else {

        res.status(200).json({ message: "This is Acdemic Term", CheckTerm })

    }

})

export const GetSingleAcademicTerm = AsyndHandler(async (req, res, next) => {


    const Term = await AcademictermModel.findById(req.params.id)
    if (!Term) {
        next(new Error(`not found Acdemic Term by id: ${req.params.id}`))
    } else {

        res.status(200).json({ message: "This is Acdemic Term", Term })

    }

})

export const UpdateAcademicterm = AsyndHandler(async (req, res, next) => {
    const { Name, fromYear, ToYear } = req.body
    req.body.UpdatedBy = req.user._id
    const Checkexist = await AcademictermModel.findOne({ Name })

    if (Checkexist) {
        next(new Error(`Name of  Acdemicterm by id: ${req.params.id} is aready exist`))
        console.log(Checkexist);
    } else {
        const CheckTerm = await AcademictermModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json({ message: `Acdemic Term by id: ${req.params.id} Updated Succssfly`, CheckTerm })

    }

})

export const DeleteAcademicTerm = AsyndHandler(async (req, res, next) => {

    const CheckAcademicTerm = await AcademictermModel.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: `Acdemic term by id: ${req.params.id} Deleted Succssfly`, CheckAcademicTerm })

})