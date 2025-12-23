export default function Footer() {
    return (
        <footer className="bg-black text-white text-center py-4 mt-10">
            <p className="text-sm">
                © {new Date().getFullYear()} ComputerShop. All rights reserved.
            </p>
        </footer>
    );
}
