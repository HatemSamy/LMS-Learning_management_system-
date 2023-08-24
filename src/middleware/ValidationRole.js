import AdminModel from "../../config/DB/model/staff/Admin.model.js"
import TeacherModel from "../../config/DB/model/staff/teacherModel.model.js"
import studentModel from "../../config/DB/model/Academic/StudentModel.model.js"




const Roles = {

    user: "user",
    Admin: "Admin",
    superAdmin: "superAdmin",
    Teacher: "Teacher",
    Student: "student"

}

export const AccessRoles = {
    GetAmin: [Roles.Admin],
    AdminRole: [Roles.Admin],
    TeacherRole: [Roles.Teacher],
    MultipleRole: [Roles.Admin, Roles.Teacher],
    StudentRole: [Roles.Student]
}

export const selectModel = (role) => {
    let userCollection;

    if (role === 'student') {
        userCollection = studentModel;
    } else if (role === 'Teacher') {
        userCollection = TeacherModel;
    } else if (role === 'Admin') {
        userCollection = AdminModel;
    } else {
        return null;
    }
    return userCollection

}
