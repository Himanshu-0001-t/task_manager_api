import express from 'express'
import { logOut, signin, signup } from '../controllers/user.js'
import { veryfyUser } from '../middlewares/verifyUser.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/logout', veryfyUser, logOut)

export default router

