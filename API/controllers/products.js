import { Discount } from "../models/discount.js"
import { Product } from "../models/product.js"


export async function getBestProducts (req, res) {
    try {
        const bestProducts = await Product.find().sort({ soldcount: -1 }).limit(6)
        res.status(200).json(bestProducts)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in getting best products" })
    }
}

export async function getdiscountedProducts(req, res) {
    try {
        const discountedProducts = await Product.find({ discount: { $gt: 5 } })
            .sort({ discount: -1 })
            .limit(3);
        res.status(200).json(discountedProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error in getting discounted products" });
    }
}


export async function getHotDeals(req, res) {
    try {
        const hotDeals = await Product.find({ priceAfterDiscount: { $lte: 50 } })
            .sort({ priceAfterDiscount: 1 });
        res.status(200).json(hotDeals);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error in getting hot deals" });
    }
}



export async function getNewArrival(req, res) {
    try {
        const newArrival = await Product.findOne()
            .sort({ createdAt: -1 })
        res.status(200).json(newArrival);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error in getting new arrivals" });
    }
}


export async function getBrands (req, res) {
    try {
        const brands = await Product.distinct("brand")
        res.status(200).json(brands)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in getting brands" })
    }
}

export async function getColors(req, res) {
    try {
        const colors = await Product.distinct("color");
        res.status(200).json(colors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error in getting colors" });
    }
}


export async function getProducts(req, res) {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in getting products" })
    }
}

export async function getProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in getting product" })
    }
}

// ADMIN
export async function createProduct(req, res) {
    try {
        const {
            title,
            color,
            size,
            description,
            price,
            soldcount,
            stockQuantity,
            images,
            category,
            brand,
            discount, 
            shipping
        } = req.body;

        
        let priceAfterDiscount = price;
        discountPercentage = discount * 100;
        priceAfterDiscount = parseFloat((price - (price * discount)).toFixed(2));
        

        const newProduct = new Product({
            title,
            color,
            size,
            description,
            price,
            soldcount,
            stockQuantity,
            images,
            category,
            brand,
            shipping,
            discount: discountPercentage,
            priceAfterDiscount
        });

        await newProduct.save();
        res.status(200).json({ message: "Produit créé avec succès", data: newProduct });

    } catch (error) {
        console.error("Erreur lors de la création du produit :", error);
        res.status(500).json({ message: "Erreur serveur lors de la création du produit" });
    }
}


export async function updateProduct(req, res) {
    try {
        const {
            title,
            color,
            size,
            description,
            price,
            soldcount,
            stockQuantity,
            images,
            category,
            brand,
            discount, 
            shipping
        } = req.body;
        let discountPercentage = 0;
        let priceAfterDiscount = price;

        if (discount) {
            const discountData = await Discount.findOne({ event: discount });

            if (!discountData) {
                return res.status(400).json({ message: "Événement de réduction introuvable." });
            }

            discountPercentage = discountData.percentage * 100;
            priceAfterDiscount = parseFloat((price - (price * discountData.percentage)).toFixed(2));
        }
        const updatedproduct = await Product.findByIdAndUpdate(req.params.id,{
        title,
            color,
            size,
            description,
            price,
            soldcount,
            stockQuantity,
            images,
            category,
            brand,
            shipping,
            discount: discountPercentage,
            priceAfterDiscount
        })
        res.status(200).json({ message: "Product updated successfully", data: updatedproduct })
    } catch (error) {
        console.log(error)
        res.json({ message: "error in updating product" })
    }
}
export async function deleteProduct(req, res) {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        console.log(error)
        res.json({ message: "error in deleting product" })
    }
}


