import { User } from '@/types/user';

const BASE_URL = 'http://localhost:5000';

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`, {
    cache: 'no-store',
  });

  const data = await res.json();
  return Array.isArray(data) ? data : data.users ?? [];
}

export async function getUserById(id: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    cache: 'no-store',
  });
  return res.json();
}

export async function updateUser(
  id: string,
  data: Partial<Omit<User, 'userId'>>
) {
  return fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id: string) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}
