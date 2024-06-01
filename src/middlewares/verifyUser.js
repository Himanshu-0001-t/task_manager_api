import jwt from "jsonwebtoken"
import userModel from "../models/user.js"

export const veryfyUser = async (req, res, next) => {
    try {
        const authToken = req.cookies._manager_auth || req.header("Authorization")?.replace("Bearer ", "")

        if (!authToken) {
            return res.json({ success: false, message: "unauthorised user" })
        }

        const decotedToken = jwt.verify(authToken, process.env.JWT_SECRET)

        if (!decotedToken) {
            return res.json({ success: false, message: "unauthorised user" })
        }

        const userInDb = await userModel.findOne({ _id: decotedToken.id })

        if (!userInDb) {
            return res.json({ success: false, message: "unauthorised user" })
        }

        req.user = userInDb

        next()

    } catch (error) {

        return res.json({ success: false, message: "Internal server error" })
    }
}
