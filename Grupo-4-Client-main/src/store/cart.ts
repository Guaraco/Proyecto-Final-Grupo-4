import { StateCreator } from "zustand";
import { toast } from "react-toastify";
import { AuthType } from "./auth";

// Definición del tipo para un item del carrito
export type CartItem = {
  id: number;
  productoId: number;
  nombre: string;
  precio: string | number;
  urlImagen: string;
  cantidad: number;
  stockDisponible: number;
};

// Definición del tipo para el estado del carrito
export type CartType = {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addToCart: (item: Omit<CartItem, 'cantidad'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, cantidad: number) => void;
  clearCart: () => void;
};

// Creación del slice del carrito
export const createCartSlice: StateCreator<CartType & AuthType, [], [], CartType> = (set, get) => ({
  items: [],
  totalItems: 0,
  totalAmount: 0,

  // Función para añadir un producto al carrito
  addToCart: (item) => {
    const { user } = get();
    
    // Verificar si el usuario está autenticado
    if (!user) {
      toast.error("Debes iniciar sesión para añadir productos al carrito");
      return;
    }
    
    const { items } = get();
    const existingItem = items.find(i => i.productoId === item.productoId);

    if (existingItem) {
      // Si el producto ya está en el carrito, aumentamos la cantidad
      const newQuantity = Math.min(existingItem.cantidad + 1, existingItem.stockDisponible);
      
      if (newQuantity === existingItem.cantidad) {
        toast.info(`No hay más stock disponible de "${existingItem.nombre}"`);
        return;
      }
      
      get().updateQuantity(existingItem.id, newQuantity);
      toast.success(`Se actualizó la cantidad de "${existingItem.nombre}" en el carrito`);
    } else {
      // Si es un producto nuevo, lo añadimos al carrito
      const newItem: CartItem = {
        ...item,
        cantidad: 1,
      };

      set(state => {
        const updatedItems = [...state.items, newItem];
        return {
          items: updatedItems,
          totalItems: updatedItems.reduce((total, item) => total + item.cantidad, 0),
          totalAmount: updatedItems.reduce(
            (total, item) => total + (Number(item.precio) * item.cantidad), 
            0
          )
        };
      });
      
      toast.success(`Se añadió "${newItem.nombre}" al carrito`);
    }
  },

  // Función para eliminar un producto del carrito
  removeFromCart: (id) => {
    const { items } = get();
    const itemToRemove = items.find(item => item.id === id);
    
    if (!itemToRemove) return;
    
    set(state => {
      const updatedItems = state.items.filter(item => item.id !== id);
      return {
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.cantidad, 0),
        totalAmount: updatedItems.reduce(
          (total, item) => total + (Number(item.precio) * item.cantidad), 
          0
        )
      };
    });
    
    toast.info(`Se eliminó "${itemToRemove.nombre}" del carrito`);
  },

  // Función para actualizar la cantidad de un producto
  updateQuantity: (id, cantidad) => {
    const { items } = get();
    const itemToUpdate = items.find(item => item.id === id);
    
    if (!itemToUpdate) return;
    
    if (cantidad > itemToUpdate.stockDisponible) {
      toast.warning(`Solo hay ${itemToUpdate.stockDisponible} unidades disponibles de "${itemToUpdate.nombre}"`);
      cantidad = itemToUpdate.stockDisponible;
    }
    
    set(state => {
      const updatedItems = state.items.map(item => 
        item.id === id 
          ? { ...item, cantidad } 
          : item
      );
      
      return {
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.cantidad, 0),
        totalAmount: updatedItems.reduce(
          (total, item) => total + (Number(item.precio) * item.cantidad), 
          0
        )
      };
    });
    
    if (cantidad > 0) {
      toast.info(`Se actualizó la cantidad de "${itemToUpdate.nombre}" a ${cantidad}`);
    }
  },

  // Función para limpiar el carrito
  clearCart: () => {
    set({ items: [], totalItems: 0, totalAmount: 0 });
    toast.info("Se ha vaciado el carrito");
  }
});