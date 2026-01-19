import { create } from "zustand";
import { Product } from "@/types/product";

interface CartItem extends Product {
    quantity: number;
}

type AddToCartProduct = Product & { quantity?: number };

interface CartState {
    cart: CartItem[];
    addToCart: (product: AddToCartProduct) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],

    addToCart: (product: AddToCartProduct) =>
        set((state: CartState) => {
            const existing = state.cart.find(
                (item: CartItem) => item.productId === product.productId
            );

            const quantity = product.quantity ?? 1;

            if (existing) {
                return {
                    cart: state.cart.map((item: CartItem) =>
                        item.productId === product.productId
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    ),
                };
            }

            return {
                cart: [...state.cart, { ...product, quantity }],
            };
        }),

    removeFromCart: (productId: number) =>
        set((state: CartState) => ({
            cart: state.cart.filter((item: CartItem) => item.productId !== productId),
        })),

    clearCart: () => set({ cart: [] }),
}));
