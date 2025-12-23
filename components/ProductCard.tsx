import Image from 'next/image';
import { Product } from '../types/product';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover mb-4 rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600">Rs. {product.price}</p>
            <p className="text-gray-500 text-sm mt-2">{product.category}</p>
            <button className="mt-3 bg-black text-white px-4 py-2 rounded">
                Add to Cart
            </button>
        </div>
    );
}