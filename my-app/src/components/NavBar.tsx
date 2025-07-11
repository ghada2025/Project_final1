"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import axios from "axios";

export function NavBar() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function fetchUser() {
            try {
            const response = await axios.get("http://localhost:5007/users/me", {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
            });
            const user = response.data;
            console.log("user", user);
            } catch (error) {
            console.error(error);
            }
        }

        fetchUser();
    }, []); // ✅ tableau vide pour exécuter une seule fois


   // Fonction pour écouter les changements de localStorage
        const handleStorageChange = () => {
            const updatedCart = localStorage.getItem("cart");
            setCart(updatedCart ? JSON.parse(updatedCart) : []);
        };
    // Charger le panier depuis localStorage au montage
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
        // Ajouter un event listener pour détecter les changements
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);
    

    return (
        <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
            {/* Logo */}
            <div>
                <img src="/logo.png" alt="logo" className="h-10" />
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
                <Link href={"/"}>
                    <button className="hover:text-orange-500 font-bold">HOME</button>
                </Link>
                <div className="flex items-center space-x-1">
                    <button className="hover:text-orange-500 font-bold">Categories</button>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="hover:text-orange-500">
                            <ChevronDown className="w-5 h-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Men</DropdownMenuItem>
                            <DropdownMenuItem>Women</DropdownMenuItem>
                            <DropdownMenuItem>Kids</DropdownMenuItem>
                            <DropdownMenuItem>Accessories</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Link href={"/Home"}>
                    <button className="hover:text-orange-500 font-bold">Products</button>
                </Link>
                <Link href={"/order"}>
                    <button className="hover:text-orange-500 font-bold">Order</button>
                </Link>
                <Link href={"/contact"}>
                    <button className="hover:text-orange-500 font-bold">Contact</button>
                </Link>
            </div>

            {/* Icons + Profile */}
            <div className="flex items-center space-x-4">
                <Search className="w-5 h-5 cursor-pointer hover:text-orange-500" />
                <div className="relative cursor-pointer">
                    <Link href={"/order"}>
                        <ShoppingCart className="w-5 h-5 hover:text-orange-500" />
                    </Link>
                    <span className="absolute -top-3 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full px-2">
                        {cart.length}
                    </span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer">
                    <User className="w-5 h-5 hover:text-orange-500" />
                    <button className="hover:text-orange-500">user</button>
                </div>
            </div>
        </nav>
    );
}
