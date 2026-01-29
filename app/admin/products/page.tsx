import Link from "next/link";
import { getProductsServer } from "@/actions/productapi";
import type { Product } from "@/types/product";

export default async function AdminProductsPage() {
    let products: Product[] = [];
    let errorMessage = "";

    try {
        products = await getProductsServer();
    } catch (error) {
        errorMessage = error instanceof Error
            ? error.message
            : "Failed to load products.";
    }

    return (
        <div className="p-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
                <Link
                    href="/admin/products/add"
                    className="px-4 py-2 bg-black text-white rounded"
                >
                    + Add Product
                </Link>
            </div>

            {errorMessage ? (
                <p className="text-red-600">{errorMessage}</p>
            ) : (
                <table className="w-full border">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Qty</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.productId} className="border-t">
                                <td className="p-3">{p.name}</td>
                                <td className="p-3 text-center">Rs {p.price}</td>
                                <td className="p-3 text-center">{p.qty}</td>
                                <td className="p-3 text-center">
                                    <Link
                                        href={`/admin/products/edit/${p.productId}`}
                                        className="text-blue-600 font-medium"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
