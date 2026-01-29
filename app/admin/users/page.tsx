'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUsers } from '@/actions/userapi';
import DeleteUserButton from '@/components/DeleteUserButton';
import type { User } from '@/types/user';

export default function UsersPage() {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadUsers() {
            setLoading(true);
            setError(null);
            try {
                const accessToken = session?.user?.accessToken;
                if (!accessToken) throw new Error('You must be logged in as an admin to view users.');
                const data = await getUsers(accessToken);
                setUsers(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Failed to load users');
                }
            } finally {
                setLoading(false);
            }
        }

        if (status === 'authenticated') {
            loadUsers();
        }
        if (status === 'unauthenticated') {
            setLoading(false);
            setError('You must be logged in as an admin to view users.');
        }
    }, [session?.user?.accessToken, status]);

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold">User Management</h1>
                <Link href="/admin/users/add" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add User
                </Link>
            </div>

            {loading && <p className="text-slate-600">Loading users...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {!loading && !error && (
                <table className="w-full border">
                    <thead>
                        <tr>
                            {/* <th className="border p-2">ID</th> */}
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center p-4">
                                    No users found
                                </td>
                            </tr>
                        )}

                        {users.map(user => (
                            <tr key={user.userId}>
                                {/* <td className="border p-2">{user.userId}</td> */}
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.role}</td>
                                <td className="border p-2 flex items-center">
                                    <Link
                                        href={`/admin/users/edit/${user.userId}`}
                                        className="text-blue-600 mr-3"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteUserButton userId={user.userId} className="text-red-300 hover:cursor-pointer flex" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
