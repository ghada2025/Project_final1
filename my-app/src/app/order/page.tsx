"use client"
import { CircleX, MapPin, Minus, Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { NavBar } from "@/components/NavBar";

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
    images: [{
        url: string,
        alt: string,
        main: boolean
    }],
    category: string,
    brand: string,
    discount: number,
    quantity: number,
    priceAfterDiscount: number
}
type discount = {
    percentage: number
}
type shipping = {
    _id: string,
    wilaya: string,
    priceHome: number,
    priceOffice: number
}
type wilayaShipping = {
    _id: string,
    wilaya: string,
    priceHome: number,
    priceOffice: number
}

export default function Order() {
    // UseState---------------------------------------------------------
    const [cart, setCart] = useState<Product[]>([])
    const [discount, setDiscount] = useState <discount | null > (null)
    const [shipping, setShipping] = useState<shipping[]>([])
    const [wilayaShipping, setWilayaShipping] = useState<wilayaShipping | null>(null)
    const [shippingType, setShippingType] = useState("")

    // UseRef------------------------------------------------------------
    const promoRef = useRef<HTMLInputElement>(null);
    const wilayaRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const shippingTypeRef = useRef<HTMLInputElement>(null);

    // Functions-----------------------------------------------------------

    // Fetch promoCode "discount"
    async function fetchDiscount() {
        const promoCode = promoRef.current?.value;
        try {
            const response = await fetch(`http://localhost:5007/discounts/${promoCode}`);
            const data = await response.json();
            setDiscount(data);
        } catch (error) {
            console.error(error);
        }  
    }
    // Fetch shipping "wilayaShipping"
    async function fetchShipping() {
        const wilaya = wilayaRef.current?.value;
        try {
            const response = await fetch(`http://localhost:5007/shipping/${wilaya}`);
            const wilayaShipping = await response.json();
            setWilayaShipping(wilayaShipping);
        } catch (error) {
            console.error(error);
        }
    }
    // Fetch all shippings "shipping"
    useEffect(() => {
            async function fetchShipping() {
                const response = await fetch(`http://localhost:5007/shipping`)
                const shipping = await response.json()
                setShipping(shipping)
            }
            fetchShipping()
    }, []);
    // Fetch post order "order"
    async function postOrder() {
        const discountCode = promoRef.current?.value;
        const wilaya = wilayaRef.current?.value;
        const address = addressRef.current?.value;
        const phoneNumber = phoneRef.current?.value;
        const type = shippingTypeRef.current?.value;
        const totalPrice = (totalPrice1 - (totalPrice1 * (discount === null ? 0 : discount.percentage)) + (wilayaShipping === null ? 0 : shippingType === "Home" ? wilayaShipping.priceHome : wilayaShipping.priceOffice)).toFixed(2)
        const products = cart
        try {
            const response = await fetch(`http://localhost:5007/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ discountCode, wilaya, address, phoneNumber, type, totalPrice, products }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    // Fetch cart from localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);
    // Remove product from cart
    const removeFromCart = (productId: string) => {
        const updatedCart = cart.filter((item) => item._id !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
    
    // Calculate total price
    const totalPrice1 = cart.reduce((acc, p) => {
    const price = Number(p.priceAfterDiscount);
    const qty = Number(p.quantity);
    return acc + price * qty;
    }, 0);

    // Update quantity
    const updateQuantity = (productId: string, newQuantity: number) => {
        const updatedCart = cart.map((item) => {
            if (item._id === productId) {
            return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };


    return (
        <>
        <NavBar />
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
                    <div key={product._id} className=" justify-between px-5 py-10 border-b-2 border-gray-200 mb-3 flex flex-row ">
                    
                    <div className="flex flex-row justify-between items-center gap-5">
                        <CircleX onClick={() => removeFromCart(product._id)}  className="cursor-pointer text-red-300" />
                        <img src={product.images[0].url} alt="Nike Air Max" className="w-32 h-32 border rounded-lg cursor-pointer" />
                        <p className="font-semibold text-[16px]">{product.title}</p>
                    </div>
                    {/* Quantity */}
                    <div className="flex flex-row justify-between items-center font-semibold  w-1/2">
                        <p className="text-[18px] text-gray-800">{product.priceAfterDiscount}</p>
                        <div className="mt-4 flex items-center">
                            <button className="px-4 py-2 bg-gray-50 rounded-l-ms" onClick={() => updateQuantity(product._id, product.quantity - 1)}><Minus color="#F47D20" /></button>
                            <div className="w-12 h-10 text-center bg-gray-50 pt-2 ">{product.quantity}</div>
                            <button className="px-4 py-2 bg-gray-50 rounded-l-ms" onClick={() => updateQuantity(product._id, product.quantity + 1)}><Plus color="#F47D20" /></button>
                        </div>
                        <p className="text-[18px] text-gray-800">{(product.priceAfterDiscount * product.quantity).toFixed(2)}</p>
                    </div>
                </div>
                ))
            )}
                {/* Total */}
                <div className="flex flex-row justify-between items-center py-10">
                    {/* Promo Code & Shipping */}
                    <div className="flex flex-col justify-center items-center gap-5">
                        {/* List Shipping Wilaya & Apply */}
                        <div className="flex flex-row justify-center items-center w-1/3">
                            <input ref={wilayaRef}  onChange={(e) => {
                                if (e.target.value.trim() === "") {
                                    setWilayaShipping(null); 
                                }
                            }} list="wilayaOptions" placeholder="Choisissez une wilaya"  className="border-2 border-gray-200 rounded-l-lg h-10 py-2 px-3" />
                            <datalist id="wilayaOptions">
                                {shipping.map((wilaya) => (
                                    <option key={wilaya._id} value={wilaya.wilaya} />
                                ))}
                            </datalist>
                            <button onClick={fetchShipping} className="bg-[#F47D20] text-white py-3 px-5 h-10 flex items-center justify-center rounded-r-lg w-[80px]" >Apply</button>
                        </div>
                        {/* Shipping Type Home & Office */}
                        <div className="flex flex-row justify-center items-center gap-5">
                            <p className="mr-2 font-semibold">Shipping:</p>
                            <div className="flex flex-row ">
                                <label className="mr-2">Home</label>
                                <input type="radio" name="Home" value="Home" onChange={(e) => setShippingType(e.target.value)} checked={shippingType === "Home"} />
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <label className="mr-2">Office</label>
                                <input type="radio" name="Office" value="Office" onChange={(e) => setShippingType(e.target.value)} checked={shippingType === "Office"} />
                            </div>
                        </div>
                        {/* Promo Code */}
                        <div className="flex flex-row justify-center items-center ">
                            <input type="text" ref={promoRef} onChange={(e) => {
                                if (e.target.value.trim() === "") {
                                    setDiscount(null); 
                                }
                            }} placeholder="Promo Code" 
                            className="border-2 border-gray-200 rounded-l-lg h-10 py-2 px-3" 
                            />
                            <button onClick={fetchDiscount} className="bg-[#F47D20] text-white py-3 px-5 h-10 flex items-center justify-center rounded-r-lg w-[80px]" >Apply</button>
                        </div>
                    </div>
                    {/* Total */}
                    <div className="w-1/2">
                        <div className="flex flex-row justify-between items-center font-semibold ">
                            <p>Subtotal:</p>
                            <p>{totalPrice1.toFixed(2)} DA</p>
                        </div>
                        <div className="flex flex-row justify-between items-center font-semibold py-3  ">
                            <p>Shepping :</p>
                            <p>{wilayaShipping === null ? "No" : shippingType === "Home" ? wilayaShipping.priceHome + " DA" : wilayaShipping.priceOffice + " DA" }</p>
                        </div>
                        <div className="flex flex-row justify-between items-center font-semibold  ">
                            <p>Copun:</p>
                            <p>{discount === null ? "No" : discount.percentage * 100 + "%" } </p>
                            
                        </div>
                        <div className="flex flex-row justify-between items-center font-bold py-5 text-2xl ">
                            <p>TOTAL:</p>
                            <p>{(totalPrice1 - (totalPrice1 * (discount === null ? 0 : discount.percentage)) + (wilayaShipping === null ? 0 : shippingType === "Home" ? wilayaShipping.priceHome : wilayaShipping.priceOffice)).toFixed(2)} DA</p>
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
                                        <Input type="text" ref={shippingTypeRef} placeholder="Shipping Type" className="border p-2 rounded w-full bg-gray-100 focus:outline-none focus:border-black" required />
                                        <Input type="text" ref={phoneRef} placeholder="Phone number" className="border p-2 rounded w-full bg-gray-100 focus:outline-none focus:border-black" required />                                    
                                    </div>
                                    {/*input droite*/}
                                    <div className="flex flex-col gap-2 w-1/2">
                                        <div className="relative">
                                            <MapPin color="#F47D20" className="absolute left-48  top-5 w-8 h-4  text-gray-400" />
                                            <Input type="text" ref={addressRef} placeholder="Address" className="border h-[80px] p-2 pl-10 rounded w-full bg-gray-100 focus:outline-none focus:border-black" required />
                                        </div>
                                    </div>
                                </div>
                                <Button onClick={postOrder} className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer">Confirm</Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}