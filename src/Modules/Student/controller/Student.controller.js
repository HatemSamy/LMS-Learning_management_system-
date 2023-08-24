
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import AsyndHandler from "express-async-handler"
import studentModel from "../../../../config/DB/model/Academic/StudentModel.model.js"
import ExamResultModel from "../../../../config/DB/model/Academic/ExamResualt.model.js"





// Get Students 
export const GetStudent = AsyndHandler(async (req, res, next) => {

    const Students = await studentModel.find({}).select("Name email role")
    if (!Students) {
        next(new Error(" not found any Students"))
    } else {
        res.status(201).json({ message: " Done this is Students List", Students })

    }

})
// Get Student BY_ID
export const GetStudentById = AsyndHandler(async (req, res, next) => {

    const Student = await studentModel.findById(req.params.id).select("Name email role")
    if (!Student) {
        next(new Error(" Student not found"))
    } else {
        res.status(201).json({ message: " Done this is Student", Student })

    }

})

//Get Student profile
export const GetStudentProfile = AsyndHandler(async (req, res, next) => {

    const Student = await studentModel.findById(req.user._id).populate("examResults")
    if (!Student) {
        next(new Error(" Student not found"))
        return;
    }
    console.log(Student);

    const StudentProfile = {

        Name: Student.Name,
        email: Student.email,
        classLevels: Student.classLevels,
        AcademicYear: Student.AcademicYear,
        program: Student.program

    }

    const examResults = Student?.examResults
    const currentResult = examResults[examResults.length - 1]
    const IsPublished = currentResult.IsPublished
    res.status(201).json({ message: " Done  This your profile", StudentProfile, currentResult: IsPublished ? currentResult : [], })


})

//Update Student profile
export const UpdateStudentProfile = AsyndHandler(async (req, res, next) => {
    const { email, Name, password } = req.body
    if (email) {
        const EmailFound = await studentModel.findOne({ email })
        if (EmailFound) {
            return next(new Error("this email is taken/exist"))
        }
    }

    const UpdateFields = {
        Name,
        email,
    }

    if (password) {
        const hashPassword = await bcrypt.hashSync(password, parseInt(process.env.SALTROUND))
        UpdateFields.password = hashPassword

    }
    const updateProfile = await studentModel.findByIdAndUpdate(req.user._id, UpdateFields, { new: true })
    return res.status(201).json({ message: " Done  AdminProfile Updated ", updateProfile })


})

//Update Student Data by Admin
export const UpdateStudentData = AsyndHandler(async (req, res, next) => {
    const { subjects, AcademicYear, program, classLevels, IsSuspended, Iswitdrawn } = req.body
    const Email = await studentModel.findById(req.params.id)
    if (!Email) {
        return   next(new Error("not found student"))
    }

    const updateProfile = await studentModel.findByIdAndUpdate(req.params.id, {

        $set: {
            subjects,
            AcademicYear,
            program,
            IsSuspended,
            Iswitdrawn

        },
        $addToSet: {
            classLevels

        }

    }, { new: true })
    return res.status(201).json({ message: " student data is  Updated successfully ", updateProfile })


})





export const promotingStudent = AsyndHandler(async (req, res, next) => {
    const StudentFound = await studentModel.findById(req.params.id)
    if (!StudentFound) {
        next(new Error("studen not found"))
        return;
    }
    const ExamFound = await ExamResultModel.findOne({studentId:req.params.id}).populate("AcademictermId")

    if (!ExamFound) {
        return next(new Error("not fount Result for this student"))

    }
    console.log(ExamFound);
    // Promoting student
    if (ExamFound.status === "passed") {
        switch (StudentFound.currentClassLevel) {
            case "level 100":
                StudentFound.classLevels.push("level 200");
                StudentFound.currentClassLevel = "level 200";
                break;
            case "level 200":
                StudentFound.classLevels.push("level 300");
                StudentFound.currentClassLevel = "level 300";
                break;
            case "level 300":
                StudentFound.classLevels.push("level 400");
                StudentFound.currentClassLevel = "level 400";
                break;
            case "level 400":
                StudentFound.YearGraduatd = new Date();
                StudentFound.isGraduated = true;
                break;
                
        }
        StudentFound.save();

        res.status(201).json({ message: " student promoting",StudentFound})

    }






})