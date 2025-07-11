import bcrypt from "bcrypt";
import { User } from "../models/user.js";
const MILILSECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

// POST coté client 
export async function Signup(req, res) {
    try {
        const { firstName, lastName, birthday, email, password, codePostal, wilaya, address, phoneNumber, role } = req.body;

        // Vérifie si l'email existe déjà
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Client already exists" });
        }

        // Hashage du mot de passe
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Création du nouvel utilisateur avec conversion de birthday
        const newUser = new User({
            firstName,
            lastName,
            birthday: new Date(birthday), // Convertir en Date
            email,
            password: hash,
            codePostal,
            wilaya,
            address,
            phoneNumber,
            role,
            orders: []
        });

        await newUser.save();
        res.status(201).json({ user: newUser });

    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}
// POST coté client 
export async function Signin(req, res) {
    try{
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            await new Promise(resolve => setTimeout(resolve, 50));
            return res.status(400).json({
                message: "Password or email doesn't exists"
            })
        } // 200ms
        const passwordMatch = bcrypt.compareSync(password, user.password)
            if (!passwordMatch) {
                res.status(400).json({ message: "Password or email doesn't exists" })
            }
        let options = {
            maxAge: MILILSECONDS_IN_A_DAY * 14, // would expire after 15 minutes
            httpOnly: true, // The cookie only accessible by the web server CSRF
        }
        res.cookie('user', user.id, options)
        res.json({
            user: user
        })
    } catch (error){
        console.log(error)
        res.json({ message: "error in logging in client" })
    }
}
// GET coté client && coté admin /me 
export async function getUserByIdFromCookies(req, res) {
    try {
        console.log(req.cookies.user)
        if (!req.cookies.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const user = await User.findById(req.cookies.user)
        res.json(user)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in getUserById controller" })
    }
}
// GET coté admin
export async function getUser(req, res) {
    try{
        const {id} = req.params
        const userExists = await User.findById(id)
        res.status(200).json(userExists)
    } catch (error){
        console.log(error)
        res.json({ message: "error in getting client" })
    }
}
// GET coté admin
export async function getAllUsers(req, res) {
    try{
        const users = await User.find()
        res.status(200).json(users)
    } catch (error){
        console.log(error)
        res.json({ message: "error in getting clients" })
    }
}
// PUT coté admin
export async function updateUser(req, res) {
    try{
        const { firstName, lastName, birthday, email, codePostal, wilaya, address, phoneNumber, role, orders } = req.body
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { firstName, lastName, birthday, email, codePostal, wilaya, address, phoneNumber, role, orders }, { new: true })
        res.status(200).json({ message: "Client updated successfully", data: updatedUser })
    } catch (error){
        console.log(error)
        res.json({ message: "error in updating client" })
    }
}
// DELETE coté admin
export async function deleteUser(req, res) {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Client deleted successfully" })
    } catch (error){
        console.log(error)
        res.json({ message: "error in deleting client" })
    }
}