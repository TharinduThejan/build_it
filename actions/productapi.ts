"use server";

import { revalidatePath } from "next/cache";
import type { ProductPayload } from "@/types/product";
const API_URL = "http://localhost:5000";


export async function getProductsServer() {
    const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
    if (!res.ok) {
        const details = await res.text().catch(() => "");
        const suffix = details ? `: ${details}` : "";
        throw new Error(`Failed to fetch products (${res.status})${suffix}`);
    }
    return res.json();
}

export async function getProductByIdServer(id: string) {
    const res = await fetch(`${API_URL}/products/${id}`, { cache: "no-store" });
    if (!res.ok) {
        const details = await res.text().catch(() => "");
        const suffix = details ? `: ${details}` : "";
        throw new Error(`Failed to fetch product (${res.status})${suffix}`);
    }
    return res.json();
}

export async function revalidateAdminProducts() {
    revalidatePath("/admin/products");
}
export async function addProductServer(product: ProductPayload, token: string) {
    const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
    });

    if (!res.ok) {
        const details = await res.text().catch(() => "");
        const suffix = details ? `: ${details}` : "";
        throw new Error(`Failed to create product (${res.status})${suffix}`);
    }
    return res.json();
}
export async function updateProductServer(
    id: string,
    product: ProductPayload,
    token: string
) {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
    });

    if (!res.ok) {
        const details = await res.text().catch(() => "");
        const suffix = details ? `: ${details}` : "";
        throw new Error(`Failed to update product (${res.status})${suffix}`);
    }
    return res.json();
}

export async function deleteProductServer(id: string, token: string) {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const details = await res.text().catch(() => "");
        const suffix = details ? `: ${details}` : "";
        throw new Error(`Failed to delete product (${res.status})${suffix}`);
    }
}


