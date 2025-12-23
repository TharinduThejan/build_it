"use client";
import { useCartStore } from "@/store/page";
import Link from "next/link";

export default function CartPage() {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-3xl font-black text-slate-900 mb-8">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                        <p className="text-slate-500 mb-6">Your cart is currently empty.</p>
                        <Link href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            {cart.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center py-6 border-b last:border-0 border-slate-50">
                                    <div className="text-center sm:text-left">
                                        <h2 className="text-lg font-bold text-slate-900">{item.name}</h2>
                                        <p className="text-blue-600 font-medium text-sm">Qty: {item.quantity}</p>
                                    </div>

                                    <div className="flex items-center gap-8 mt-4 sm:mt-0">
                                        <p className="font-bold text-slate-900">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 font-medium hover:text-red-700 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 rounded-3xl p-8 text-white flex justify-between items-center shadow-xl">
                            <div>
                                <p className="text-slate-400 text-sm">Total Amount</p>
                                <h2 className="text-3xl font-black">Rs. {total.toLocaleString()}</h2>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-xl font-bold transition-all active:scale-95">
                                Checkout Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}