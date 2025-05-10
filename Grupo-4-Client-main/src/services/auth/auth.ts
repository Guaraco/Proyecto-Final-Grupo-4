import { LoginData, RegisterData } from "../../types";
import api from "../config/api";

export const register = async (data: RegisterData) => {

  try {
    const url = "api/users";
    const response = await api.post(url, data);
    console.log("DESDE EL REGISTER" + url)

    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

export const login = async (data: LoginData) => {
  try {
    const url = "api/users/login";
    const response = await api.post(url, data);
    console.log("DESDE EL LOGIN" + url)
    // Guardar solo el objeto user en localStorage
    if (response.data && response.data.user) {
      localStorage.setItem('userData', JSON.stringify(response.data.user));
    } else {
      console.warn("La respuesta del servidor no contiene un objeto 'user' válido:", response.data);
    }
    
    return response.data;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};




