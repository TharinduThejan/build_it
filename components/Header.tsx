"use client";
import { useState } from "react"; // 1. Import useState
import Link from "next/link";
import LoginOutButton from "./LoginOutButton";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false); // 2. State for mobile menu

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                        <Image
                            src="/logo2.png"
                            alt="BuildIt Logo"
                            width={32}
                            height={32}
                            priority
                        />
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight">
                        Build<span className="text-blue-500">It</span>
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 font-medium">
                    <Link href="/" className="hover:text-blue-400 transition">Home</Link>
                    <Link href="/products" className="hover:text-blue-400 transition">Products</Link>
                    <Link href="/about" className="hover:text-blue-400 transition">About</Link>
                    {(session?.user as any)?.role === "admin" && (
                        <Link href="/admin" className="hover:text-blue-400 transition">Admin</Link>
                    )}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <LoginOutButton />

                    <Link
                        href="/cart"
                        className="relative flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition border border-gray-700"
                    >
                        <span className="text-sm">🛒</span>
                        <span className="hidden sm:inline">Cart</span>
                    </Link>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-2xl focus:outline-none p-1"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {/* Logic: Only show if isOpen is true. Uses an absolute position below the header. */}
            {isOpen && (
                <div className="md:hidden bg-slate-800 border-t border-slate-700 animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col p-6 space-y-4 font-medium">
                        <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-400 border-b border-slate-700 pb-2">Home</Link>
                        <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-blue-400 border-b border-slate-700 pb-2">Products</Link>
                        <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-400 border-b border-slate-700 pb-2">About</Link>
                        {(session?.user as any)?.role === "admin" && (
                            <Link href="/admin" onClick={() => setIsOpen(false)} className="hover:text-blue-400 border-b border-slate-700 pb-2">Admin</Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}