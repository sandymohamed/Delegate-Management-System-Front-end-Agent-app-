export type VanProduct = {
  product_id: number;
  product_name: string;
  total_quantity: number;
  price: number;
}


export type Van = {
  id: number;
  store_id: number;
  agent_id: number;
  name: string;
  plate_number: string;
  created_at: number;
};