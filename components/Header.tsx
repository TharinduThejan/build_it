import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">

                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                        <img
                            src="/logo2.png"
                            alt="BuildIt Logo"
                            className="w-8 h-8 object-contain"
                        />
                        {/* <span className="text-xl font-black"></span> */}
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight">
                        Build<span className="text-blue-500">It</span>
                    </h1>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center space-x-8 font-medium">
                    <Link href="/" className="hover:text-blue-400 transition-colors">
                        Home
                    </Link>
                    <Link href="/products" className="hover:text-blue-400 transition-colors">
                        Products
                    </Link>
                    <Link href="/about" className="hover:text-blue-400 transition-colors">
                        About
                    </Link>
                    <Link href="/admin" className="hover:text-blue-400 transition-colors">
                        Admin
                    </Link>
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-5">
                    <Link
                        href="/cart"
                        className="relative flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-all border border-gray-700"
                    >
                        <span className="text-sm">🛒</span>
                        <span className="hidden sm:inline">Cart</span>
                        {/* Cart Count Badge */}
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-[10px] font-bold px-1.5 rounded-full">
                            3
                        </span>
                    </Link>

                    <button className="md:hidden text-2xl">
                        ☰
                    </button>
                </div>
            </div>
        </header>
    );
}