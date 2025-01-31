import express from 'express'
import dotenv from 'dotenv'
import DBConnection from './DBConfig/Connection.js'
import cors from 'cors'
import userRouter from './Routers/user.router.js'
import courseRouter from './Routers/course.router.js'
import cartRouter from './Routers/cart.router.js'
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())


const port = process.env.PORT || 5000

DBConnection()

app.use('/auth',userRouter)
app.use('/course',courseRouter)
app.use('/cart',cartRouter)

app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
    
})

