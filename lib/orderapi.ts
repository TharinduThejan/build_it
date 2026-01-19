const API_URL = 'http://localhost:5000';

export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItemInput {
  productId: string;
  quantity: number;
}

export async function createOrder(
  items: OrderItemInput[],
  accessToken: string,
  notes?: string,
) {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ items, notes }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to create order');
  }
  return res.json();
}

export async function getMyOrders(accessToken: string) {
  const res = await fetch(`${API_URL}/orders/my-orders`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to load orders');
  }
  return res.json();
}

export async function getAllOrders(accessToken: string) {
  const res = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to load orders');
  }
  return res.json();
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  accessToken: string,
) {
  const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to update order');
  }
  return res.json();
}
