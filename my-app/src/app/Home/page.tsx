"use client"
import { New } from "@/components/New";
import { Grip, GripVertical, Heart,  Menu, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
    _id: number;
    name: string;
    title: string;
    color: string;
    size: string;
    description: string;
    price: number;
    soldcount: number;
    stockQuantity: number;
    image: string;
    category: string;
    brand: string;
    discount: number;
}

export default function Home() {
    const [products, setProducts] = useState([])
    const [filterProducts, setFilteredProducts]  = useState([])
    const [brands, setBrands] = useState([])
    const [selecteBrand, setSelectedBrand] = useState("")
    const [sortOption, setSortOption] = useState("")
    
    useEffect(() => {
        async function fetchData() {
            const data =  await fetch ("http://localhost:5007/products")
            const products =  await data.json()
            setProducts(products)
            setFilteredProducts(products)
            
        }
        fetchData()
    },[])

    useEffect(() => {
        async function fetchData() {
            const data = await fetch ("http://localhost:5007/products/brands")
            const brands =  await data.json()
            setBrands(brands)
            
        }
        fetchData()
    },[])

    

    return (
        <div className="mb-10">
            <div className="bg-gray-50">
                <ul className="container text-[12px] flex flex-row space-x-5 justify-center mb-7 py-3 font-semibold">
                    <li className="text-orange-500">Home</li>
                    <li className="text-gray-200">/</li>
                    <li>Hot Deals</li>
                </ul>
            </div>
            <div className="container justify-center px-5 flex flex-row ">
                <aside className="w-64 p-5 bg-white shadow-lg">
                    {/* Hot Deals */}
                        <div className="mb-5 bg-gray-50 p-4 rounded-sm">
                            <h2 className="text-lg font-bold mb-3">Brands</h2>
                            {brands.map((brand: any) => (
                                <div key={brand} onClick={() => {
                                    // setSelectedBrand(brand)                                 
                                    setFilteredProducts(products.filter((product:Product) => product.brand === brand))   
                                }} className="flex justify-between mb-3 font-semibold text-gray-700 hover:text-orange-500 hover:font-semibold cursor-pointer">{brand} <span> {
                                    products.filter((product:Product) => product.brand === brand).length 
                                    }</span></div>
                            ))}
                        </div>
                        
                    {/* Price Range */}
                        <div className="mb-5 bg-gray-50 p-4 rounded-sm">
                            <h2 className="text-lg font-bold mb-3">Prices</h2>
                            <div className="text-sm  mt-2 flex justify-between"><span className="font-semibold">Ranger:</span> $13.99 - $25.99</div>
                            <input type="range" min="10" max="200" className="w-full" />
                        </div>
                    {/* Colors */}
                        <div className="mb-5 bg-gray-50 p-4 rounded-sm">
                            <h2 className="text-lg font-bold mb-3">Color</h2>
                            <div className="flex space-x-3">
                                <span className="w-6 h-6 bg-blue-500 rounded-full cursor-pointer hover:border-blue-700 hover:border-2"></span>
                                <span className="w-6 h-6 bg-red-500 rounded-full cursor-pointer hover:border-red-700 hover:border-2"></span>
                                <span className="w-6 h-6 bg-yellow-500 rounded-full cursor-pointer hover:border-yellow-700 hover:border-2"></span>
                                <span className="w-6 h-6 bg-black rounded-full cursor-pointer hover:border-white hover:border-2"></span>
                            </div>
                        </div>
                </aside>
                <div>
                    <New />
                    <div className="flex items-center justify-between bg-white p-4 shadow-md mb-8">
                        <div className="flex items-center  space-x-5"><span className="text-gray-600 font font-semibold text-sm">{filterProducts.length} Products</span>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-600 text-sm">Sort By</span>
                                <select className="border w-20 p-1 rounded-sm">
                                    <option value="price">Price</option>
                                    <option value="name">Name</option>
                                    <option value="rating">Rating</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-600 text-sm">Show</span>
                                <select className="border w-20 p-1 rounded-sm">
                                <option value="6">6</option>
                                <option value="12">12</option>
                                <option value="24">24</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="p-2 rounded-md bg-gray-200 text-white">
                            <Grip color="#F47D20" />
                            </button>
                            <button className="p-2 rounded-md ">
                            <Menu color="#C1C8CE" />
                            </button>
                        </div>
                    </div>
                    <section className="text-center">
                        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-5 max-w-[1200px]">
                        {filterProducts.map((product : Product) => (
                            <Link href={`/Home/${product._id}`} key={product._id}>
                                <div key={product._id}  className="bg-white shadow-lg rounded-xl p-4 border max-w-[250px] max-h-[320px] ">
                                <div className="relative">
                                    <img src={product.image} alt={product.name} className="w-full rounded-lg"/>
                                    <div className="absolute top-2 right-2 flex space-x-2">
                                    <span className="bg-white p-2 rounded-full shadow text-orange-500"><Heart color="#FF8540" /></span>
                                    <span className="bg-white p-2 rounded-full shadow text-orange-500"><ShoppingCart color="#FF8540" /></span>
                                    </div>
                                </div>
                                <h3 className="font-bold mt-3">{product.name}</h3>
                                <div className="flex items-center justify-center my-2 text-yellow-400">
                                    {"★".repeat(4)}{"☆".repeat(5 - 4)}
                                </div>
                                {product.discount === 0 ? <p className="text-blue-600 font-bold text-lg">${product.price}</p>:
                                <p className="text-blue-600 font-bold text-lg">
                                    ${Math.floor(product.price - product.price * product.discount)} <span className="text-gray-400 line-through mx-2">${product.price}</span>{" "}
                                    <span className="text-red-500 text-sm">{product.discount * 100 } % OFF</span>
                                </p>}
                                </div>
                            </Link>
                        ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}