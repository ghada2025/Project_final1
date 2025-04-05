import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black text-white py-10 flex flex-col justify-center items-center">
            <div className="container px-5 grid grid-cols-1 md:grid-cols-4  text-center md:text-left ">
                <div>
                    <img src="/logo1.png" alt="logo1" className="h-10 cursor-pointer" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Learn More</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-orange-500 cursor-pointer">About Us</a></li>
                        <li><a href="#" className="hover:text-orange-500 cursor-pointer">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-orange-500 cursor-pointer">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                    <p className="cursor-pointer">Email: <a href="mailto:Bouzouniaferiel@gmail.com" className="hover:text-orange-500">Bouzouniaferiel@gmail.com</a></p>
                    <p className="cursor-pointer">Phone Number: <span className="hover:text-orange-500 cursor-pointer">0558183175</span></p>
                </div>
                <div className="flex justify-center items-center space-x-5 ">
                    <a href="#" className="text-xl hover:text-orange-500 cursor-pointer"><Facebook /></a>
                    <a href="#" className="text-xl hover:text-orange-500 cursor-pointer"><Instagram /></a>
                    <a href="#" className="text-xl hover:text-orange-500 cursor-pointer"><Twitter /></a>
                    <a href="#" className="text-xl hover:text-orange-500 cursor-pointer"><Youtube /></a>
                </div>
            </div>
            <div className="text-center border-t border-gray-700 mt-8 pt-5 text-sm w-full">
                © 2022 | All Rights Reserved
            </div>
        </footer>

    )
}