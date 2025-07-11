"use client"
import { New } from "@/components/New";
import { Grip, Heart,  Menu, ShoppingCart } from "lucide-react";
import {  useEffect, useState } from "react";
import Link from "next/link";
import SliderRange from "@/components/sliderRange";
import { NavBar } from "@/components/NavBar";

type Product = {
    _id: number;
    title: string;
    color: string;
    size: string;
    description: string;
    price: number;
    soldcount: number;
    stockQuantity: number;
    images: [{
        url: string,
        alt: string,
        main: boolean
    }];
    category: string;
    brand: string;
    discount: number;
    priceAfterDiscount: number;
    url: string
}

export default function Home() {
    const [products, setProducts] = useState([])
    const [filterProducts, setFilteredProducts]  = useState([])
    const [sortBy, setSortBy] = useState("default")
    const [itemsToShow, setItemsToShow] = useState("all")
    const [brands, setBrands] = useState([])
    const [colors, setColors] = useState([])

    useEffect(() => {
        let updatedProducts = [...products]
        if (sortBy === "price") {
            updatedProducts.sort((a:Product, b:Product) => a.priceAfterDiscount - b.priceAfterDiscount)
        }
        if (sortBy === "name") {
            updatedProducts.sort((a:Product, b:Product) => a.title.localeCompare(b.title, ['en','fr'], { sensitivity: 'base' }))
        }
        if (itemsToShow === "6") {
            updatedProducts = updatedProducts.slice(0, 6)
        }
        if (itemsToShow === "12") {
            updatedProducts = updatedProducts.slice(0, 12)
        }
        setFilteredProducts(updatedProducts)

    },[itemsToShow, sortBy])

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

    useEffect(() => {
        async function fetchData() {
            const data = await fetch ("http://localhost:5007/products/colors")
            const colors =  await data.json()
            setColors(colors)
        }
        fetchData()
    },[])

    

    return (
        <>
            <NavBar />
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
                                <SliderRange products={products} setFilteredProducts={setFilteredProducts}></SliderRange>
                                
                            </div>
                        {/* Colors */}
                            <div className="mb-5 bg-gray-50 p-4 rounded-sm">
                                <h2 className="text-lg font-bold mb-3">Color</h2>
                                <div className="flex space-x-3 flex-wrap">
                                    {colors.map((color: string, index: number) => (
                                        <span
                                            key={index}
                                            className={`
                                                w-6 h-6 
                                                mb-3 
                                                rounded-full 
                                                cursor-pointer 
                                                border 
                                                border-gray-300 
                                                transition 
                                                duration-200 
                                                ease-in-out 
                                                shadow-sm 
                                                hover:scale-110 
                                                hover:shadow-md 
                                                hover:border-blue-500
                                            `}
                                            style={{ backgroundColor: color }}
                                            ></span>

                                    ))}
                                </div>
                            </div>
                    </aside>
                    <div>
                        <New />
                        <div className="flex items-center justify-between bg-white p-4 shadow-md mb-8">
                            <div className="flex items-center  space-x-5"><span className="text-gray-600 font font-semibold text-sm">{filterProducts.length} Products</span>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600 text-sm">Sort By</span>
                                    <select className="border w-20 p-1 rounded-sm" onChange={
                                        (e) => {
                                            const value = e.target.value
                                            setSortBy(value)
                                        }

                                    }>
                                        <option value="default">Default</option>
                                        <option value="price">Price</option>
                                        <option value="name">Name</option>
                                    </select>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600 text-sm">Show</span>
                                    <select className="border w-20 p-1 rounded-sm" onChange={(e) => {
                                        const value = e.target.value
                                        setItemsToShow(value)
                                    }}>
                                    <option value="all">all</option>
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
                                        <img src={product.images[0].url} alt={product.title} className="w-full rounded-lg h-[180px]"/>
                                        <div className="absolute top-2 right-2 flex space-x-2">
                                        <span className="bg-white p-2 rounded-full shadow text-orange-500"><Heart color="#FF8540" /></span>
                                        <span className="bg-white p-2 rounded-full shadow text-orange-500"><ShoppingCart color="#FF8540" /></span>
                                        </div>
                                    </div>
                                    <h3 className="font-bold mt-3">{product.title}</h3>
                                    <div className="flex items-center justify-center my-2 text-yellow-400">
                                        {"★".repeat(4)}{"☆".repeat(5 - 4)}
                                    </div>
                                    {product.discount === 0 ? <p className="text-blue-600 font-bold text-lg">${product.price}</p>:
                                    <p className="text-blue-600 font-bold text-lg">
                                        ${product.priceAfterDiscount} <span className="text-gray-400 line-through mx-2">${product.price}</span>{" "}
                                        <span className="text-red-500 text-sm">{product.discount } % OFF</span>
                                    </p>}
                                    </div>
                                </Link>
                            ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}