"use client";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { use, useState } from "react"; // Used to unwrap params in Client Components

export default function ProductDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const [count, setCount] = useState<number>(0);
    const product = products.find(
        (p) => p.id === Number(id)
    );

    if (!product) {
        return (
            <div className="h-96 flex items-center justify-center">
                <p className="text-xl font-medium text-slate-500">Product not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Breadcrumbs */}
                <nav className="flex mb-8 text-sm text-slate-400 font-medium">
                    <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
                    <span className="mx-2">/</span>
                    <span className="text-slate-900">{product.category}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Image Gallery Style */}
                    <div className="space-y-4">
                        <div className="bg-slate-50 rounded-[2.5rem] p-12 border border-slate-100 flex justify-center items-center overflow-hidden shadow-inner group">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={600}
                                height={600}
                                className="object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                            />
                        </div>
                        {/* Smaller thumbnails could go here later */}
                    </div>

                    {/* Right: Product Selection */}
                    <div className="flex flex-col">
                        <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-s mb-3">
                            {product.category}
                        </span>

                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-6 text-yellow-500">
                            <div className="flex">★★★★★</div>
                            <span className="text-slate-400 text-sm">(24 Customer Reviews)</span>
                        </div>

                        <p className="text-3xl font-bold text-slate-900 mb-8">
                            Rs. {product.price.toLocaleString()}
                        </p>

                        <div className="prose prose-slate mb-8">
                            <p className="text-slate-600 text-lg leading-relaxed">
                                {product.description || "Unleash next-level performance. This hardware is meticulously engineered to provide peak efficiency and reliability for modern power users."}
                            </p>
                        </div>

                        {/* Order Options */}
                        <div className="space-y-6 pt-8 border-t border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                                    <button onClick={() => count > 0 && setCount(count - 1)} className="px-4 py-3 text-blue-950 hover:bg-slate-50 transition-colors border-r border-slate-200">-</button>
                                    <span className="px-6 font-bold text-slate-900">{count}</span>
                                    <button onClick={() => setCount(count + 1)} className="px-4 py-3 text-blue-950 hover:bg-slate-50 transition-colors border-l border-slate-200">+</button>
                                </div>
                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]">
                                    Add to Cart
                                </button>
                            </div>

                            <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98]">
                                Buy Now
                            </button>
                        </div>

                        {/* Features List */}
                        <div className="mt-12 grid grid-cols-2 gap-y-4 gap-x-8 py-8 border-t border-slate-100">
                            <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                                <span className="text-blue-600 font-bold text-lg">🛡️</span> 1 Year Warranty
                            </div>
                            <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                                <span className="text-blue-600 font-bold text-lg">🚚</span> Global Shipping
                            </div>
                            <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                                <span className="text-blue-600 font-bold text-lg">💳</span> Secure Checkout
                            </div>
                            <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                                <span className="text-blue-600 font-bold text-lg">✨</span> 100% Genuine
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}