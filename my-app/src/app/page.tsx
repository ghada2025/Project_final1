import { Hero } from "@/components/Herro";
import { NavBar } from "@/components/NavBar";
import { NavBar2 } from "@/components/NavBar2";
import { New } from "@/components/New";
import { Heart, ShoppingCart } from "lucide-react";

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
  images: [{
    url: string;
    alt: string;
    main: boolean
  }];
  category: string;
  brand: string;
  discount: number;
  priceAfterDiscount: number;
};

export default async function Home() {
  const data = await fetch("http://localhost:5007/products/bestsellers")
  const products = await data.json()
  
  return (
    
        <>
          <NavBar2 />
          <Hero />
          <section className="text-center mt-[200px]">
            <h2 className="text-2xl font-bold mb-8">BEST SELLER</h2>
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-5 max-w-[1200px]">
              {products.map((product: Product) => (
                <div key={product._id} className="bg-white shadow-lg rounded-xl p-4 border max-w-[300px] max-h-[400px] ">
                  <div className="relative">
                    <img src={product.images[0].url} alt={product.title} className="w-full h-[250px] rounded-lg"/>
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <span className="bg-white p-2 rounded-full shadow text-orange-500"><Heart color="#FF8540" /></span>
                      <span className="bg-white p-2 rounded-full shadow text-orange-500"><ShoppingCart color="#FF8540" /></span>
                    </div>
                  </div>
                  <h3 className="font-bold mt-3">{product.title}</h3>
                  <div className="flex items-center justify-center my-2 text-yellow-400">
                    {"★".repeat(4)}{"☆".repeat(5 - 4)}
                  </div>
                  <p className="text-blue-600 font-bold text-lg">
                    ${product.priceAfterDiscount} <span className="text-gray-400 line-through mx-2">${product.price}</span>{" "}
                    <span className="text-red-500 text-sm">{product.discount} % OFF</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
          <div className="text-center mt-10 mb-7">
              <a href="#" className="text-orange-500 font-bold border-b-2 border-orange-500 hover:border-orange-700 hover:text-orange-700">LOAD MORE</a>
          </div>
          <New />
          <section className="text-center py-10">
            
            <h2 className="text-2xl font-bold mb-8">SERVICES</h2>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5 items-center">
              <div className="flex flex-col items-center">
                <img src="shipping.png" alt="Shipping" className="w-16 h-16 mb-3" />
                <h3 className="font-bold">SHIPPING AVAILABLE</h3>
                <p className="text-gray-600 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>

              <div className="flex flex-col items-center">
                <img src="refund.png" alt="Refund" className="w-16 h-16 mb-3" />
            <h3 className="font-bold">REFUND AVAILABLE</h3>
                <p className="text-gray-600 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <img src="support.png" alt="Support" className="w-16 h-16 mb-3" />
                <h3 className="font-bold">SUPPORT 24/7</h3>
                <p className="text-gray-600 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6">BRANDS</h2>
            <div className="flex justify-center space-x-6">
              <img src="brands.png" alt="Brands" className="w-32  mb-8" />
              <img src="brands.png" alt="Brands" className="w-32  mb-8" />
              <img src="brands.png" alt="Brands" className="w-32  mb-8" />
              <img src="brands.png" alt="Brands" className="w-32  mb-8" />
            </div>
          </section>
        </>
  );
}
