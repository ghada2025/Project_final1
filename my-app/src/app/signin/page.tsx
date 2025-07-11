'use client'
import axios from 'axios';
import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const LoginForm = () => {
    function handleSubmit(e : any ) {
        e.preventDefault();
    }

    const router = useRouter()
	// create 2 useRef hooks for email and password
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	// create a function to handle the onClick event of the button
	async function handleLogin() {
		// send a POST request to the server with the email and password
		const response = await axios.post(
			"http://localhost:5007/users/signin",
			{
				email: emailRef.current?.value,
				password: passwordRef.current?.value,
			},
			{
				withCredentials: true,
			},
		)
		router.push("/")
	}

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="bg-white flex shadow-lg rounded-xl overflow-hidden max-w-4xl w-full">
                {/* Left Side - Form */}
                <div className="w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-6">Sign In</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div className="flex items-center border rounded-lg p-2 bg-gray-50">
                            <Mail className="text-gray-400 mr-2" />
                            <input ref={emailRef} type="email" placeholder="E-mail" className="flex-1 outline-none bg-transparent" required />
                        </div>
                        {/* Password Input */}
                        <div className="flex items-center border rounded-lg p-2 bg-gray-50">
                            <Lock className="text-gray-400 mr-2" />
                            <input ref={passwordRef} type="password" placeholder="Password" className="flex-1 outline-none bg-transparent" required />
                        </div>
                        {/* Remember Me & Forgot Password */}
                        <div className="flex justify-between text-sm text-gray-500">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" /> Remember me
                            </label>
                            <a href="#" className="hover:underline">Did you forget your password?</a>
                        </div>
                        {/* Sign in Button */}
                            <button onClick={handleLogin} type="submit" className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700 transition">
                                Sign IN
                            </button>
                        
                        <p className="text-center text-sm text-gray-500">
                            Don’t have an account?<Link href={"/signup"} className="text-orange-500 hover:underline ml-2">Sign Up</Link> 
                        </p>
                    </form>
                </div>
                
                {/* Right Side - Image */}
                <div className="w-1/2 relative hidden md:block">
                    <img src="/sneacker.png" alt="Sneaker" className="object-cover w-full h-full" />
                    {/* Text Overlay */}
                    <div className="absolute bottom-6 left-6 bg-white/80 p-4 rounded-lg shadow">
                        <p className="font-semibold text-gray-700 text-lg">We're happy to see you again 👋</p>
                        <p className="text-gray-500 text-sm">A new collection is waiting for you. Are you ready to run?</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
