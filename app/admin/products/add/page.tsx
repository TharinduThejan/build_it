"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:3000";

export default function AddProductPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [product, setProduct] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...product,
                price: Number(product.price),
            }),
        });

        setIsSubmitting(false);
        router.push("/admin/products");
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <button
                        onClick={() => router.back()}
                        className="text-xs font-black tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors mb-4 block"
                    >
                        ← CANCEL AND RETURN
                    </button>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                        New Product Entry
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">
                        Fill in the details below to add a new item to your global catalog.
                    </p>
                </div>

                {/* Main Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden"
                >
                    <div className="p-8 md:p-12 space-y-8">

                        {/* Section: Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                                    Official Product Name
                                </label>
                                <input
                                    required
                                    placeholder="e.g. Minimalist Leather Watch"
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-slate-900 outline-none transition-all text-slate-800 font-bold placeholder:text-slate-300 placeholder:font-normal"
                                    value={product.name}
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                                    Price (USD)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                                    <input
                                        required
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-slate-900 outline-none transition-all text-slate-800 font-bold"
                                        value={product.price}
                                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                                    Category
                                </label>
                                <input
                                    placeholder="e.g. Accessories"
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-slate-900 outline-none transition-all text-slate-800 font-bold placeholder:text-slate-300 placeholder:font-normal"
                                    value={product.category}
                                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Section: Assets & Media */}
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                                Public Image URL
                            </label>
                            <input
                                placeholder="https://images.unsplash.com/..."
                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-slate-900 outline-none transition-all text-slate-800 font-medium placeholder:text-slate-300"
                                value={product.image}
                                onChange={(e) => setProduct({ ...product, image: e.target.value })}
                            />
                        </div>

                        {/* Section: Description */}
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                                Product Description
                            </label>
                            <textarea
                                rows={5}
                                placeholder="Describe the key features and specifications..."
                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-slate-900 outline-none transition-all text-slate-800 font-medium placeholder:text-slate-300"
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Form Footer */}
                    <div className="bg-slate-50 px-8 py-8 md:px-12 border-t border-slate-100 flex items-center justify-between">
                        <p className="hidden md:block text-xs font-medium text-slate-400">
                            Ensuring all fields are accurate helps SEO.
                        </p>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto min-w-[200px] bg-slate-900 hover:bg-blue-600 disabled:bg-slate-300 text-white font-black text-xs uppercase tracking-[0.2em] py-5 px-10 rounded-2xl transition-all shadow-xl shadow-slate-200 active:scale-95"
                        >
                            {isSubmitting ? "PROCESSING..." : "CREATE PRODUCT"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}