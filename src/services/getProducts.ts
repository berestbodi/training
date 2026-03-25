import axios from "axios";
import type { Product, ProductsResponse } from "../types/product";

export async function getProducts(): Promise<Product[]> {
  const { data } = await axios.get<ProductsResponse>(
    `https://dummyjson.com/products`,
  );

  return data.products;
}
