import AsyndHandler from "express-async-handler"
import { selectModel } from "../../../middleware/ValidationRole.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import AdminModel from "../../../../config/DB/model/staff/Admin.model.js"
import { sendEmail } from "../../../services/email.js"

// Admin register
export const Adminregister = AsyndHandler(async (req, res, next) => {
    const { Name, email, password } = req.body

    // check if email exist
    const AdminFound = await AdminModel.findOne({ email })
    if (AdminFound) {
        return res.status(400).json({ message: "Email Aready exist" })
    }
    const newuser = new AdminModel({ Name, email, password })

    const token = await jwt.sign({ id: newuser._id,role: newuser.role}, process.env.emailToken)
    const refreshtoken = await jwt.sign({ id: newuser._id,role:newuser.role }, process.env.emailToken)

    const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
    const link2 = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/refreshtoken/${refreshtoken}`

    const message = `<a href="${link}">confirmEmail<a/>
    <br/><br/>
    <a href="${link2}">newtoken<a/>
    `


    const info = await sendEmail(email, "confirmEmail", message)
    if (info?.accepted?.length) {
        const savedUser = await
            newuser.save()
        console.log(info?.accepted?.length);
        return res.status(201).json({ massage: "Admin Accouent Created", userId: savedUser._id })

    } else {
        return next(new Error("email regicted"))


    }

})

// User register (Student and Teacher)
export const UserRegister = AsyndHandler(async (req, res, next) => {

    const { Name, email, password, role } = req.body
    //define userCollection
    const userCollection = selectModel(role)
    console.log(userCollection);
    const AdminFound = await AdminModel.findById(req.user._id)
    if (!AdminFound) {
        next(new Error("Admin Not found"))
        return;
    }
    const User = await userCollection.findOne({ email })

    if (User) {
        return next(new Error("user aready exist"))

    } else {

        const newuser = new userCollection({ Name, email, password })

        const token = await jwt.sign({ id: newuser._id,role:newuser.role}, process.env.emailToken)
        const refreshtoken = await jwt.sign({ id: newuser._id, role:newuser.role}, process.env.emailToken)

        const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
        const link2 = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/refreshtoken/${refreshtoken}`

        const message = `<a href="${link}">confirmEmail<a/>
      <br/><br/>
      <a href="${link2}">newtoken<a/>
      `


        const info = await sendEmail(email, "confirmEmail", message)
        if (info?.accepted?.length) {
            console.log(info?.accepted?.length);
            const savedUser = await newuser.save()
            if (savedUser.role === "Teacher") {
                AdminFound.Teachers.push(savedUser)
                AdminFound.save()
                
            }
            if (savedUser.role === "student") {
                AdminFound.Studens.push(savedUser,)
                AdminFound.save()
            }
            return res.status(201).json({ massage: "Done", userId: savedUser._id })

        } else {
            return next(new Error("email regicted"))


        }

    }

}
)

//User login
export const login = AsyndHandler(async (req, res, next) => {
    const { email, password, role } = req.body

    // define userCollection
    const userCollection = selectModel(role)

    const userFound = await userCollection.findOne({ email })
    if (!userFound) {
       return res.status(404).json({ message: "User Not Found" })
    }
    if (!userFound.confirmEmail) {
       return res.status(404).json({ message: "confirm you email frist" })
        
    }
    const checkPassword = await bcrypt.compareSync(password, userFound.password)
    if (!checkPassword) {
        return next(new Error("invalid login credential"))
    } else {
        const token = await jwt.sign({ Name: userFound.Name, id: userFound._id, email, isLoggedIn: true }, process.env.tokenSignature)
        res.status(201).json({ message: " login success", loginToken: token })
    }

})


export const confirmEmail= AsyndHandler(async(req,res,next)=>{

const {token} =req.params

const decoded= await jwt.verify(token,process.env.emailToken)
if(!decoded ){
  return  next (new (Error("invalid pay load or it is aready confirmed")))

}else{
 const  userCollection = selectModel(decoded.role)
 console.log(userCollection);
 const User= await userCollection.findOneAndUpdate({_id:decoded.id,confirmEmail:false},{confirmEmail:true})
 console.log(User);
  return res.status(200).json({message:"email confirmed successfuly",UserId:User._id})


}











})




export const refreshtoken = AsyndHandler(async (req, res) => {
    const { token } = req.params
    const decoded =  await jwt.verify(token, process.env.emailToken)
    console.log(decoded);
    if (!decoded) {
      return  next(Error("in valid token"))
    } else {
     const userCollection =selectModel(decoded.role)
     console.log(userCollection);
      const user = await userCollection.findById(decoded.id)
      console.log(user);
      if (!user) {
       return res.status(400).json({ massage: " not register user" })
  
      } else {
        if (user.confirmEmail) {
            return  res.status(400).json({ massage: " you are aready confirmed" })
  
        } else {
          const token = jwt.sign({ id: user._id, role:user.role }, process.env.emailToken)
  
          const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
  
          const message = `<a href="${link}">confirmEmail<a/>
     
      `
          const info = await sendEmail(user.email, "confirmemail", message)
          if (info?.accepted?.length) {
            return res.status(200).json({ massage: " your new token" })
          } else {
             return  next(Error("email regicted"))
  
          }
  
  
  
  
        }
      }
    }
  
  
  }
  )