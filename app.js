import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import  AppRouter from "./index.Router.js"
//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })

const app = express()
// setup port and the baseUrl
const port = process.env.PORT || 5000
AppRouter(app)

app.listen(port, () => console.log(`app listening on port ${port}!`))