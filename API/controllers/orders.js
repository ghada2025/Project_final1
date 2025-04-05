import {Order} from "../models/order.js"
import { Product } from "../models/product.js"
import { User } from "../models/user.js"

export async function getOrders(req, res) {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in getting orders" })
    }
}

export async function createOrder(req, res) {
    try {
        const {firstName, lastName, email, address, phoneNumber, products, wilaya, discountCode } = req.body
        // find for the discount with code 
        const discount = await Discount.find({code: discountCode})
        // find shipping with wilaya
        const shipping = await Shipping.find({wilaya: wilaya})
        // create order with shipping + discount (ids)
        const order = new Order({ firstName, lastName, email, address, phoneNumber, products, shipping: shipping._id, discount: discount._id , status: "pending" })
        // [{quantity: 2, product: "483948389438"}, {quantity: 5, product: "483948938949384"}]
        products.forEach((product) => {           
            Product.findByIdAndUpdate(product.product, { $inc: { stockQuantity: -quantity, soldcount: quantity }})
        })
        // add the order to the user
        const user = await User.find({ email })
        if(user){
            user.orders.push(order._id)
            await user.save()            
        }        
        // save order
        await order.save()
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in confirming order" })
    }
}

export async function  updateOrder(req, res) {
    try {
        const {id} = req.params
        const {status} = req.body
        const order = await Order.findById(id)
        order.status = status
        await order.save()
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in confirming order" })
    }
}

export async function deleteOrder(req, res) {
    try {
        const {id} = req.params
        await Order.findByIdAndDelete(id)
        res.status(200).json({ message: "order deleted successfully" })
    } catch (error) {
        console.log(error)
        res.json({ message: "error in deleting order" })    
    }
}


