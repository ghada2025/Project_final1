"use client"
import Link from "next/link"
import ButtonNav from "./ButtonNav"

export function NavBar2() {
    return (
        <nav className="flex items-center justify-between px-12 py-6 shadow-md bg-[#F47D20]">
            {/* Logo */}
            <div>
                <img src="/Group 559.png" alt="logo" className="h-10" />
            </div>
            {/*Sign in*/}
            <Link href="/signin"><ButtonNav /></Link>
        </nav>
    )
}