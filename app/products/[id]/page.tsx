"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useProducts } from "@/actions/product.queryHooks";
import { useCartStore } from "@/store/page";

export default function ProductDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { productQuery } = useProducts(undefined, id);
    const { data: product, isLoading } = productQuery;

    const addToCart = useCartStore((state) => state.addToCart);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] bg-[#0a192f]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="p-20 text-center bg-[#0a192f] min-h-screen">
                <h2 className="text-3xl font-bold text-white">Product not found</h2>
                <p className="text-gray-400 mt-4">The item you are looking for doesn&apos;t exist.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 pt-10">
                <nav className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                    Products / <span className="text-blue-500">{product.category || 'Hardware'}</span>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Product Image */}
                    <div className="relative aspect-square bg-[#f8fafc] rounded-3xl overflow-hidden border border-gray-100 shadow-xl flex items-center justify-center p-8">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={800}
                            height={800}
                            className="object-contain w-full h-full transition-transform duration-700 hover:scale-110"
                            priority
                        />
                        {product.qty <= 5 && product.qty > 0 && (
                            <div className="absolute top-6 left-6 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                                Low Stock
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-5xl font-black text-[#0a192f] tracking-tight leading-tight">
                                {product.name}
                            </h1>
                            <div className="h-1.5 w-20 bg-blue-500 mt-4 rounded-full"></div>
                        </div>

                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-bold text-gray-900">
                                Rs. {product.price.toLocaleString()}
                            </span>
                            <span className={`text-sm font-bold px-3 py-1 rounded-lg ${product.qty > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                                }`}>
                                {product.qty > 0 ? 'AVAILABLE' : 'OUT OF STOCK'}
                            </span>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Experience the next level of performance with the {product.name}.
                                Engineered for professionals, this hardware delivers the reliability
                                and power required for modern high-performance computing tasks.
                            </p>
                        </div>

                        {/* Specs Grid (Visual Polish) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border border-gray-100 p-4 rounded-xl">
                                <p className="text-xs text-gray-400 uppercase">Condition</p>
                                <p className="font-semibold text-gray-800">Brand New</p>
                            </div>
                            <div className="border border-gray-100 p-4 rounded-xl">
                                <p className="text-xs text-gray-400 uppercase">Warranty</p>
                                <p className="font-semibold text-gray-800">2 Years Local</p>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 bg-[#0a192f] hover:bg-blue-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-blue-200 disabled:bg-gray-300 disabled:cursor-not-allowed overflow-hidden"
                                onClick={() =>
                                    addToCart({
                                        ...product,
                                        productId: product.id,
                                    })
                                }
                                disabled={product.qty <= 0}
                            >
                                <span className="relative z-10 uppercase tracking-wider">
                                    {product.qty > 0 ? 'Add to Shopping Bag' : 'Currently Unavailable'}
                                </span>
                                {product.qty > 0 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                )}
                            </button>
                            <p className="mt-6 text-sm text-gray-400 text-center">
                                🛡️ Secure payment & official BuildIt warranty included.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}