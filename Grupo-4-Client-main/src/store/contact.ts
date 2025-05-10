import { StateCreator } from "zustand";
import { ContactoResponse } from "../types";
import { getContacto } from "../services/user/user";

// Extendemos el tipo Contacto para incluir propiedades que llegan del backend
// interface ContactoResponse extends Contacto {
//   id?: number;
//   createdAt?: string;
//   updatedAt?: string;
// }

export type ContactType = {
  contacts: ContactoResponse[] | null;
  getContacts: () => Promise<void>;
};

export const createContactSlice: StateCreator<ContactType> = (set) => ({
  contacts: null,
  getContacts: async () => {
    try {
      const data = await getContacto();
      console.log(data);
      // Accedemos a la propiedad 'contacto' del objeto respuesta
      set({ contacts: data.contacto || [] });
    } catch (error) {
      console.error("Error al obtener las solicitudes de contacto:", error);
      set({ contacts: [] });
    }
  },
}); 