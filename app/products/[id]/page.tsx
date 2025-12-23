"use client";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { use, useState } from "react";
import { useCartStore } from "@/store/page";

export default function ProductDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const [count, setCount] = useState<number>(1);
    const [isAdded, setIsAdded] = useState(false);

    const addToCart = useCartStore((state) => state.addToCart);
    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <div className="h-screen flex flex-col items-center justify-center space-y-4">
                <div className="text-6xl">🔍</div>
                <p className="text-xl font-semibold text-slate-400">Hardware not found</p>
                <Link href="/products" className="text-blue-600 hover:underline">Return to Shop</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (count > 0) {
            addToCart({ ...product, quantity: count });
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 3000); // Reset toast after 3s
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Success Notification Toast */}
            <div className={`fixed top-24 right-6 z-50 transform transition-all duration-500 ${isAdded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'}`}>
                <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
                    <span className="bg-green-500 rounded-full p-1 text-[10px]">✓</span>
                    <p className="text-sm font-bold">Added {count} item(s) to cart</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Navigation & Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <nav className="flex mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                            <Link href="/products" className="hover:text-blue-600 transition-colors">Catalog</Link>
                            <span className="mx-2 text-slate-300">/</span>
                            <span className="text-blue-600">{product.category}</span>
                        </nav>
                        <h1 className="text-4xl mt-5 md:text-6xl font-black text-slate-900 tracking-tighter">
                            {product.name}
                        </h1>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">MSRP Retail</p>
                        <p className="text-4xl font-black text-blue-600">Rs. {product.price.toLocaleString()}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Hero Image Card */}
                    <div className="lg:col-span-7 group relative height-100">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-transparent rounded-[3rem] -z-10" />
                        <div className="bg-white/40 backdrop-blur-sm rounded-[3rem] p-8 md:p-20 border border-slate-100 shadow-xl flex justify-center items-center overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={700}
                                height={700}
                                priority
                                className="object-contain transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                            />
                        </div>
                    </div>

                    {/* Controls & Specs */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Configure Order</h3>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-slate-200">
                                    <span className="pl-4 font-bold text-slate-500 text-sm">Quantity</span>
                                    <div className="flex items-center bg-slate-100 rounded-xl overflow-hidden">
                                        <button onClick={() => count > 1 && setCount(count - 1)} className="text-slate-500 px-5 py-3 hover:bg-slate-200 transition-colors font-bold text-lg">-</button>
                                        <span className="px-4 font-black w-12 text-center text-slate-900">{count}</span>
                                        <button onClick={() => setCount(count + 1)} className="text-slate-500 px-5 py-3 hover:bg-slate-200 transition-colors font-bold text-lg">+</button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-200 active:scale-95 flex justify-center items-center gap-3"
                                >
                                    <span>Add to Cart</span>
                                    <span className="opacity-40">|</span>
                                    <span>Rs. {(product.price * count).toLocaleString()}</span>
                                </button>

                                {/* <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl transition-all">
                                    Instant Buy
                                </button> */}
                            </div>
                        </div>

                        {/* Tech Specs Summary */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-3xl border border-slate-100 bg-white shadow-sm">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Availability</p>
                                <p className="text-sm font-bold text-green-600 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> In Stock
                                </p>
                            </div>
                            <div className="p-5 rounded-3xl border border-slate-100 bg-white shadow-sm">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Warranty</p>
                                <p className="text-sm font-bold text-slate-900">3 Year Limited</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}