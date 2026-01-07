"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (res?.error) {
            setError("Invalid email or password");
            return;
        }

        router.push("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-800 p-8 rounded-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Login
                </h2>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
                    required
                />

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 py-3 rounded text-white font-bold mb-4"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <button
                    type="button"
                    onClick={() => signIn("github", { callbackUrl: "/" })}
                    className="w-full bg-gray-800 py-3 rounded text-white font-bold flex items-center justify-center gap-2 border border-gray-600 hover:cursor-pointer hover:bg-gray-700 transition mb-2"
                >
                    <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" /></svg>
                    Login with GitHub
                </button>

                {/* <button
                    type="button"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="w-full bg-red-800 py-3 rounded text-white font-bold flex items-center justify-center gap-2 border border-red-700 hover:cursor-pointer hover:bg-red-700 transition mb-2"
                >
                    <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M21.35 11.1h-9.18v2.98h5.27c-.23 1.22-1.39 3.58-5.27 3.58-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.81 0 3.02.77 3.72 1.43l2.54-2.47C16.13 3.99 14.29 3 12.17 3 6.88 3 2.5 7.03 2.5 12s4.38 9 9.67 9c5.59 0 9.28-3.92 9.28-9.45 0-.64-.07-1.13-.16-1.45z" /></svg>
                    Login with Google
                </button> */}
            </form>
        </div>
    );
}
