import { Product } from "../models/product.js"
export async function getProducts(req, res) {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
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
export async function createProduct(req, res) {
    try {
        const { name, title, color, size, description, price, soldcount, stockQuantity, image, category, brand, discount } = req.body
        const newProduct = new Product({ name, title, color, size, description, price, soldcount, stockQuantity, image, category, brand, discount })
        await newProduct.save()
        res.status(200).json({ message: "Product created successfully" })
    } catch (error) {
        console.log(error)
        res.json({ message: "error in creating product" })
    }   
}
export async function updateProduct(req, res) {
    try {
        const { name, title, color, size, description, price, soldcount, stockQuantity, image, category, brand, discount } = req.body
        const updatedproduct = await Product.findByIdAndUpdate(req.params.id,{
        name,
        title,
        color,
        size,
        description,
        price,
        soldcount,
        stockQuantity,
        image,
        category,
        brand,
        discount
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

export async function getBestProducts (req, res) {
    try {
        const bestProducts = await Product.find().sort({ soldcount: -1 }).limit(6)
        res.status(200).json(bestProducts)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in getting best products" })
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

export async function getName (req, res) {
    try {
        const name = await Product.find().sort({ name: 1 })
        res.status(200).json(name)
    } catch (error) {
        console.log(error)
        res.json({ message: "error in getting name" })
    }
}