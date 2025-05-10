import React from 'react';
import { FaTimes, FaCheckCircle, FaFileAlt, FaPrint } from 'react-icons/fa';

interface PurchaseReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  purchase: {
    id: number;
    userId: number;
    productoId: number;
    cantidad: number;
    precioUnitario: string;
    total: string;
    fechaCompra: string;
    estado: string;
    createdAt: string;
    updatedAt: string;
    user?: {
      name: string;
      lastName: string;
      email: string;
    };
    producto?: {
      nombre: string;
      categoria: string;
      precio: string;
      urlImagen: string;
    };
  };
}

const PurchaseReceipt: React.FC<PurchaseReceiptProps> = ({ isOpen, onClose, purchase }) => {
  if (!isOpen) return null;

  // Formatear fecha
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString('es-ES', { month: 'long' });
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${day} de ${month} de ${year}, ${hours}:${minutes}`;
    } catch (error) {
      return dateString;
    }
  };

  // Generar número de recibo basado en ID y fecha
  const receiptNumber = `R-${purchase.id}-${Date.now().toString().slice(-6)}`;
  
  // Impuesto (18% en República Dominicana)
  const subtotal = Number(purchase.precioUnitario) * purchase.cantidad;
  const tax = subtotal * 0.18;
  const total = Number(purchase.total);
  const shipping = total - subtotal - tax;

  const handlePrint = () => {
    const printContent = document.getElementById('receipt-content')?.innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = `
      <div style="padding: 20px;">
        <div style="max-width: 800px; margin: 0 auto;">
          ${printContent}
        </div>
      </div>
    `;
    
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <div className="flex items-center">
            <FaFileAlt className="text-green-600 text-xl mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Recibo de Compra</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6" id="receipt-content">
          {/* Cabecera del recibo */}
          <div className="mb-8 text-center pb-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-green-700 mb-2">Jardín Virtual</h1>
            <p className="text-sm text-gray-500">Tienda online de plantas y artículos de jardinería</p>
          </div>

          {/* Información de recibo */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">INFORMACIÓN DEL RECIBO</h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Número de recibo:</span> {receiptNumber}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Fecha de compra:</span> {formatDate(purchase.fechaCompra)}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Estado:</span> 
                <span className="ml-1 inline-flex items-center">
                  <FaCheckCircle className="text-green-500 mr-1" />
                  {purchase.estado}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Método de pago:</span> Tarjeta de crédito/débito
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">INFORMACIÓN DEL CLIENTE</h3>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Nombre:</span> {purchase.user?.name} {purchase.user?.lastName}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Email:</span> {purchase.user?.email}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">ID de cliente:</span> {purchase.userId}
              </p>
            </div>
          </div>

          {/* Detalles de productos */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">DETALLES DE LA COMPRA</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 border-b border-gray-200 pb-2 mb-2">
                <div className="col-span-6">Producto</div>
                <div className="col-span-2 text-right">Precio</div>
                <div className="col-span-2 text-right">Cantidad</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="grid grid-cols-12 gap-4 text-sm text-gray-800 py-2 border-b border-gray-200">
                <div className="col-span-6 flex items-center">
                  <div className="w-10 h-10 flex-shrink-0 mr-3 bg-gray-200 rounded overflow-hidden">
                    {purchase.producto?.urlImagen && (
                      <img 
                        src={purchase.producto.urlImagen} 
                        alt={purchase.producto.nombre} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{purchase.producto?.nombre}</p>
                    <p className="text-gray-500 text-xs">{purchase.producto?.categoria}</p>
                  </div>
                </div>
                <div className="col-span-2 text-right">RD${Number(purchase.precioUnitario).toFixed(2)}</div>
                <div className="col-span-2 text-right">{purchase.cantidad}</div>
                <div className="col-span-2 text-right font-medium">RD${(Number(purchase.precioUnitario) * purchase.cantidad).toFixed(2)}</div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>RD${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Impuestos (18%)</span>
                  <span>RD${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Envío</span>
                  <span>RD${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>RD${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Políticas y notas */}
          <div className="mb-8 text-sm text-gray-500">
            <h3 className="text-sm font-medium text-gray-500 mb-2">POLÍTICAS Y CONDICIONES</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Las devoluciones deben solicitarse dentro de los 7 días posteriores a la entrega.</li>
              <li>Este documento es su comprobante oficial de compra.</li>
              <li>Para cualquier consulta, contacte a nuestro servicio al cliente.</li>
            </ul>
          </div>

          {/* Pie de página */}
          <div className="text-center text-xs text-gray-500 pt-6 border-t border-gray-200">
            <p>Jardín Virtual S.R.L. - RNC: 123456789</p>
            <p>Av. Principal #123, Santo Domingo, República Dominicana</p>
            <p>Tel: +1 809-555-1234 - Email: info@jardinvirtual.com</p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-center">
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FaPrint className="mr-2" />
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseReceipt; 