import { products } from "@/data/products";
import Link from "next/link";

export default function ProductDetails({ params }: { params: { id: string } }) {
    const product = products.find(p => p.id === Number(params.id));

    if (!product) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-600">Product not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-12">
            {/* Back Button */}
            <Link href="/products" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-8 transition-all">
                ← Back to Products
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Product Image Section */}
                <div className="bg-gray-100 rounded-2xl p-8 flex justify-center items-center shadow-inner border border-gray-200">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-[400px] object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Product Info Section */}
                <div className="flex flex-col">
                    <span className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-2">
                        {product.category}
                    </span>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        {product.name}
                    </h1>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {product.description || "High-performance hardware designed for enthusiasts. Built with premium components to ensure reliability and peak speed for gaming and professional workloads."}
                    </p>

                    <div className="border-y border-gray-200 py-6 mb-8">
                        <span className="text-3xl font-bold text-slate-900">
                            Rs. {product.price.toLocaleString()}
                        </span>
                        <p className="text-green-600 text-sm font-medium mt-1">In Stock - Ready to ship</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95">
                            Add to Cart
                        </button>
                        <button className="flex-1 bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all active:scale-95">
                            Buy Now
                        </button>
                    </div>

                    {/* Quick Specs/Features */}
                    <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <span>✅</span> 2 Year Warranty
                        </div>
                        <div className="flex items-center gap-2">
                            <span>🚚</span> Fast Delivery
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}