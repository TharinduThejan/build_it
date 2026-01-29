"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { ProductPayload } from "@/types/product";
import { useProducts } from "@/actions/product.queryHooks";



export default function AddProductPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const accessToken = session?.user?.accessToken;
    const { addProduct } = useProducts(accessToken);

    const [product, setProduct] = useState<ProductPayload>({
        name: "",
        price: 0,
        qty: 0,
        category: "",
        image: "",
        description: "",
    });


    if (!accessToken) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-6">
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm max-w-md w-full text-center">
                    <h1 className="text-xl font-bold mb-2">Access Denied</h1>
                    <p>You must be logged in to add a product.</p>
                </div>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addProduct.mutate(product, {
            onSuccess: () => router.push("/admin/products"),
        });
    };

    const inputStyles = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-gray-900";
    const labelStyles = "block text-sm font-semibold text-gray-700 mb-1";

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gray-900 px-8 py-6">
                        <h1 className="text-2xl font-bold text-white">Create New Product</h1>
                        <p className="text-gray-400 text-sm mt-1">Fill in the details to add to your inventory.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                        <div>
                            <label className={labelStyles}>Product Name</label>
                            <input
                                placeholder="e.g. Wireless Headphones"
                                className={inputStyles}
                                value={product.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyles}>Price (Rs)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className={inputStyles}
                                    value={product.price}
                                    onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelStyles}>Quantity</label>
                                <input
                                    type="number"
                                    placeholder="10"
                                    className={inputStyles}
                                    value={product.qty}
                                    onChange={(e) => setProduct({ ...product, qty: Number(e.target.value) })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelStyles}>Category</label>
                            <input
                                placeholder="e.g. Accessories"
                                className={inputStyles}
                                value={product.category}
                                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className={labelStyles}>Image URL</label>
                            <input
                                placeholder="https://example.com/image.jpg"
                                className={inputStyles}
                                value={product.image}
                                onChange={(e) => setProduct({ ...product, image: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className={labelStyles}>Description</label>
                            <textarea
                                placeholder="Short product description"
                                className={`${inputStyles} min-h-[96px]`}
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors
                  ${addProduct.isPending
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                                    }`}
                                disabled={addProduct.isPending}
                            >
                                {addProduct.isPending ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    "Create Product"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}