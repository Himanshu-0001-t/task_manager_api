import express from 'express'
import dotenv from 'dotenv'
import connectToDB from './src/db.config.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import userRouter from './src/routes/user.js'
import taskRouter from './src/routes/task.js'

dotenv.config()
await connectToDB()
const app = express()

app.use(cookieParser())
app.use(cors({ path: "https://task-manager-p19y.onrender.com/" }))

app.use(express.json())

app.get('/', (req, res) => {
    res.json("helo")
})

app.use('/api/user', userRouter)
app.use('/api/', taskRouter)


app.listen(process.env.PORT, () => console.log("Server is running port", process.env.PORT))