import { User } from '@/types/user';

const BASE_URL = 'http://localhost:5000';

function buildAuthHeaders(accessToken?: string) {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

export async function getUsers(accessToken?: string): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`, {
    cache: 'no-store',
    headers: {
      ...buildAuthHeaders(accessToken),
    },
  });

  const data = await res.json();
  return Array.isArray(data) ? data : data.users ?? [];
}

export async function getUserById(id: string, accessToken?: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    cache: 'no-store',
    headers: {
      ...buildAuthHeaders(accessToken),
    },
  });
  return res.json();
}

export async function updateUser(
  id: string,
  data: Partial<Omit<User, 'userId'>>,
  accessToken?: string,
) {
  return fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...buildAuthHeaders(accessToken),
    },
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id: string, accessToken?: string) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      ...buildAuthHeaders(accessToken),
    },
  });
  return res.json();
}
