
import AsyndHandler from "express-async-handler"
import programModel from "../../../../config/DB/model/Academic/program.model.js"
import AdminModel from "../../../../config/DB/model/staff/Admin.model.js"

export const Craeteprogram = AsyndHandler(async (req, res, next) => {

    const { Name, description, duration, code } = req.body
    req.body.Createdby = req.user._id
    const Existprogram = await programModel.findOne({ Name })
    if (Existprogram) {
        return next(new Error("this program Aready Exist"))
    } else {
        const Program = await programModel.create(req.body)

        if (Program) {
            const Admin = await AdminModel.findByIdAndUpdate(req.user._id)
            Admin.progrm.push(Program._id)
            Admin.save()
        }
        return res.status(200).json({ message: " program Added", Program })

    }

})
export const Getprograms = AsyndHandler(async (req, res, next) => {

    const Checkprogram = await programModel.find({})
    if (!Checkprogram) {
        return next(new Error("not found  program"))
    } else {

        return res.status(200).json({ message: "This is  program", Checkprogram })

    }

})
export const GetSingleprogram = AsyndHandler(async (req, res, next) => {


    const program = await programModel.findById(req.params.id).populate({
        path: "subject",
        select: "Name description Createdby"
    })
    if (!program) {
        return next(new Error(`not found program by id: ${req.params.id}`))
    } else {

        return res.status(200).json({ message: "This is program", program })

    }

})

export const Updateprogram = AsyndHandler(async (req, res, next) => {
    const { Name, description, duration, code } = req.body
    req.body.UpdatedBy = req.user._id
    const Checkexist = await programModel.findOne({ _id: req.params.id })
    console.log(Checkexist);

    if (!Checkexist) {
        return next(new Error(` program by id: ${req.params.id} not found`))

    } else {
        const updatedProgram = await programModel.findByIdAndUpdate(req.params.id,{
            Name,
            description,
            duration,
            code},
            { new: true }).select("-updatedAt -createdAt -students -Teachers")

        return res.status(200).json({ message: `progrm by id: ${req.params.id} Updated Succssfully`, updatedProgram })

    }




})

export const DeleteProgram = AsyndHandler(async (req, res, next) => {

    const Checkprogram = await programModel.findByIdAndDelete(req.params.id)

    return res.status(200).json({ message: `program by id: ${req.params.id} Deleted Successfully`, Checkprogram })

})