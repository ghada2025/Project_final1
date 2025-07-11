import { Discount } from "../models/discount.js"
import {Order} from "../models/order.js"
import { Product } from "../models/product.js"
import { User } from "../models/user.js"

export async function getOrders(req, res) {
    try {
        const orders = await Order.find().populate("user" , "firstName lastName")
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in getting orders" })
    }
}

export async function createOrder(req, res) {
    try {
        const { wilaya, address, phoneNumber, products, discountCode, totalPrice } = req.body;
        const type1 = req.body.type?.toLowerCase();
        // Vérifier l'utilisateur
        console.log(req.cookies.user)
        const user = await User.findById(req.cookies.user);
        if (!user) return res.status(401).json({ message: "User not found" });

        // Chercher la réduction si un code est fourni
        let discount = null;
        
        if (discountCode) {
            discount = await Discount.findOne({ code: discountCode });

            if (!discount) {
                return res.status(400).json({ message: "Code de réduction invalide" });
            }

            if (discount.expirationDate && new Date(discount.expirationDate) < new Date()) {
                return res.status(400).json({ message: "Code expiré" });
            }

            if (discount.maxUses && discount.usedtimes >= discount.maxUses) {
                return res.status(400).json({ message: "Ce code a atteint le nombre maximal d'utilisations" });
            }

            if (discount.usersUsed.includes(user._id)) {
                return res.status(400).json({ message: "Vous avez déjà utilisé ce code" });
            }

            
        }

        // Créer la commande
        const order = new Order({
            user: user._id,
            wilaya,
            type: type1,
            address,
            phoneNumber,
            products,
            totalPrice,
            discount: discount ? discount._id : null,
            status: "pending"
        });

        // Sauvegarder la commande
        await order.save();

        // Mise à jour discount : count et user
            discount.usedtimes += 1;
            discount.usersUsed.push(user._id);
            await discount.save();
        
        // Mettre à jour le stock des produits
        for (const item of products) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: {
                    stockQuantity: -item.quantity,
                    soldcount: item.quantity
                }
            });
        }

        // Ajouter la commande à l'utilisateur
        user.orders.push(order._id);
        await user.save();

        res.status(200).json(order);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in confirming order" });
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



