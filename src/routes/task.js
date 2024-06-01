import express from 'express'
import { createTask, deleteTask, readTask, toggleComplete, updateTask } from '../controllers/task.js'
import { veryfyUser } from '../middlewares/verifyUser.js'

const router = express.Router()

router.post('/task', veryfyUser, createTask)
router.get('/task', veryfyUser, readTask)
router.post('/task/u/:id', updateTask)
router.get('/task/d/:id', deleteTask)
router.get('/task/t/:id', toggleComplete)

export default router

