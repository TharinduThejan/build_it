import Link from "next/link";
import { getProducts } from "@/lib/productapi";

export default async function AdminProductsPage() {
    const products = await getProducts();

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                            Products
                        </h1>
                        <p className="text-slate-50 mt-3 font-medium">
                            Global inventory management and stock control.
                        </p>
                    </div>

                    <Link
                        href="/admin/products/add"
                        className="inline-flex items-center justify-center bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-slate-200 active:scale-95 text-sm tracking-wide"
                    >
                        + NEW PRODUCT
                    </Link>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Table Toolbar */}
                    <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between">
                        <div className="relative w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="Filter by name..."
                                className="w-full px-4 py-2 text-slate-800 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            {products.length} Items Total
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">Product Details</th>
                                    <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">Price</th>
                                    <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 text-right">Operations</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-50">
                                {products.map((product: any) => (
                                    <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                {/* Thumbnail Placeholder */}
                                                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex-shrink-0 border border-slate-200 overflow-hidden relative">
                                                    {product.image ? (
                                                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-300">NO IMG</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-slate-800 block text-lg leading-tight group-hover:text-blue-600 transition-colors">
                                                        {product.name}
                                                    </span>
                                                    <span className="text-xs font-mono text-slate-400 mt-1 block tracking-tighter">
                                                        #{product._id.slice(-8).toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-sm">
                                                Rs. {product.price.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="p-5 text-right">
                                            <Link
                                                href={`/admin/products/edit/${product._id}`}
                                                className="inline-block text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-0.5 transition-all"
                                            >
                                                Edit Entry
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {products.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="text-slate-200 text-6xl font-black mb-4 select-none">EMPTY</div>
                            <h3 className="text-xl font-bold text-slate-900">No products available</h3>
                            <p className="text-slate-500 mt-2">Your inventory database is currently empty.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}