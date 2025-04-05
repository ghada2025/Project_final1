export function New() {
    return (
        <section className="bg-orange-500 text-white py-10">
            <div className="container mx-auto px-5 flex flex-col md:flex-row items-center justify-center ">
                <div className=" text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-2">New sneakers Nike Air Max</h2>
                    <p className="text-lg mb-4">Performance and design. Taken right to the edge.</p>
                    <a href="#" className="font-bold border-b-2 border-white hover:text-gray-200">SHOP NOW</a>
                </div>
                <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                    <div className="bg-white p-4 rounded-3xl shadow-lg">
                        <img src="product.png" alt="Nike Air Max" className="w-60"/>
                    </div>
                </div>
            </div>
        </section>
    );
}