import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AuthType, createAuthSlice } from "./auth";
import { ProductType, createProductSlice } from "./product";
import { CartType, createCartSlice } from "./cart";
import { ContactType, createContactSlice } from "./contact";

// @ts-ignore - Ignoramos el error de tipado conocido en zustand
export const useAppStore = create<AuthType & ProductType & CartType & ContactType>()(devtools((...a) => ({
    ...createAuthSlice(...a),
    ...createProductSlice(...a),
    ...createCartSlice(...a),
    ...createContactSlice(...a)
})))