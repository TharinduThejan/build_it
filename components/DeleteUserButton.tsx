'use client';

import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";
import { deleteUser } from '@/lib/userapi';

type DeleteUserButtonProps = {
    userId: string | number;
    className?: string; // Add this line
};

export default function DeleteUserButton({
    userId, className }: DeleteUserButtonProps) {

    const router = useRouter();
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    async function handleDelete() {
        if (confirm('Are you sure you want to delete this user?')) {
            setDeleting(true);
            setError(null);
            try {
                const res = await fetch(`http://localhost:5000/users/${userId}`, {
                    method: 'DELETE',
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}   