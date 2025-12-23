import { products } from "@/data/products";

export default function ProductDetails({ params }: { params: { id: string } }) {
    const product = products.find(p => p.id === Number(params.id));

    if (!product) return <p>Product not found</p>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2">Rs. {product.price}</p>
        </div>
    );
}
