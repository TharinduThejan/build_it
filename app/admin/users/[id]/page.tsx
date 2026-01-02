'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function UserDetailsPage() {
    const params = useParams();
    const userId = params.id;

    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!userId) return;

        fetch(`http://localhost:5000/users/${userId}`)
            .then((res) => {
                if (!res.ok) throw new Error('User not found');
                return res.json();
            })
            .then(setUser)
            .catch(() => setError('User not found'));
    }, [userId]);

    if (error) return <p>{error}</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h1>User Details</h1>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}
