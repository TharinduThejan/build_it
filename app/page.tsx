import Link from "next/link";
import { getProducts } from '@/lib/productapi';
import ProductCard from '@/components/ProductCard';



export default function Home() {
  const products = getProducts();

  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
      {/* Decorative Background Gradient */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 blur-3xl opacity-20">
        <div className="aspect-[1000/600] w-[60rem] bg-gradient-to-tr from-blue-600 to-purple-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
            Next-Gen Hardware Now In Stock
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Digital Experience</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            The ultimate destination for elite gaming rigs, professional workstations,
            and cutting-edge accessories. Built for performance, designed for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/25 active:scale-95"
            >
              Shop Collection
            </Link>

            <Link
              href="/about"
              className="w-full sm:w-auto bg-transparent border border-slate-700 hover:bg-slate-800 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all active:scale-95"
            >
              Learn More
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap justify-center gap-8 opacity-50 grayscale">
            <div className="flex items-center gap-2 text-white font-semibold italic text-xl">INTEL</div>
            <div className="flex items-center gap-2 text-white font-semibold italic text-xl">NVIDIA</div>
            <div className="flex items-center gap-2 text-white font-semibold italic text-xl">AMD</div>
            <div className="flex items-center gap-2 text-white font-semibold italic text-xl">ASUS</div>
          </div>
        </div>
      </div>
    </section>
  );
}