export interface Variant {
  size: string;
  price: number;
  stock: number;
  onSale: number;
}

export interface FormData {
  itemName: string;
  description: string;
  variants: Variant[];
}

export type Variants = {
  size: string;
  price: number;
  stock: number;
  sizeId: number;
  onSale: number;
};

export type Item = {
  itemId: number;
  itemName: string;
  description: string;
  variants: Variants[];
};

export type SearchFormDataType = {
  itemName: string;
  onSale?: number;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  totalCounts?: number;
  page?: number;
  pageLimits?: number;
};