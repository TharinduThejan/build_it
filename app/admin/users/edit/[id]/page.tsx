'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getUserById, updateUser } from '@/lib/userapi';

export default function EditUserPage() {
    const params = useParams();
    const userId = params.id;
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (!userId) return;

        async function loadUser() {
            setLoading(true);
            setError(null);

            try {
                const user = await getUserById(userId);

                setEmail(user.email);
                setRole(user.role);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Something went wrong');
                }
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, [userId]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!userId) return;
        setUpdating(true);
        setError(null);

        try {
            const res = await updateUser(userId, { email, role });
            if (!res.ok) throw new Error('Failed to update user');
            // Optionally, you can check the response body for errors here
            await res.json();
            router.push('/admin/users');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to update user');
            }
        } finally {
            setUpdating(false);
        }
    }

    if (!userId) return <p className="p-6">User ID is missing in the URL.</p>;
    if (loading) return <p className="p-6">Loading user...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
            <h1 className="text-xl mb-4">Edit User</h1>

            <input
                className="w-full p-2 border mb-3"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
            />

            <select
                className="w-full p-2 border mb-3"
                value={role}
                onChange={e => setRole(e.target.value)}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <button
                type="submit"
                disabled={updating}
                className={`px-4 py-2 rounded text-white ${updating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'
                    }`}
            >
                {updating ? 'Updating...' : 'Update'}
            </button>
        </form>
    );
}
