import Discount from "../models/discount.js"
export async function alldiscount(req, res) {
    try {
        const discount = await Discount.find()
        res.status(200).json(discount)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in getting discount" })
    }
}

export async function creatediscount(req, res) {
    try {
        const { event, code, usedtimes, percentage } = req.body
        const discount = { event, code, usedtimes, percentage }
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
        const { event, code, usedtimes, percentage } = req.body
        const discount = { event, code, usedtimes, percentage }
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