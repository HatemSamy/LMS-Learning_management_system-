import AsyncHandler from 'express-async-handler';
import mongoose from 'mongoose'
const connectDB  = AsyncHandler(async ()=>{
    try {
        return await mongoose.connect(process.env.DBURI)
    .then(res=>console.log(`DB Connected successfully on .........${process.env.DBURI} `))
    .catch(err=>console.log(` Fail to connect  DB.........${err} `))
    } catch (error) {
    res.status(400).json({message:"error in datebase",error})
        
    }
})
export default connectDB;