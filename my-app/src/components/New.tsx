"use client"
import { useEffect, useState } from "react"

export function New() {
    const [newArrival, setNewArrival] = useState<null | any>(null);

    useEffect(() => {
        async function fetchData() {
        const res = await fetch("http://localhost:5007/products/newArrival");
        const data = await res.json();
        setNewArrival(data);
        }
        fetchData();
    }, []);

    if (!newArrival) return null;

    return (
        <section className="bg-orange-500 text-white py-10">
        <div className="container mx-auto px-5 flex flex-col md:flex-row items-center justify-center">
            <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{newArrival.title}</h2>
            <p className="text-lg mb-4">{newArrival.description}</p>
            <a
                href={`/product/${newArrival._id}`}
                className="font-bold border-b-2 border-white hover:text-gray-200"
            >
                SHOP NOW
            </a>
            </div>

            <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
            <div className="bg-white p-4 rounded-3xl shadow-lg">
                <img
                src={newArrival.images[0].url || "/fallback.png"}
                alt={newArrival.title}
                className="w-60 object-cover"
                />
            </div>
            </div>
        </div>
        </section>
    );
}
