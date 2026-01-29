'use client';

import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

type DeleteUserButtonProps = {
    userId: string | number;
    className?: string;
};

export default function DeleteUserButton({
    userId, className }: DeleteUserButtonProps) {

    const router = useRouter();
    const { data: session } = useSession();
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    async function handleDelete() {
        if (confirm('Are you sure you want to delete this user?')) {
            setDeleting(true);
            setError(null);
            try {
                const accessToken = session?.user?.accessToken;
                if (!accessToken) {
                    throw new Error('You must be logged in as an admin to delete users');
                }
                const res = await fetch(`http://localhost:5000/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (!res.ok) throw new Error('Failed to delete user');
                await res.json();
                router.push('/admin/users');
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Failed to delete user');
                }
            } finally {
                setDeleting(false);
            }
        }
    }
    return (
        <div>
            <button className={className} onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete User'}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}   