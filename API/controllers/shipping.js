import { Shipping } from "../models/shipping.js"

export async function getAllShippings(req, res) {
    try {
        const shippings = await Shipping.find().sort({ wilaya: 1 })
        res.status(200).json(shippings)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in getting shippings" })
    }
}

export async function  getOneShipping(req,res){
    try{
        const { wilaya } = req.params
        const shipping = await Shipping.findOne({wilaya:wilaya})
        res.status(200).json(shipping)
    } catch (error) {
        console.log(error)
        res.json({message:"error in getting shipping"})
    }
}

export async function createShipping(req,res){
    try{
        const { wilaya, priceHome , priceOffice } = req.body
        const shipping = new Shipping({ wilaya, priceHome , priceOffice })
        await shipping.save()
        res.status(200).json({shipping, message:"shipping created successfully"})
    } catch (error) {
        console.log(error)
        res.json({message:"error in creating shipping"})
    }
}

export async function deleteShipping(req,res){
    try{
        await Shipping.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"shipping deleted successfully"})
    } catch (error) {
        console.log(error)
        res.json({message:"error in deleting shipping"})
    }
}

export async function updateShipping(req,res){
    try{
        const { wilaya, priceHome , priceOffice } = req.body
        const shipping = await Shipping.findByIdAndUpdate(req.params.id, { wilaya, priceHome , priceOffice }, { new: true })
        res.status(200).json({shipping, message:"shipping updated successfully"})
    } catch (error) {
        console.log(error)
        res.json({message:"error in updating shipping"})
    }
}