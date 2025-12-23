export default function AboutPage() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            {/* Hero Section */}
            <section className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">About ComputerShop</h1>
                <p className="text-gray-600 text-lg">
                    Your trusted destination for computers, laptops, and accessories
                </p>
            </section>

            {/* Who We Are */}
            <section className="mb-16 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
                    <p className="text-gray-600 leading-relaxed">
                        ComputerShop is a modern computer store dedicated to providing
                        high-quality laptops, desktops, and computer accessories at
                        affordable prices. We focus on delivering reliable technology
                        solutions for students, professionals, and businesses.
                    </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-8">
                    <h3 className="font-semibold text-lg mb-2">Why Choose Us?</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>✔ Genuine products</li>
                        <li>✔ Competitive pricing</li>
                        <li>✔ Friendly customer support</li>
                        <li>✔ Trusted by hundreds of customers</li>
                    </ul>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="mb-16 grid md:grid-cols-2 gap-10">
                <div className="border rounded-xl p-8">
                    <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
                    <p className="text-gray-600">
                        To make modern technology accessible to everyone by offering
                        reliable products, honest pricing, and excellent service.
                    </p>
                </div>

                <div className="border rounded-xl p-8">
                    <h2 className="text-xl font-semibold mb-3">Our Vision</h2>
                    <p className="text-gray-600">
                        To become a leading computer shop known for innovation, trust,
                        and long-term customer relationships.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="text-center">
                <h2 className="text-2xl font-semibold mb-6">Our Core Values</h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="border rounded-lg p-6">
                        <h3 className="font-semibold mb-2">Quality</h3>
                        <p className="text-sm text-gray-600">
                            We sell only genuine and tested products.
                        </p>
                    </div>

                    <div className="border rounded-lg p-6">
                        <h3 className="font-semibold mb-2">Trust</h3>
                        <p className="text-sm text-gray-600">
                            Transparency and honesty in every deal.
                        </p>
                    </div>

                    <div className="border rounded-lg p-6">
                        <h3 className="font-semibold mb-2">Support</h3>
                        <p className="text-sm text-gray-600">
                            Customer satisfaction is our priority.
                        </p>
                    </div>

                    <div className="border rounded-lg p-6">
                        <h3 className="font-semibold mb-2">Innovation</h3>
                        <p className="text-sm text-gray-600">
                            Keeping up with the latest technology trends.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
