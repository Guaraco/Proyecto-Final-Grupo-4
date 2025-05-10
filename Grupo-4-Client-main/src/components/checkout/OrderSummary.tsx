import React from 'react';
import { FaLock } from 'react-icons/fa';
import { CartItem } from '../../store/cart';

interface OrderSummaryProps {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  costoEnvio: number;
  totalConEnvio: number;
  zona: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  items, 
  totalItems, 
  totalAmount, 
  costoEnvio, 
  totalConEnvio,
  zona
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Resumen del pedido</h2>
      
      <div className="flow-root">
        <ul className="-my-4 divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id} className="py-4 flex">
              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={item.urlImagen}
                  alt={item.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-medium text-gray-900">{item.nombre}</h3>
                <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
                <p className="text-sm font-medium text-green-600 mt-1">
                  RD${(Number(item.precio) * item.cantidad).toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Subtotal ({totalItems} productos)</span>
          <span>RD${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Envío ({zona})</span>
          <span>RD${costoEnvio.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Impuestos</span>
          <span>Incluidos</span>
        </div>
        <div className="flex justify-between font-semibold text-gray-900 pt-4 border-t border-gray-200">
          <span>Total</span>
          <span>RD${totalConEnvio.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaLock className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Tu información de pago está segura. Utilizamos encriptación de datos para proteger tu información.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary; 