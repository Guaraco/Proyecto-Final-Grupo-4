import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { FaShoppingBag, FaSpinner, FaBoxOpen, FaReceipt, FaTruck } from 'react-icons/fa';
import PurchaseReceipt from '../components/PurchaseReceipt';

const Compras = () => {
  const navigate = useNavigate();
  const purchases = useAppStore((state) => state.purchases);
  const getUserPurchases = useAppStore((state) => state.getUserPurchases);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para el modal de recibo
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      setIsLoading(true);
      await getUserPurchases();
      setIsLoading(false);
    };

    fetchPurchases();
  }, [getUserPurchases]);

  // Asegurarnos de que purchases sea un array con la estructura correcta
  const purchasesList = purchases?.userRecipes || [];

  // Estados de compras
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Entregado': return 'bg-green-100 text-green-800';
      case 'En proceso': return 'bg-blue-100 text-blue-800';
      case 'Enviado': return 'bg-purple-100 text-purple-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Formatear fecha manualmente sin date-fns
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString('es-ES', { month: 'long' });
      const year = date.getFullYear();
      return `${day} de ${month} de ${year}`;
    } catch (error) {
      return dateString;
    }
  };

  // Ir al seguimiento del pedido
  const goToTracking = (purchaseId: number) => {
    navigate(`/seguimiento/${purchaseId}`);
  };
  
  // Mostrar recibo
  const showReceipt = (purchase: any) => {
    setSelectedPurchase(purchase);
    setIsReceiptOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-6 pb-16">
      {/* Hero */}
      <div className="bg-green-700 py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white text-center">Mis Compras</h1>
          <p className="mt-2 text-green-100 text-center">
            Historial de todas tus compras y seguimiento de pedidos
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FaSpinner className="animate-spin text-green-600 text-4xl mb-4" />
            <p className="text-gray-600">Cargando tus compras...</p>
          </div>
        ) : purchasesList.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <FaBoxOpen className="text-gray-400 text-6xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No tienes compras realizadas
            </h2>
            <p className="text-gray-500 mb-6">
              ¿Qué tal si visitas nuestro catálogo y descubres nuestros productos?
            </p>
            <a 
              href="/catalogo" 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FaShoppingBag className="mr-2" />
              Ir al catálogo
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {purchasesList.map((purchase) => (
              <div key={purchase.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      Compra #{purchase.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {formatDate(purchase.fechaCompra)}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(purchase.estado)}`}>
                    {purchase.estado}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-start">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                      {purchase.producto?.urlImagen ? (
                        <img 
                          src={purchase.producto.urlImagen} 
                          alt={purchase.producto.nombre} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <FaShoppingBag className="text-gray-400 text-2xl" />
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4 flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {purchase.producto?.nombre || 'Producto no disponible'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {purchase.producto?.categoria || 'Categoría no disponible'}
                        </p>
                        <p className="mt-1 text-sm font-medium text-green-600">
                          RD${Number(purchase.precioUnitario).toFixed(2)} x {purchase.cantidad} unidades
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Detalles de la compra</h4>
                        <p className="text-sm text-gray-500">
                          Fecha: {formatDate(purchase.fechaCompra)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Estado: {purchase.estado}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-sm text-gray-500">Total pagado:</span>
                      <span className="ml-2 text-lg font-semibold text-gray-900">RD${Number(purchase.total).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => goToTracking(purchase.id)}
                        className="inline-flex items-center px-3 py-1 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <FaTruck className="mr-2" />
                        Seguimiento
                      </button>
                      
                      <button 
                        onClick={() => showReceipt(purchase)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <FaReceipt className="mr-2" />
                        Ver recibo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Modal de recibo */}
      {selectedPurchase && (
        <PurchaseReceipt 
          isOpen={isReceiptOpen} 
          onClose={() => setIsReceiptOpen(false)} 
          purchase={selectedPurchase}
        />
      )}
    </div>
  );
};

export default Compras;
