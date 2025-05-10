import { StateCreator } from "zustand";
import { Product } from "../types";
import { getProducts } from "../services/product/product";

export type ProductType = {
  products: Product | null;
  GetProducts: () => void;
};

export const createProductSlice: StateCreator<ProductType> = (set) => ({
  products: null,
  GetProducts: async () => {
    const products = await getProducts();
    set({ products });
  },
});