import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
            {/* Header Section */}
            <header className="max-w-7xl mx-auto mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <p className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2">Workspace</p>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Panel</span>
                        </h1>
                    </div>
                    <div className="text-slate-500 text-sm font-medium bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                        Welcome back, Admin
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Primary Action Card: Manage Products */}
                    <Link
                        href="/admin/products"
                        className="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    >
                        {/* Decorative Background Element */}
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500" />

                        <div className="relative">
                            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
                                {/* Inline SVG Icon (Package) */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Manage Products</h2>
                            <p className="text-slate-500 leading-relaxed">
                                View, edit, and delete your inventory. Maintain your catalog details and stock.
                            </p>

                            <div className="mt-6 flex items-center text-blue-600 font-bold text-sm">
                                Open Inventory
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Manage Users Card */}
                    <Link
                        href="/admin/users"
                        className="group relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    >
                        {/* Decorative Background Element */}
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform duration-500" />

                        <div className="relative">
                            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
                                {/* Inline SVG Icon (User Group) */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0zm6 6v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2a2 2 0 012-2h4a2 2 0 012 2z" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Manage Users</h2>
                            <p className="text-slate-500 leading-relaxed">
                                Add, edit, and manage user accounts and roles for your shop.
                            </p>

                            <div className="mt-6 flex items-center text-indigo-600 font-bold text-sm">
                                Open User Management
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Placeholder Stat Card 1 */}
                    {/* <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="潮流13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <span className="text-emerald-500 font-bold text-sm bg-emerald-50 px-2 py-1 rounded">+12.5%</span>
                        </div>
                        <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wider">Total Revenue</h3>
                        <p className="text-3xl font-black text-slate-900 mt-1">Rs. 124,500</p>
                    </div> */}

                    {/* Placeholder Stat Card 2 */}
                    {/* <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <span className="text-slate-400 font-medium text-sm italic">Last 30 days</span>
                        </div>
                        <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wider">Active Orders</h3>
                        <p className="text-3xl font-black text-slate-900 mt-1">48</p>
                    </div> */}

                </div>
            </main>
        </div>
    );
}