import { ProductInput } from "../../types";
import api from "../config/api";

export const createProduct = async (product: ProductInput) => {
  try {
    console.log('Enviando producto:', product);
    // Probamos con ambas rutas para asegurar compatibilidad
    let response;
    try {
      response = await api.post('api/products', product);
    } catch (firstError) {
      console.log('Intentando ruta alternativa...');
      response = await api.post('api/products', product);
    }
    
    console.log('Respuesta del servidor:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return { success: false, error };
  }
};

export const updateProduct = async (id: number, productData: ProductInput) => {
  try {
    console.log(`Actualizando producto ${id}:`, productData);
    
    // Usamos la ruta correcta para la actualización
    const response = await api.put(`api/products/${id}`, productData);
    
    console.log('Respuesta del servidor:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    return { success: false, error };
  }
};

export const deleteProduct = async (id: number) => {
  try {
    console.log(`Eliminando producto ${id}`);
    
    // Usamos la misma estructura de URL que para actualizar
    const response = await api.delete(`api/products/${id}`);
    
    console.log('Respuesta del servidor:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    return { success: false, error };
  }
};

export const getProducts = async () => {
  const response = await api.get('api/products');
  return response.data;
};





