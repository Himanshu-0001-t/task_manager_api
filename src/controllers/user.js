import bcrypt from 'bcryptjs'
import userModel from '../models/user.js'
import createJwtToken from '../utils/createJWT.js'

export const signup = async (req, res) => {
    try {
        let { userName, email, password } = req.body

        if (!userName || !email || !password) {
            return res.json({ success: false, message: "all fields are required" }).status(400)
        }

        // check user in database 
        let existUser = await userModel.findOne({
            $or:
                [{ userName: userName }, { email: email }]
        })

        if (existUser) {
            return res.json({ success: false, message: "userName or email already exists" }).status(403)
        }

        // password hasing 
        let sault = await bcrypt.genSalt(10)
        let hashedPass = await bcrypt.hash(password, sault)

        // create a new user 
        let newUser = await new userModel({
            userName,
            email,
            password: hashedPass
        }).save()

        return res.json({ success: true, message: "user ceated successfully" }).status(200)

    } catch (error) {

        return res.json({ success: false, message: "Internal server error" }).status(500)
    }
}

export const signin = async (req, res) => {
    try {
        let { userName, email, password } = req.body

        if (!userName && !email) {
            return res.json({ success: false, message: "all fields are required" }).status(401)
        }

        if (!password) {
            return res.json({ success: false, message: "all fields are required" }).status(401)
        }

        // find user in database 
        let existUser = await userModel.findOne({ $or: [{ userName }, { email }] })

        if (!existUser) {
            return res.json({ success: false, message: "email or userName not found" }).status(404)
        }

        // password match 
        let ispasscorect = await bcrypt.compare(password, existUser.password)

        if (!ispasscorect) {
            return res.json({ success: false, message: "Wrong Credentials" }).status(422)
        }

        let token = await createJwtToken(existUser._id)

        if (!token) {
            return res.json({ success: false, message: "Internal server error" }).status(500)
        }

        let option = {
            httpOnly: true,
            secure: true,
            maxAge: 360000 * 60 * 60
        }

        return res.cookie("_manager_auth", token, option)
            .json({ success: true, message: "User signIn successfully" })
            .status(200)

    } catch (error) {

        return res.json({ success: false, message: "Internal server error" }).status(500)
    }
}

export const logOut = (req, res) => {

    try {
        return res.clearCookie("_manager_auth").json({ success: true, message: "User logged Out successfully" })

    } catch (error) {

        return res.json({ success: false, message: "Internal server error" })
    }
}