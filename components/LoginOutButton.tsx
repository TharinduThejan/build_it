"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginOutButton() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") return null;

    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/login",
        });
        toast.success("Logged out successfully");
    };

    return session ? (
        <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
        >
            Logout
        </button>
    ) : (
        <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
            Login
        </button>
    );
}
