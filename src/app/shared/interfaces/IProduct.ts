export interface IProduct {
  id: number;
  name: string;
  sku?: string;
  price: number;
  stock: number;
  category?: string;
  image?: string; // optional url
  description?: string;
}
