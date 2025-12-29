"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:5000";

export default function EditProductPage({ params }: any) {
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/products/${params.id}`)
            .then((res) => res.json())
            .then(setProduct);
    }, [params.id]);

    const handleUpdate = async () => {
        setIsSaving(true);
        await fetch(`${API_URL}/products/${params.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        setIsSaving(false);
        router.push("/admin/products");
    };

    const handleDelete = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        await fetch(`${API_URL}/products/${params.id}`, {
            method: "DELETE",
        });

        router.push("/admin/products");
    };

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-medium text-slate-600 animate-pulse">Loading details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <button
                    onClick={() => router.back()}
                    className="group flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors mb-6"
                >
                    <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
                    BACK TO PRODUCTS
                </button>

                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            Edit Product
                        </h1>
                        <p className="text-slate-500 font-medium">Modify item details and pricing</p>
                    </div>
                    <button
                        onClick={handleDelete}
                        className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-red-500 border-2 border-red-100 hover:bg-red-50 hover:border-red-200 rounded-xl transition-all"
                    >
                        Delete Item
                    </button>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                    <div className="p-8 space-y-8">
                        {/* Name Field */}
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                                Product Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all text-slate-800 font-medium"
                                placeholder="Enter product name"
                                value={product.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Price Field */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                                    Price (USD)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input
                                        type="number"
                                        className="w-full pl-10 pr-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all text-slate-800 font-medium"
                                        value={product.price}
                                        onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            {/* Image URL Field */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                                    Product Image URL
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all text-slate-800 font-medium"
                                    placeholder="https://..."
                                    value={product.image}
                                    onChange={(e) => setProduct({ ...product, image: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Live Image Preview (Visual Bonus) */}
                        {product.image && (
                            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Preview</p>
                                <img
                                    src={product.image}
                                    alt="Preview"
                                    className="h-20 w-20 object-cover rounded-lg border border-white shadow-sm"
                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex justify-end">
                        <button
                            onClick={handleUpdate}
                            disabled={isSaving}
                            className="relative flex items-center justify-center min-w-[160px] bg-slate-900 hover:bg-blue-600 disabled:bg-slate-400 text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-slate-200"
                        >
                            {isSaving ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Updating...</span>
                                </div>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}