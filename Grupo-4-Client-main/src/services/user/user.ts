import { BuyData, Contacto, User } from "../../types";
import api from "../config/api";

export const buy = async (data: BuyData) => {
    const url = '/api/buy';
    const response = await api.post(url, data);
    console.log(response.data);
    console.log("DESDE BUY" + url);
    return response.data;
}

export const getUserPurchases = async (userId: number) => {
    const url = `/api/users/${userId}/recipes`;
    const response = await api.get(url);
    return response.data;
}

export const updateInfo = async (userId: number, data: User) => {
    const url = `/api/users/${userId}`;
    const response = await api.put(url, data);
    console.log(response.data);
    return response.data;
}

export const updatePassword = async (userId: number, data: any) => {
    const url = `/api/users/${userId}/password`;
    const response = await api.put(url, data);
    return response.data;
}

export const createContacto = async (data: Contacto) => {
    const url = '/api/users/contact';
    const response = await api.post(url, data);
    return response.data;
}

export const getContacto = async () => {
    const url = '/api/users/contact';
    const response = await api.get(url);
    return response.data;
}











