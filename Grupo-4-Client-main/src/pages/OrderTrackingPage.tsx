import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import OrderTracking from '../components/OrderTracking';
import { OrderDetails } from '../types';

const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  
  useEffect(() => {
    // Recuperar los detalles del pedido guardados en localStorage
    const savedOrderDetails = localStorage.getItem('order_details');
    console.log("Detalles recuperados:", savedOrderDetails);
    
    try {
      if (savedOrderDetails) {
        const parsedDetails = JSON.parse(savedOrderDetails);
        console.log("Datos parseados correctamente:", parsedDetails);
        setOrderDetails(parsedDetails);
      }
    } catch (error) {
      console.error("Error al parsear los detalles del pedido:", error);
    }
  }, []);

  // Si no tenemos detalles del pedido
  if (!orderDetails) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Cargando detalles del pedido...</h2>
          <p className="text-gray-600 mb-4">Si después de unos momentos no aparece la información, es posible que el pedido no exista o haya expirado.</p>
          <Link to="/" className="text-green-600 hover:text-green-800 font-medium">
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero con información básica */}
      <div className="bg-green-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-green-100 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Volver a la tienda
          </Link>
          <h1 className="text-2xl font-bold text-white">¡Pedido realizado con éxito!</h1>
          <p className="mt-1 text-green-100">
            Pedido #{orderId} · Total: RD${orderDetails.total.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel principal de seguimiento */}
          <div className="lg:col-span-2">
            {/* Mensaje de éxito */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-green-800 mb-2">¡Gracias por tu compra!</h2>
              <p className="text-green-700">
                Tu pedido ha sido procesado correctamente. A continuación puedes seguir el estado de tu envío.
              </p>
            </div>
            
            {/* Componente de seguimiento */}
            <OrderTracking 
              orderId={orderId || ''}
              initialStatus="processing"
              estimatedDelivery={`${new Date().toLocaleDateString('es-ES', { weekday: 'long' })}, entre 3:00 PM y 5:00 PM`}
              simulateProgress={true}
              onStatusChange={(status) => {
                console.log(`Estado del pedido actualizado a: ${status}`);
                // Aquí podrías almacenar el estado en localStorage o en el estado global
              }}
            />
          </div>
          
          {/* Panel lateral con información del pedido */}
          <div className="lg:col-span-1">
            {/* Resumen del pedido */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Resumen del pedido</h2>
              </div>
              <div className="px-6 py-4">
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {orderDetails.items.map((item) => (
                      <li key={item.id} className="py-4 flex">
                        <div className="h-16 w-16 rounded-md overflow-hidden">
                          <img
                            src={item.urlImagen || 'https://placehold.co/100x100/1d4ed8/fff?text=Producto'}
                            alt={item.nombre}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{item.nombre}</h3>
                            <p className="text-sm font-medium text-gray-900">RD${(Number(item.precio) * item.cantidad).toFixed(2)}</p>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Cantidad: {item.cantidad}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>RD${orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Envío</span>
                    <span>{orderDetails.envio > 0 ? `RD$${orderDetails.envio.toFixed(2)}` : 'Gratis'}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>RD${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dirección de entrega */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Dirección de entrega</h2>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-700">
                  {orderDetails.direccion}, {orderDetails.ciudad}, {orderDetails.pais}, {orderDetails.codigoPostal}
                </p>
                <p className="text-gray-700 mt-2">
                  Teléfono: {orderDetails.telefono}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage; 