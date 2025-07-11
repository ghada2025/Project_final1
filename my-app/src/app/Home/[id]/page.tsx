"use client"
import { NavBar } from "@/components/NavBar";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";
import {  useEffect, useState } from "react";

type Product = {
    _id: number;
    title: string;
    color: string;
    size: string;
    description: string;
    price: number;
    soldcount: number;
    stockQuantity: number;
    images: string;
    category: string;
    brand: string;
    discount: number;
    priceAfterDiscount: number;
    url: string;
}

export default function Page() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1); 
    const [cart, setCart] = useState<Product[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        async function fetchProduct() {
            const response = await fetch(`http://localhost:5007/products/${id}`)
            const product = await response.json()
            setProduct(product)         
        }
        fetchProduct()
    }, []);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    function addToCart(product: Product) {
        const newCart = [...cart, { ...product, quantity }];
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }


    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };
    if (!product) {
        return <div>loading...</div>
    }
    return (
        <div>
            <NavBar />
            {/* Breadcrumb */}
            <div className="bg-gray-50">
                <ul className="container text-[12px] flex flex-row space-x-5 justify-center mb-7 py-3 font-semibold">
                    <li className="text-orange-500">Home</li>
                    <li className="text-gray-200">/</li>
                    <li>Hot Deals</li>
                </ul>
            </div>
            {/* Product */}
            <div key={product?._id} className="container justify-center p-5 flex flex-row gap-4 ">
                    {/* Product Image */}
                    <div className="flex flex-col">
                        {/* Grande image */}
                        <div>
                            <img
                            src={product.images[selectedIndex].url}
                            alt={product.title}
                            className="w-80 h-80 object-cover rounded-xl border"
                            />
                        </div>
                        {/* Petites images */}
                        <div className="flex justify-between gap-3 mt-4">
                            {product.images.map((img: string, index: number) => (
                            <img
                                key={index}
                                src={img.url}
                                alt={`${product.title} ${index}`}
                                onClick={() => setSelectedIndex(index)}
                                className={`w-20 h-20 rounded-lg cursor-pointer border transition duration-200 ${
                                selectedIndex === index ? "opacity-100 border-yellow-500" : "opacity-50"
                                }`}
                            />
                            ))}
                        </div>
                    </div>
                    {/* Product Details */}
                    <div>
                        <h2 className="text-2xl font-semibold">{product?.title}</h2>
                        {/* Rating */}
                        <div className="flex items-center gap-3 mt-2 text-yellow-500 pb-6 border-b-2 border-gray-100">
                            ⭐⭐⭐⭐⭐ <span className="text-gray-300 text-sm">0 reviews</span> 
                            <a href="#" className="text-blue-500 text-sm">Submit a review</a>
                        </div>
                        {/* Price */}
                        <div className="mt-4 text-xl font-bold text-blue-600 flex items-center gap-2.5 mb-3.5">
                            ${product.priceAfterDiscount} <span className="text-gray-400 line-through text-sm mx-2">${product?.price!}</span>
                            <span className="text-red-500 text-sm">{product?.discount!}% Off</span>
                        </div>
                        {/* Description */}
                        <div className="flex flex-col gap-3.5 pb-6 border-b-2 border-gray-100">
                            <p className="text-gray-600 mt-2 flex gap-10">Availability: <span className="text-green-500">{product?.stockQuantity}</span></p>
                            <p className="text-gray-600 flex gap-10">Category:<span> {product?.category}</span></p>
                            <p className="text-gray-600 font-bold ">{product?.brand}</p>
                        </div>
                        {/* Color */}
                        <div className="mt-4 flex items-center gap-10">
                            <span className="font-semibold">Select Color:</span>
                            <div className="flex space-x-3">
                                {product?.color?.map((color: string, index: number) => (
                                    <span 
                                        key={index}
                                        className="w-6 h-6 rounded-full border-2 border-orange-500 cursor-pointer hover:border-blue-700 hover:border-2" 
                                        style={{ backgroundColor: color }}
                                    ></span>
                                ))}

                            </div>
                        </div>
                        {/* Size */}
                        <div className="mt-4 flex gap-5 items-center pb-8 border-b-2 border-gray-100">
                            <span className="font-semibold">Size</span>
                            <select className="border px-10 py-2  rounded-md ml-2">
                                {product?.size?.map((size: string, index: number) => (
                                    <option key={index}>{size}</option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex flex-row justify-between pb-6 border-b-2 border-gray-100">
                            {/* Quantity */}
                            <div className="mt-4 flex items-center">
                                <button className="px-4 py-2 bg-gray-50 rounded-l-ms " onClick={decreaseQuantity} ><Minus color="#F47D20" /></button>
                                <div className="w-12 h-10 text-center bg-gray-50 pt-2 ">{quantity}</div>
                                <button className="px-4 py-2 bg-gray-50 rounded-l-ms" onClick={increaseQuantity}><Plus color="#F47D20" /></button>
                            </div>
                            {/* Add to Cart */}
                            <div className="mt-4">
                                <button onClick={() => addToCart(product)} className=" text-orange-500 px-6 py-2 rounded-md flex gap-3 items-center">
                                <ShoppingCart color="#F47D20" />Add To Cart
                                </button>
                            </div>
                        </div>
                        {/* Share */}
                        <div className="mt-6 flex space-x-2">
                            <button className="bg-blue-800 text-white px-4 py-2 rounded-md">🔵 Share on Facebook</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">🔷 Share on Twitter</button>
                        </div>
                    </div>
            </div>
            {/* Product Description */}
            <div className="container flex justify-center items-center mb-20">
                    <div className=" p-5 w-[1000px] bg-gray-50 rounded-lg shadow-md">
                        <div className="border-b border-gray-200">
                            <ul className="flex">
                                <li className="px-4 py-2 text-yellow-500 font-semibold relative">
                                    Product Information
                                    <span className="absolute left-0 bottom-0 w-full h-1 bg-yellow-500"></span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-4 text-gray-400 text-sm leading-relaxed">
                            <p>
                                {product?.description}
                            </p>
                        </div>
                    </div>
            </div> 
        </div>
    );
}