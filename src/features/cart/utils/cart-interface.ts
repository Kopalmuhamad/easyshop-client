import { IProduct } from "@/features/product/utils/product-interface";

export interface ICartItem {
  product: IProduct;
  quantity: number;
  price: number;
  totalPrice: number;
  _id: string;
}

export interface ICart {
  _id: string;
  user: string;
  items: ICartItem[];
  totalAmount: number;
  createdAt: Date;
  updateAt: Date;
}

export interface ICartResponse {
  data: ICart;
}
