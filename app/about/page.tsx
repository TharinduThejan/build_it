export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section with Tech Gradient */}
            <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Our <span className="text-blue-400"> Story</span>
                    </h1>
                    <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mx-auto">
                        Empowering your digital journey since 2015. We don&apos;t just sell hardware; we provide the tools for your next big breakthrough.
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-20">
                {/* Who We Are & Why Us */}
                <section className="mb-24 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-md mb-4 uppercase tracking-widest">
                            The Mission
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-6 italic">Driven by performance, defined by trust.</h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">
                            ComputerShop started with a simple idea: that high-end computing shouldn't be reserved only for the elite. We curate the best technology—from gaming powerhouses to portable workstations—ensuring that every student, professional, and gamer finds their perfect match.
                        </p>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            We treat every build and every sale as if it were for our own family, focusing on longevity and reliability over quick sales.
                        </p>
                    </div>

                    <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 shadow-sm relative">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">The ComputerShop Advantage</h3>
                        <ul className="space-y-4">
                            {[
                                { title: "Genuine Products", desc: "100% original hardware with manufacturer warranty." },
                                { title: "Expert Support", desc: "Tech enthusiasts who actually know the hardware." },
                                { title: "Fast Shipping", desc: "Secure packaging and rapid delivery to your doorstep." },
                                { title: "Trusted Reputation", desc: "Over 10,000+ satisfied customers nationwide." }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs mt-1">✓</span>
                                    <div>
                                        <h4 className="font-bold text-slate-900 leading-none">{item.title}</h4>
                                        <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Mission & Vision Cards */}
                <section className="mb-24 grid md:grid-cols-2 gap-8">
                    <div className="group p-10 bg-white border border-slate-200 rounded-[2rem] hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            🚀
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                        <p className="text-slate-600 leading-relaxed">
                            To democratize access to cutting-edge technology. We aim to provide honest pricing and expert guidance, making complex hardware simple for everyone.
                        </p>
                    </div>

                    <div className="group p-10 bg-white border border-slate-200 rounded-[2rem] hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            👁️
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
                        <p className="text-slate-600 leading-relaxed">
                            To be the world's most customer-centric tech hub where enthusiasts can discover anything they might want to build, upgrade, or create.
                        </p>
                    </div>
                </section>

                {/* Values - Modern Grid */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">Our Core Values</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Quality", emoji: "💎", desc: "Only the best gear." },
                            { label: "Trust", emoji: "🤝", desc: "Honesty in every deal." },
                            { label: "Service", emoji: "🛠️", desc: "Support that cares." },
                            { label: "Innovation", emoji: "⚡", desc: "Leading the trends." }
                        ].map((value, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-white border border-slate-100 hover:border-blue-500 transition-colors shadow-sm">
                                <div className="text-3xl mb-4">{value.emoji}</div>
                                <h3 className="font-bold text-slate-900 mb-1">{value.label}</h3>
                                <p className="text-sm text-slate-500">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}