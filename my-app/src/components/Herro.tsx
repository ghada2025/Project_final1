export function Hero() {
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
                {[1, 2, 3].map((_, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md w-50 h-50  translate-y-10"> 
                        <div className="flex gap-2">
                            <p className="text-gray-800 text-sm font-semibold text-justify">FS - Nike Air Max 270 React...</p>
                            <p className="text-blue-500 text-sm font-bold">$299.43</p>
                        </div>
                        <img src="/product.png" alt="product" className="w-full h-20 object-cover mt-2" />
                        <div className="flex gap-4 justify-center items-center mt-3 text-sm">
                            <p className="text-gray-400 line-through">$534.33</p>
                            <p className="text-red-500 font-bold">24% Off</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
