
import bcrypt from "bcryptjs"
import AsyndHandler from "express-async-handler"
import { paginate } from "../../../middleware/pagination.js"
import TeacherModel from "../../../../config/DB/model/staff/teacherModel.model.js"

//  Get Teachers 
export const GetTeacher = AsyndHandler(async (req, res, next) => {

    const {page,size}=req.query
    const {skip,limit}=paginate(page,size)
    // Calculate total documents
   const totalDocu= await TeacherModel.countDocuments()
    const Teachers = await TeacherModel.find({}).select("Name email role").skip(skip).limit(limit)
    if (!Teachers) {
        next(new Error(" not found any Teachers not found"))
    } else {
        res.status(201).json({ message: " Done this is Teachers List", Teachers,totalDocu})

    }

})
//  Get Teacher BY_ID
export const GetTeacherById = AsyndHandler(async (req, res, next) => {

    const Teacher = await TeacherModel.findOne(req.params.id).select("Name email role")
    if (!Teacher) {
        next(new Error(" Teacher not found"))
    } else {
        res.status(201).json({ message: " Done this is teacher", Teacher})

    }

})

//  Get Teacher profile
export const GetTeacherProfile = AsyndHandler(async (req, res, next) => {

    const Teacher = await TeacherModel.findById(req.user._id).select("Name email role")
    console.log(Teacher);
    if (!Teacher) {
        next(new Error(" Teacher not found"))
    } else {

        res.status(201).json({ message: " Done this is teacher", Teacher })

    }

})

// Admin assigning Roles TO Teacher
export const assigningTeacherRole = AsyndHandler(async (req, res, next) => {
     const {AcademicYear,Academicterm,program,classLevel}=req.body
    const Teacher = await TeacherModel.findById(req.params.id)
    if (!Teacher) {
        next(new Error("Teacher not found"))
    } else {
       if (Teacher.Iswitdrawn||Teacher.IsSuspended) {
        next(new Error("Teacher is  Iswitdrawn or IsSuspended"))
       }
         if (program) {
            Teacher.program=program
            await Teacher.save()
            res.status(201).json({message:"program Added To Teacher"})
         }

         if (Academicterm) {
            Teacher.Academicterm=Academicterm
            await Teacher.save()
            res.status(201).json({message:"Academicterm Added To Teacher"})

         }
         if (AcademicYear) {
            Teacher.AcademicYear=AcademicYear
            await Teacher.save()
            res.status(201).json({message:"AcademicYear Added To Teacher"})

         }
         if (classLevel) {
            Teacher.classLevel=classLevel
            await Teacher.save()
            res.status(201).json({message:"classLevel Added To Teacher"})

         }


    }

})
//  Update Teacher profile
export const UpdateTeacherProfile = AsyndHandler(async (req, res, next) => {
    const { email, Name, password} = req.body
      
    const teacher = await TeacherModel.findById( req.user._id )
    if (!teacher) {
        next(new Error(" not found user"))
    }
   const UpdateFields={
        Name,
        email,
    }

    if (password) {
        const hashPassword = await bcrypt.hashSync(password, parseInt(process.env.SALTROUND))
        UpdateFields.password=hashPassword
   
    }
    const updateProfile = await TeacherModel.findByIdAndUpdate(req.user._id, UpdateFields, { new: true })
    res.status(201).json({ message: " Done  AdminProfile Updated " ,updateProfile})


})