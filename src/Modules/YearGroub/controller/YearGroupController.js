
import AsyndHandler from "express-async-handler"
import YearGroupModel from "../../../../config/DB/model/Academic/YearGroup.model.js"



export const CraeteYearGroup = AsyndHandler(async (req, res, next) => {
    req.body.Createdby = req.user._id
    req.body.AcademicYaer=req.params.id

    const YearGroupFound = await YearGroupModel.findOne({Name:req.body.Name} )
    if (YearGroupFound) {
        next(new Error("YearGroup aready exist "))

    } else {
        const CraetedYearGroup = await YearGroupModel.create(req.body)
        res.status(200).json({ message: "YearGroup Craeted successfully", CraetedYearGroup })
    }
})

export const GetYearGroup = AsyndHandler(async (req, res, next) => {

    const CheckYearGroup = await YearGroupModel.find({})
    if (!CheckYearGroup) {
        next(new Error("not found  YearGroup"))
    } else {

        res.status(200).json({ message: "This is  YearGroup", CheckYearGroup })

    }

})

export const GetSingleYearGroup = AsyndHandler(async (req, res, next) => {


    const YearGroup =  await YearGroupModel.findById(req.params.id)
    if (!YearGroup) {
        next(new Error(`not found YearGroup by id: ${req.params.id}`))
    } else {

        res.status(200).json({ message: "This is YearGroup", YearGroup })

    }

})

export const UpdateYearGroup = AsyndHandler(async (req, res, next) => {
    
    req.body.UpdatedBy = req.user._id
    const Checkexist = await YearGroupModel.findOne({ _id: req.params.id })
    console.log(Checkexist);

    if (!Checkexist) {
        next(new Error(` YearGroup by id: ${req.params.id} not found`))

    } else {
        const updatedYearGroup = await YearGroupModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json({ message: `YearGroup with id: ${req.params.id} Updated Succssfully`, updatedYearGroup })

    }


})


export const DeleteYearGroup = AsyndHandler(async (req, res, next) => {

    const CheckYearGroup = await YearGroupModel.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: `YearGroup by id: ${req.params.id} Deleted Successfully`, CheckYearGroup })

})