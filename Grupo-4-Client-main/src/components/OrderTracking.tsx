import React, { useState, useEffect } from 'react';
import { FaShippingFast, FaCheck, FaBox, FaTruck, FaMapMarkerAlt } from 'react-icons/fa';
import { OrderTrackingProps } from '../types';

// Estados posibles del pedido
export type OrderStatus = 'processing' | 'packed' | 'shipped' | 'in_delivery' | 'delivered';

// Información de cada estado del pedido
const statusInfo = {
  processing: {
    label: 'Procesando pedido',
    description: 'Estamos preparando tu pedido',
    icon: FaBox,
    color: 'text-yellow-500'
  },
  packed: {
    label: 'Pedido empacado',
    description: 'Tu pedido ha sido empacado y está listo para envío',
    icon: FaBox,
    color: 'text-blue-500'
  },
  shipped: {
    label: 'Enviado',
    description: 'Tu pedido ha sido enviado y está en camino',
    icon: FaShippingFast,
    color: 'text-indigo-500'
  },
  in_delivery: {
    label: 'En ruta',
    description: 'El repartidor está en camino a tu dirección',
    icon: FaTruck,
    color: 'text-purple-500'
  },
  delivered: {
    label: 'Entregado',
    description: 'Tu pedido ha sido entregado exitosamente',
    icon: FaCheck,
    color: 'text-green-500'
  }
};

// Tiempo de progreso simulado entre estados (en segundos)
const simulationTimes = {
  processing: 5,
  packed: 8,
  shipped: 10,
  in_delivery: 15,
  delivered: 0
};

// Secuencia de estados del pedido
const statusSequence: OrderStatus[] = ['processing', 'packed', 'shipped', 'in_delivery', 'delivered'];

const OrderTracking: React.FC<OrderTrackingProps> = ({
  orderId,
  initialStatus = 'processing',
  estimatedDelivery = 'Hoy, entre 3:00 PM y 5:00 PM',
  simulateProgress = false,
  onStatusChange
}) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(initialStatus);
  const [currentLocation, setCurrentLocation] = useState('Centro de Distribución Santo Domingo');
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  // Calcular el índice actual en la secuencia de estados
  const currentIndex = statusSequence.indexOf(currentStatus);
  
  // Simular progreso del pedido
  useEffect(() => {
    if (!simulateProgress || currentStatus === 'delivered') return;
    
    const currentTime = simulationTimes[currentStatus];
    const nextStatus = statusSequence[currentIndex + 1];
    
    if (!nextStatus) return;
    
    // Actualizar el porcentaje de progreso cada 100ms
    const interval = setInterval(() => {
      setProgressPercentage(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (100 / (currentTime * 10));
      });
    }, 100);
    
    // Cambiar al siguiente estado cuando el progreso llegue a 100%
    const timeout = setTimeout(() => {
      setCurrentStatus(nextStatus);
      setProgressPercentage(0);
      
      // Actualizar la ubicación basada en el nuevo estado
      if (nextStatus === 'in_delivery') {
        setCurrentLocation('En ruta hacia tu ubicación');
      } else if (nextStatus === 'delivered') {
        setCurrentLocation('Entregado en tu dirección');
      }
      
      // Notificar el cambio de estado
      if (onStatusChange) {
        onStatusChange(nextStatus);
      }
    }, currentTime * 1000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [currentStatus, currentIndex, simulateProgress, onStatusChange]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Seguimiento de Pedido #{orderId}</h2>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          Activo
        </span>
      </div>
      
      {/* Mapa de ubicación (simulado) */}
      <div className="bg-gray-100 rounded-lg h-40 mb-6 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
        <div className="z-10 flex flex-col items-center">
          <FaMapMarkerAlt className="text-red-500 text-3xl mb-2" />
          <p className="text-gray-700 font-medium text-sm text-center">
            {currentLocation}
          </p>
        </div>
      </div>
      
      {/* Tiempo estimado de entrega */}
      <div className="mb-6 bg-blue-50 rounded-lg p-4">
        <div className="flex items-start">
          <FaTruck className="text-blue-500 mt-1 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-blue-800">Entrega estimada</h3>
            <p className="text-blue-700">{estimatedDelivery}</p>
          </div>
        </div>
      </div>
      
      {/* Pasos de seguimiento */}
      <div className="space-y-4">
        {statusSequence.map((status, index) => {
          const info = statusInfo[status];
          const isActive = index <= currentIndex;
          const isCurrent = status === currentStatus;
          
          return (
            <div key={status} className={`relative ${isActive ? '' : 'opacity-40'}`}>
              {/* Línea conectora */}
              {index < statusSequence.length - 1 && (
                <div className="absolute left-5 top-8 w-0.5 bg-gray-300 h-full -z-10"></div>
              )}
              
              <div className="flex items-start">
                {/* Ícono de estado */}
                <div className={`flex-shrink-0 rounded-full h-10 w-10 flex items-center justify-center z-10 ${
                  isActive ? `${info.color} bg-opacity-20` : 'bg-gray-200'
                }`}>
                  <info.icon className={isActive ? info.color : 'text-gray-400'} />
                </div>
                
                {/* Información del estado */}
                <div className="ml-4 flex-1">
                  <h3 className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                    {info.label}
                  </h3>
                  <p className={`text-sm ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                    {info.description}
                  </p>
                  
                  {/* Barra de progreso para el estado actual */}
                  {isCurrent && currentStatus !== 'delivered' && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-green-500 h-1.5 rounded-full" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                
                {/* Marca de tiempo (simulada) */}
                {isActive && (
                  <div className="ml-auto text-right">
                    <span className="text-xs text-gray-500">
                      {isCurrent ? 'En progreso' : index === 0 ? 'Hoy, 10:30 AM' : `Hoy, ${11 + index}:${Math.floor(Math.random() * 6)}${Math.floor(Math.random() * 10)} ${index < 3 ? 'AM' : 'PM'}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Botones de control (solo para demo) */}
      {simulateProgress && (
        <div className="mt-8 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Controles de simulación</h3>
          <div className="flex flex-wrap gap-2">
            {statusSequence.map(status => (
              <button
                key={status}
                onClick={() => {
                  setCurrentStatus(status);
                  setProgressPercentage(0);
                  if (onStatusChange) onStatusChange(status);
                }}
                className={`px-3 py-1 text-xs rounded-full ${
                  currentStatus === status 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {statusInfo[status].label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking; 