import { User } from "../models/user.js";
export async function verifyIfAdmin(req, res, next) {
    // { cookies: { user: "4389jfdkslqmuiqfsqf "} }
    const { user } = req.cookies
    // get the cookie
    // find the user with this id
    const myUser = await User.findById(user)
    if (myUser.role === "admin") {
        next()
    } else {
        return res.status(401).json({ message: "Unauthorized" })
    }
}