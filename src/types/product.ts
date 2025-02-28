export type TypeProductsList = {
  id: number;
  store_id: number;
  name: string;
  price: number;
  stock_quantity: number;
  created_at: string;
  description: string | null;
  qr_code: string | null;
  exp_date: string | null;
};

export type TypeProductsListResponse = {
  success: boolean;
  data: {
    success: boolean;
    total: number;
    data: TypeProductsList[];
  };
};

export type CreateProductFormData = {
  name: string;
  price: number;
  description?: string | null;
  qr_code?: string | null;
  stock_quantity: number;
  exp_date?: string | null;
};
