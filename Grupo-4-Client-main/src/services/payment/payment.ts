import api from "../config/api";

// Tipo para la información de pago
export type PaymentData = {
  reference: string;
  amount: number;
  method: 'pagoMovil' | 'tarjeta' | 'paypal' | 'efectivo';
  status?: 'pending' | 'completed' | 'failed';
  date?: string;
  metadata?: any;
};

// Verificar el estado de un pago por referencia
export const verifyPayment = async (reference: string): Promise<PaymentData> => {
  try {
    // En un entorno real, esta función haría una solicitud al backend
    // para verificar el estado del pago con la pasarela de pago correspondiente
    const url = `/api/payments/verify/${reference}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al verificar el pago:", error);
    throw error;
  }
};

// Registrar un nuevo pago
export const registerPayment = async (paymentData: PaymentData): Promise<PaymentData> => {
  try {
    const url = '/api/payments';
    const response = await api.post(url, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar el pago:", error);
    throw error;
  }
};

// Simular la verificación de pago (para desarrollo/pruebas)
export const simulatePaymentVerification = (
  reference: string, 
  delayMs: number = 3000
): Promise<PaymentData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        reference,
        amount: 0, // Este valor debería obtenerse del backend
        method: 'pagoMovil',
        status: 'completed',
        date: new Date().toISOString()
      });
    }, delayMs);
  });
};

// Generar una referencia única de pago
export const generatePaymentReference = (): string => {
  const prefix = 'JV';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
}; 