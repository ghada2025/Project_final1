"use client"
import { CircleX, Mail, MapPin, Minus, Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Product = {
    _id: string,
    name: string,
    title: string,
    color: string[],
    size: string[],
    description: string,
    price: number,
    soldcount: number,
    stockQuantity: number,
    image: string,
    category: string,
    brand: string,
    discount: number,
    quantity: number
}

export default function Order() {
    const [cart, setCart] = useState<Product[]>([])
    //const [step, setStep]
    // const [discount, setDiscount]
    const [totalPrice, setTotalPrice]  = useState(0)
    // useRef of fields from dialog
    // function hanldeclick
    // construct new object based on cart
    // const products = cart.map((product) => { quatity: product.quantity, product: product._id})
    // send request to backend with useRef informations + products + discount
    // setstep to 2

    // function getPrencentage
    // send request POST with code promo
    // translate to json
    // reponse with discount*
    // set Dicount (res.discount)
    // set total price setPrice(totalPrice - totalPrice * res.discount.percentage)

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
            // update totalPrice with price of products with their quanitities
        }
    }, []);

    const removeFromCart = (productId: string) => {
        console.log("ID à supprimer :", productId);
        console.log("Cart avant suppression :", cart);
        const updatedCart = cart.filter((item) => item._id !== productId);
        console.log("Cart après suppression :", updatedCart);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
    return (
        <>
        {/* Breadcrumb */}       
        <div className="bg-gray-50">
                <ul className="container text-[12px] flex flex-row space-x-5 justify-center mb-7 py-3 font-semibold">
                    <li className="text-orange-500">Home</li>
                    <li className="text-gray-200">/</li>
                    <li>Hot Deals</li>
                </ul>
        </div>
        {/* Order */}
        <div className="container justify-center flex flex-row ">
            <div>
                {/* Order */}
                <div className=" justify-between px-5 py-2 border-b-2 border-gray-200 mb-3 font-semibold  flex flex-row ">
                    <div>Product</div>
                    <div className="flex flex-row justify-between w-1/2">
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                    </div>
                </div>
                {cart.length === 0 ? (
                <p>Votre panier est vide.</p>
                ) : (
                cart.map((product, index) => ( 
                    <div className=" justify-between px-5 py-10 border-b-2 border-gray-200 mb-3 flex flex-row ">
                    
                    <div className="flex flex-row justify-between items-center gap-5">
                        <CircleX onClick={() => removeFromCart(product._id)}  className="cursor-pointer text-red-300" />
                        <img src={product.image} alt="Nike Air Max" className="w-32 h-32 border rounded-lg cursor-pointer" />
                        <p className="font-semibold text-[16px]">{product.name}</p>
                    </div>
                    {/* Quantity */}
                    <div className="flex flex-row justify-between items-center font-semibold  w-1/2">
                        <p className="text-[18px] text-gray-800">{product.price}</p>
                        <div className="mt-4 flex items-center">
                            <button className="px-4 py-2 bg-gray-50 rounded-l-ms "><Minus color="#F47D20" /></button>
                            <div className="w-12 h-10 text-center bg-gray-50 pt-2 ">{product.quantity}</div>
                            <button className="px-4 py-2 bg-gray-50 rounded-l-ms"><Plus color="#F47D20" /></button>
                        </div>
                        <p className="text-[18px] text-gray-800">{product.price * product.quantity}</p>
                    </div>
                </div>
                ))
            )}
                {/* Total */}
                <div className="flex flex-row justify-between items-center py-10">
                    {/* Promo Code */}
                    <div className="flex flex-row justify-center items-center w-1/3">
                        <input type="text" placeholder="Promo Code" className="border-2 border-gray-200 rounded-l-lg h-10 py-2 px-3" />
                        <button className="bg-[#F47D20] text-white py-3 px-5 h-10 flex items-center justify-center rounded-r-lg w-[80px]" onClick={getPrencentage}>Apply</button>
                    </div>
                    {/* Total */}
                    <div className="w-1/2">
                        <div className="flex flex-row justify-between items-center font-semibold ">
                            <p>Subtotal:</p>
                            <p>8000 DA</p>
                        </div>
                        <div className="flex flex-row justify-between items-center font-semibold py-3  ">
                            <p>Shepping free:</p>
                            <p>1000 DA</p>
                        </div>
                        <div className="flex flex-row justify-between items-center font-semibold  ">
                            <p>Copun:</p>
                            <p>No</p>
                        </div>
                        <div className="flex flex-row justify-between items-center font-bold py-5 text-2xl ">
                            <p>TOTAL:</p>
                            <p>9000 DA</p>
                        </div>
                        <Dialog>
                            <DialogTrigger className="bg-[#F47D20] text-white py-3 px-5 rounded-lg w-full">Checkout</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle className="text-orange-500 text-center m-2">COMFIRM ORDER</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-row gap-5">
                                    {/*input gauche*/}
                                    <div className="flex flex-col gap-2 w-1/2">
                                        <Input type="text" placeholder="First name" className="border p-2 rounded w-full bg-gray-100 focus:outline-none focus:border-black" required />
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1.5 text-gray-400" />
                                            <Input type="email" placeholder="E-mail" className="border p-2 pl-10 rounded w-full bg-gray-100 focus:outline-none focus:border-black" required />
                                        </div>
                                        <Input type="text" placeholder="Phone number" className="border p-2 rounded w-full bg-gray-100 focus:outline-none focus:border-black" required />                                    
                                    </div>
                                    {/*input droite*/}
                                    <div className="flex flex-col gap-2 w-1/2">
                                        <Input type="text" placeholder="Last name" className="border p-2 rounded w-full bg-gray-100 focus:outline-none focus:border-black" required />
                                        <div className="relative">
                                            <MapPin color="#F47D20" className="absolute left-48  top-5 w-8 h-4  text-gray-400" />
                                            <Input type="text" placeholder="Address" className="border h-[80px] p-2 pl-10 rounded w-full bg-gray-100 focus:outline-none focus:border-black" required />
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer">Confirm</Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}