"use client";
import Link from "next/link";
import { Product } from "../types/product";
import { useCartStore } from "@/store/page";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
    const [count, setCount] = useState<number>(1);
    const [isAdded, setIsAdded] = useState(false);
    const addToCart = useCartStore((state) => state.addToCart);
    return (
        <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-square bg-slate-50 p-6 flex items-center justify-center overflow-hidden">
                <Link
                    href={`/products/${product.id}`}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                </Link>
                <div className="absolute top-4 left-4">
                    <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900 border border-slate-200">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
                    {product.description || "Premium high-performance hardware for your setup."}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <span className="text-xl font-black text-slate-900">
                        Rs. {product.price.toLocaleString()}
                    </span>
                    <Link
                        href={`/products/${product.id}`}
                        className="p-2 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}