export interface IProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: {
    name: string;
    _id: string;
  };
  description: string;
  image: string[];
  newArrivals: boolean;
  bestSeller: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductResponse {
  status: string;
  success: true;
  message: string;
  data: IProduct[];
  pagination: {
    totalProduct: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}
