export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  productId: {
    _id: string;
    name: string;
    price: number;
  } | string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userId: {
    _id: string;
    email: string;
    role: string;
  } | string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  notes?: string;
  createdAt?: string;
}
