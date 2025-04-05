"use client";
import axios from "axios";
import { CircleGauge, CloudHail, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";

const steps = [
    { id: "step 1", title: "Personal infos" },
    { id: "step 2", title: "Address infos" },
    { id: "step 3", title: "Done" },
];
type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthday: string,    
    codePostal: string, 
    wilaya: string,
    address: string,
    phoneNumber: string, 
    role: string
}
export default function Signup() {
    const [currentStep, setCurrentStep] = useState(0);
    const [user, setUser] = useState<User>({firstName: "", lastName: "", email: "", password: "", birthday: "", codePostal: "", wilaya: "", address: "", phoneNumber: "", role: ""});
    
    const router = useRouter()
	
	// create a function to handle the onClick event of the button
	async function handleSignup() {
        console.log(user)
        try {
            const response = await axios.post(
                "http://localhost:5007/users/signup",
                {
                    email: user.email,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    birthday: user.birthday,  
                    codePostal: user.codePostal, 
                    wilaya: user.wilaya,
                    address: user.address,
                    phoneNumber: user.phoneNumber, 
                    role: user.role || "client"
                },
                {
                    // headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(response)

            router.push("/");
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
        }
    }
    
    const next = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }

    return (
        <div className="max-w-md my-10 mx-auto bg-white p-6 rounded-lg shadow-lg">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-6 relative">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex-1 text-center relative">
                        {/* Ligne entre les cercles */}
                        {index > 0 && (
                            <div className={`absolute top-5 left-0 -translate-x-12  right-0 h-1 ${index <= currentStep + 1 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                        )}

                        {/* Cercle de l'étape */}
                        <div className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full mx-auto ${index <= currentStep ? 'bg-orange-500 text-white' : 'bg-gray-300 text-white'}`}>
                            {index + 1}
                        </div>
                        
                        {/* Texte de l'étape */}
                        <p className="text-sm text-gray-600 mt-2">{step.title}</p>
                    </div>
                ))}
            </div>


            {/* Step Content */}
            {currentStep === 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-center mb-4">Your personal informations</h2>
                    <p className="text-center text-gray-500 mb-6">Please fill your informations</p>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input onChange={(e) => setUser(prev => ({ ...prev, firstName: e.target.value }))}   type="text" placeholder="First name" className="border p-2 rounded w-full focus:outline-none focus:border-black" required />
                            <input onChange={(e) => setUser(prev => ({ ...prev, lastName: e.target.value }))} type="text" placeholder="Last name" className="border p-2 rounded w-full focus:outline-none focus:border-black" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input onChange={(e) => setUser(prev => ({ ...prev, phoneNumber: e.target.value }))} type="text" placeholder="Phone number" className="border p-2 rounded w-full focus:outline-none focus:border-black" required />
                            <input  onChange={(e) => setUser(prev => ({ ...prev, birthday: e.target.value }))} type="date" placeholder="Birthday" className="border text-gray-500 p-2 rounded w-full focus:outline-none focus:border-black" required />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" />
                            <input onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))} type="email" placeholder="E-mail" className="border p-2 pl-10 rounded w-full focus:outline-none focus:border-black" required />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" />
                            <input onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))} type="password" placeholder="Password" className="border p-2 pl-10 rounded w-full focus:outline-none focus:border-black" required />
                        </div>
                    </form>
                </div>
            )}
            
            {currentStep === 1 && (
                <>
                    <h2 className="text-xl font-semibold text-center mb-4">Your Address informations</h2>
                    <p className="text-center text-gray-500 mb-6">Please fill your informations</p>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input onChange={(e) => setUser(prev => ({ ...prev, role: e.target.value }))}  type="text" placeholder="client or admin" className="border p-2 rounded w-full focus:outline-none focus:border-black" required />
                            <input onChange={(e) => setUser(prev => ({ ...prev, wilaya: e.target.value }))} type="text" placeholder="City" className="border p-2 rounded w-full focus:outline-none focus:border-black" required />
                        </div>
                        <input onChange={(e) => setUser(prev => ({ ...prev, codePostal: e.target.value }))} type="text" placeholder="Postal code" className="border p-2 rounded w-full focus:outline-none focus:border-black" required />
                        <input onChange={(e) => setUser(prev => ({ ...prev, address: e.target.value }))} type="text" placeholder="Home address" className="border p-2 rounded w-full focus:outline-none focus:border-black" required />
                    </form>
                </>
            )}
            
            {currentStep === 2 && (
                <>
                    <h2 className="text-xl font-semibold text-center mb-4">Congrats</h2>
                    <p className="text-center text-gray-500 mb-6">Your account has been created</p>
                    <div className="flex justify-center m-2">
                        <img src="/done.png" alt="done">
                        </img>
                    </div>
                </>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 mt-6">
                {currentStep > 0 && (
                    <button onClick={prev} className="w-1/2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer">
                        Previous step
                    </button>
                )}
                {currentStep < 2 || currentStep == 0 ? (
                    <button onClick={next} className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer">
                        Next step
                    </button>
                ) : (
                    <button onClick={handleSignup}  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer">
                        Register
                    </button>
                )}
            </div>
        </div>
    );
}
