import { StateCreator } from "zustand";
import { User, Purchase } from "../types";
import { getUserPurchases } from "../services/user/user";

export type AuthType = {
    user : User | null;
    purchases: Purchase | null;
    login: () => void;
    logout: () => void;
    setUser: (user: User) => void;
    getUserPurchases: () => Promise<void>;
};

export const createAuthSlice: StateCreator<AuthType> = (set, get) => ({
   user: null,
   purchases: null,
   login: () => {
    if (get().user === null) {
      try {
          const userData = localStorage.getItem("userData");
          if (userData) {
            const parsedUser = JSON.parse(userData);
            // Verificar que el objeto tenga la estructura esperada
            if (parsedUser && parsedUser.id && parsedUser.name && parsedUser.email) {
              set({ user: parsedUser });
            } else {
              console.warn("Datos de usuario en localStorage inválidos", parsedUser);
            }
          }
      } catch (error) {
          console.error("Error al obtener el usuario de localStorage:", error);
      }
    }
   },
   logout: () => {
    localStorage.removeItem("rememberedUser");
    localStorage.removeItem("userData");
    set({ user: null });
   },
   setUser: (user: User) => {
    localStorage.setItem("userData", JSON.stringify(user));
    set({ user });
   },
   getUserPurchases: async () => {
    const user = get().user;
    if (!user) return;
    
    try {
      const userRecipes = await getUserPurchases(user.id);
      set({ purchases: userRecipes });
    } catch (error) {
      console.error("Error al obtener las compras del usuario:", error);
    }
   }
});