const express  = require("express")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv")
const cors = require('cors')
const authRoute = require("./routes/auth")
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const multer = require('multer')
const path = require("path")
const app = express()


//database

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
}


//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been uploaded successfully!")
})


//middleawres
dotenv.config()
app.use(express.json())
app.use(cors({origin:"https://blog-market.vercel.app",credentials:true}))
app.use(cookieParser())
app.use('/images',express.static(path.join(__dirname,'/images')))
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/comments',commentRoute)


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log(`app is running port`,process.env.PORT)
})