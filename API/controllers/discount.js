import { Discount } from "../models/discount.js"

export async function getOneDiscount(req,res){
    try {
        const discount = await Discount.findOne({code: req.params.promoCode })
        res.status(200).json(discount)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in getting discount" })
    }
}
export async function alldiscount(req, res) {
    try {
        const discount = await Discount.find().populate("usersUsed" , "firstName lastName")
        res.status(200).json(discount)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in getting discount" })
    }
}
export async function creatediscount(req, res) {
    try {
        const { event, code, percentage, maxUses, expirationDate } = req.body
        const discount = { event, code, maxUses, expirationDate, percentage }
        const newdiscount = new Discount({ discount })
        await newdiscount.save()
        res.status(200).json({ message: "discount created successfully" })
    } catch (error) {
        console.log(error)
        res.json({ message: "error in creating discount" })
    }
}
export async function updatediscount(req, res) {
    try {
        const { event, code, percentage, maxUses, expirationDate, appliesTo } = req.body
        const discount = { event, code, percentage, maxUses, expirationDate, appliesTo }
        const updateddiscount = await Discount.findByIdAndUpdate(req.params.id, { discount })
        res.status(200).json({ message: "discount updated successfully", data: updateddiscount })
    } catch (error) {
        console.log(error)
        res.json({ message: "error in updating discount" })
    }
}
export async function deletediscount(req, res) {
    try {
        await Discount.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "discount deleted successfully" })
    } catch (error) {
        console.log(error)
        res.json({ message: "error in deleting discount" })
    }
}