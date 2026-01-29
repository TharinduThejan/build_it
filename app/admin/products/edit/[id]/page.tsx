"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import type { ProductPayload } from "@/types/product";
import type { Product } from "@/types/product";
import {
    useProducts
} from "@/actions/product.queryHooks"


export default function EditProductPage() {
    const { id } = useParams<{ id: string }>();
      const router = useRouter();
    const { data: session } = useSession();
    const accessToken = session?.user?.accessToken;
 const {
    productQuery,
    updateProduct,
    deleteProduct,
  } = useProducts(accessToken, id);

  const { data: product, isLoading } = productQuery;
    if (isLoading || !product) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-pulse text-lg font-medium text-gray-500">Loading product details...</div>
            </div>
        );
    }

    if (!accessToken) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="rounded-lg bg-red-50 p-6 text-center text-red-600 shadow-sm">
                    <p className="font-semibold">Access Denied</p>
                    <p className="text-sm">You must be logged in to edit products.</p>
                </div>
            </div>
        );
    }

    return (
        <EditProductForm
            product={product}
            id={id}
            accessToken={accessToken}
             updateProduct={updateProduct}  
             deleteProduct={deleteProduct}  
        />
    );
}

// const useDeleteProduct = (token?: string) => {
//     const qc = useQueryClient();

//     return useMutation({
//         mutationFn: (id: string) => {
//             if (!token) throw new Error("Missing access token");
//             return deleteProductServer(id, token);
//         },
//         onSuccess: () => {
//             qc.invalidateQueries({ queryKey: ["products"] });
//         },
//     });
// };

// const useUpdateProduct = (id: string, token?: string) => {
//     const qc = useQueryClient();

//     return useMutation({
//         mutationFn: (product: ProductPayload) => {
//             if (!token) throw new Error("Missing access token");
//             return updateProductServer(id, product, token);
//         },
//         onSuccess: () => {
//             qc.invalidateQueries({ queryKey: ["products"] });
//             qc.invalidateQueries({ queryKey: ["product", id] });
//         },
//     });
// };

function EditProductForm({
    product,
    id,
    accessToken,
    updateProduct,
    deleteProduct
}: {
    product: Product;
    id: string;
    accessToken: string;
    deleteProduct: ReturnType<typeof useProducts>["deleteProduct"];
    updateProduct: ReturnType<typeof useProducts>["updateProduct"];

}) {
    const router = useRouter();

    const [form, setForm] = useState<ProductPayload>({
        name: product.name,
        price: product.price,
        qty: product.qty ?? 0,
        image: product.image,
        category: product.category,
        description: product.description,
        productId: product.productId,
    });

    const handleUpdate = () => {
        updateProduct.mutate(form, {
            onSuccess: () => router.push("/admin/products"),
        });
    };

    const handleDelete = () => {
        if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
        deleteProduct.mutate(id, {
            onSuccess: () => router.push("/admin/products"),
        });
    };

    const inputClasses = "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 outline-none";
    const labelClasses = "block text-sm font-semibold text-gray-700 mb-1.5";

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
            <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-sm border border-gray-100">
                <div className="mb-8 border-b border-gray-100 pb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                    <p className="text-sm text-gray-500">Update your product information and stock levels.</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className={labelClasses}>Product Name</label>
                        <input
                            className={inputClasses}
                            placeholder="e.g. Premium Wireless Headphones"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className={labelClasses}>Price ($)</label>
                            <input
                                type="number"
                                className={inputClasses}
                                placeholder="0.00"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>Stock Quantity</label>
                            <input
                                type="number"
                                className={inputClasses}
                                placeholder="0"
                                value={form.qty ?? 0}
                                onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClasses}>Product Image URL</label>
                        <input
                            className={inputClasses}
                            placeholder="https://example.com/image.jpg"
                            value={form.image ?? ""}
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Category</label>
                        <input
                            className={inputClasses}
                            placeholder="e.g. Accessories"
                            value={form.category ?? ""}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Description</label>
                        <textarea
                            className={`${inputClasses} min-h-[96px]`}
                            placeholder="Short product description"
                            value={form.description ?? ""}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                    </div>

                    {form.image && (
                        <div className="mt-2 rounded-lg border border-gray-200 p-2 inline-block">
                            <div className="relative h-32 w-32 overflow-hidden rounded-md">
                                <Image
                                    src={form.image}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="mt-1 text-center text-xs text-gray-400">Preview</p>
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-3 pt-6 sm:flex-row sm:justify-between">
                        <button
                            onClick={handleDelete}
                            className="rounded-lg px-6 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                        >
                            Delete Product
                        </button>

                        <div className="flex gap-3">
                            <button
                                onClick={() => router.push("/admin/products")}
                                className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white transition-shadow hover:bg-blue-700 hover:shadow-lg active:scale-95"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}