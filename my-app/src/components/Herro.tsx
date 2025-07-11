"use client"
import { useEffect, useState } from "react"

type discount = {
    _id: number;
    name: string;
    title: string;
    color: string;
    size: string;
    description: string;
    price: number;
    soldcount: number;
    stockQuantity: number;
    images: [{
        url: string;
        alt: string;
        main: boolean
    }];
    category: string;
    brand: string;
    discount: number;
    priceAfterDiscount: number;
}
export function Hero() {
    const [discounted, setDiscounted] = useState([])
    useEffect(() => {
            async function fetchData() {
                const data = await fetch ("http://localhost:5007/products/discounted")
                const discounted =  await data.json()
                setDiscounted(discounted)
            }
            fetchData()
        },[])
    return (
        <section className="relative h-[350px] bg-[url('/herro.png')] bg-cover bg-center text-center py-20 px-6">
            <div className="absolute inset-0 bg-black/40"></div>
    
            {/* Contenu du hero */}
            <div className="relative z-10 max-w-3xl mx-auto text-white">
            <h1 className="text-4xl font-bold">SHOPPING PLATFORM</h1>
            <p className="text-lg mt-4">
                Create screens directly in Method or add your images from Sketch or Figma. You can even sync designs from your cloud storage!
            </p>
            </div>
    
            {/* Produits */}
            <div className="z-10 flex justify-center gap-6 mt-10 ">
                {discounted.map((discount: discount ) => (
                    <div key={discount._id} className="bg-gray-50 p-4 rounded-lg shadow-md w-60 h-60  translate-y-10"> 
                        <div className="flex gap-2 justify-center items-center">
                            <div className="text-gray-800 text-sm font-semibold ">{discount.title}</div>
                        </div>
                        <div className="flex justify-center items-center w-50">
                            <img src={discount.images[0].url} alt={discount.title} className=" h-32 mt-2" />
                        </div>
                        <div className="flex gap-4 justify-center items-center mt-3 text-sm">
                            <div className="text-blue-500 text-sm font-bold">${discount.priceAfterDiscount}</div>
                            <p className="text-gray-400 line-through">${discount.price}</p>
                            <p className="text-red-500 font-bold">{discount.discount} % Off</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
