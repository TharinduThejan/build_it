import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
    const categories = ["All", "Laptop", "GPU", "Monitor", "Accessories", "Storage"];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="bg-slate-900 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">
                        Hardware <span className="text-blue-500">Catalog</span>
                    </h1>
                    <p className="text-slate-400 mt-2 text-lg">
                        Browse our collection of high-performance computing gear.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 p-6 md:p-12">
                {/* Sidebar Filter */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">
                                Categories
                            </h3>
                            <ul className="space-y-2">
                                {categories.map((cat) => (
                                    <li key={cat}>
                                        <button className="w-full text-left px-4 py-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}