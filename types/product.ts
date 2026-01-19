export interface Product {
  _id?: string;
  productId: number;
  name: string;
  price: number;
  qty?: number;
  category: string;
  image: string;
  description?: string;
}
