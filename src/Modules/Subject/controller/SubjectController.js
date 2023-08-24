
import AsyndHandler from "express-async-handler"
import programModel from "../../../../config/DB/model/Academic/program.model.js"
import subjectModel from "../../../../config/DB/model/Academic/subject.model.js"




export const Craetesubject = AsyndHandler(async (req, res, next) => {

    const { Name, description, Academicterm } = req.body
    req.body.Createdby = req.user._id

    const checkprogram = await programModel.findById(req.params.id)
    if (!checkprogram) {
        next(new Error("not found program "))
    } else {
        const subject = await subjectModel.findOne({ Name })

        if (subject) {
            next(new Error("subject aready exist "))

        } else {

            req.body.programId = req.params.id
            
            const CraetedSubject = await subjectModel.create(req.body)

            res.status(200).json({ message: "Subject Craeted successfully", CraetedSubject })
        }

    }

})
export const Getsubjecs = AsyndHandler(async (req, res, next) => {

    const Checksubject = await subjectModel.find({})
    if (!Checksubject) {
        next(new Error("not found  subject"))
    } else {

        res.status(200).json({ message: "This is  subject", Checksubject })

    }

})
export const GetSinglesubject = AsyndHandler(async (req, res, next) => {


    const subject = await subjectModel.findById(req.params.id)
    if (!subject) {
        next(new Error(`not found subject by id: ${req.params.id}`))
    } else {

        res.json({ message: "This is subject", subject })
    }

})

export const Updatesubject = AsyndHandler(async (req, res, next) => {
    req.body.UpdatedBy = req.user._id
    const Checkexist = await subjectModel.findOne({ _id: req.params.id })
    console.log(Checkexist);

    if (!Checkexist) {
        next(new Error(` subject by id: ${req.params.id} not found`))

    } else {
        const updatedsubject = await subjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json({ message: `subject with id: ${req.params.id} Updated Succssfully`, updatedsubject })

    }


})


export const Deletesubject = AsyndHandler(async (req, res, next) => {

    const Checksubject = await subjectModel.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: `subject by id: ${req.params.id} Deleted Successfully`, Checksubject })

})