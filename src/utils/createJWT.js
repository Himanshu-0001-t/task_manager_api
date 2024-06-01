import jwt from 'jsonwebtoken'

const createJwtToken = async (userid) => {
    if (!userid) {
        return null
    }

    let token = jwt.sign({ id: userid }, process.env.JWT_SECRET, { expiresIn: "30d" })

    if (!token) {
        return null
    }

    return token
}

export default createJwtToken