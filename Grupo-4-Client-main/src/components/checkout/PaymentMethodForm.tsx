import React from 'react';
import PaymentQRCode from '../PaymentQRCode';

interface PaymentMethodFormProps {
  formData: {
    metodoPago: string;
    numeroTarjeta?: string;
    fechaExpiracion?: string;
    cvv?: string;
    nombreTitular?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  totalConEnvio?: number;
  onPaymentCompleted?: (paymentData: any) => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ 
  formData, 
  handleInputChange, 
  totalConEnvio = 0,
  onPaymentCompleted
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="metodoPago" className="block text-sm font-medium text-gray-700">
          Método de Pago
        </label>
        <select
          id="metodoPago"
          name="metodoPago"
          value={formData.metodoPago}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Seleccionar método de pago</option>
          <option value="tarjeta">Tarjeta de crédito/débito</option>
          <option value="efectivo">Pago en efectivo al entregar</option>
          <option value="qr">Pago móvil con código QR</option>
        </select>
      </div>

      {formData.metodoPago === 'tarjeta' && (
        <div className="space-y-6">
          <div>
            <label htmlFor="numeroTarjeta" className="block text-sm font-medium text-gray-700">
              Número de Tarjeta
            </label>
            <input
              type="text"
              id="numeroTarjeta"
              name="numeroTarjeta"
              value={formData.numeroTarjeta || ''}
              onChange={handleInputChange}
              required
              placeholder="XXXX XXXX XXXX XXXX"
              maxLength={19}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="fechaExpiracion" className="block text-sm font-medium text-gray-700">
                Fecha de Expiración
              </label>
              <input
                type="text"
                id="fechaExpiracion"
                name="fechaExpiracion"
                value={formData.fechaExpiracion || ''}
                onChange={handleInputChange}
                required
                placeholder="MM/AA"
                maxLength={5}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv || ''}
                onChange={handleInputChange}
                required
                placeholder="123"
                maxLength={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="nombreTitular" className="block text-sm font-medium text-gray-700">
              Nombre del Titular
            </label>
            <input
              type="text"
              id="nombreTitular"
              name="nombreTitular"
              value={formData.nombreTitular || ''}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      )}

      {formData.metodoPago === 'efectivo' && (
        <div className="bg-green-50 px-4 py-3 rounded-md">
          <p className="text-sm text-green-700">
            Has seleccionado pago en efectivo al momento de la entrega. No se requiere información adicional.
          </p>
        </div>
      )}

      {formData.metodoPago === 'qr' && (
        <div className="mt-4">
          <PaymentQRCode
            amount={totalConEnvio}
            phoneNumber="+1 (809) 555-1234"
            merchantName="Jardín Virtual"
            formData={formData}
            onPaymentCompleted={onPaymentCompleted}
            autoComplete={false}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentMethodForm; 