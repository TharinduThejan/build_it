"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getMyOrders } from "@/lib/orderapi";
import type { Order } from "@/types/order";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const accessToken = session?.user?.accessToken;
        if (!accessToken) {
          throw new Error("You must be logged in to view your orders.");
        }
        const data = await getMyOrders(accessToken);
        setOrders(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load orders");
        }
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      loadOrders();
    }

    if (status === "unauthenticated") {
      setLoading(false);
      setError("You must be logged in to view your orders.");
    }
  }, [session?.user?.accessToken, status]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-8">My Orders</h1>

        {loading && <p className="text-slate-500">Loading orders...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-100">
            <p className="text-slate-500">No orders found.</p>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl p-8 border border-slate-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-400">Order ID</p>
                    <p className="font-bold text-slate-900">{order._id}</p>
                  </div>
                  <span className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold">
                    {order.status}
                  </span>
                </div>

                <div className="divide-y">
                  {order.items.map((item, index) => (
                    <div key={`${order._id}-${index}`} className="py-3 flex justify-between">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {item.productName}
                        </p>
                        <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-slate-800">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-4">
                  <p className="text-lg font-black text-slate-900">
                    Total: Rs. {order.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
