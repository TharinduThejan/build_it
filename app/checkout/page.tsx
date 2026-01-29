"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCartStore } from "@/store/page";
import { createOrder } from "@/lib/orderapi";

export default function CheckoutPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const total = useMemo(
        () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [cart]
    );

    const handlePlaceOrder = async () => {
        setError(null);
        if (status !== "authenticated") {
            router.push("/login");
            return;
        }
        const accessToken = session?.user?.accessToken;
        if (!accessToken) {
            setError("You must be logged in to place an order.");
            return;
        }
        if (cart.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        const items = cart
            .filter((item) => item.productId)
            .map((item) => ({
                productId: item._id as string,
                quantity: item.quantity,
            }));

        if (items.length !== cart.length) {
            setError("Some items are missing product IDs. Please refresh your cart.");
            return;
        }

        setSubmitting(true);
        try {
            await createOrder(items, accessToken);
            clearCart();
            router.push("/orders");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to place order");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-black text-slate-900 mb-8">Checkout</h1>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-slate-100">
                        <p className="text-slate-500">Your cart is empty.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-8 border border-slate-100">
                            {cart.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex justify-between items-center py-4 border-b last:border-0"
                                >
                                    <div>
                                        <p className="font-bold text-slate-900">{item.name}</p>
                                        <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold text-slate-900">
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 text-white rounded-3xl p-8 flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm">Total</p>
                                <p className="text-3xl font-black">Rs. {total.toLocaleString()}</p>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                disabled={submitting}
                                className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 px-10 py-4 rounded-xl font-bold transition-all"
                            >
                                {submitting ? "Placing Order..." : "Place Order"}
                            </button>
                        </div>

                        {error && <p className="text-red-500 font-medium">{error}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}