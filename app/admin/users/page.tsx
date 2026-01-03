import Link from 'next/link';
import { getUsers } from '@/lib/userapi';
import DeleteUserButton from '@/components/DeleteUserButton';

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold">User Management</h1>
                <Link href="/admin/users/add" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add User
                </Link>
            </div>

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
        </div>
    );
}
