import { create } from "zustand";
import { Product } from "@/types/product";

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],

    addToCart: (product: Product) =>
        set((state: CartState) => {
            const existing = state.cart.find(
                (item: CartItem) => item.id === product.id
            );

            if (existing) {
                return {
                    cart: state.cart.map((item: CartItem) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }

            return {
                cart: [...state.cart, { ...product, quantity: 1 }],
            };
        }),

    removeFromCart: (id: number) =>
        set((state: CartState) => ({
            cart: state.cart.filter((item: CartItem) => item.id !== id),
        })),
}));
