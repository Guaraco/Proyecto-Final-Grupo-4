import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useAppStore } from '../store/useAppStore';
import { Link } from 'react-router-dom';
import { CartModalProps } from '../types';

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const items = useAppStore((state) => state.items);
  const totalItems = useAppStore((state) => state.totalItems);
  const totalAmount = useAppStore((state) => state.totalAmount);
  const updateQuantity = useAppStore((state) => state.updateQuantity);
  const removeFromCart = useAppStore((state) => state.removeFromCart);

  const handleIncrement = (id: number, currentQuantity: number, stockDisponible: number) => {
    if (currentQuantity < stockDisponible) {
      updateQuantity(id, currentQuantity + 1);
    }
  };

  const handleDecrement = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-lg flex flex-col animate-slide-in-right">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-green-50">
          <h2 className="text-lg font-semibold text-green-700 flex items-center">
            <FaShoppingCart className="mr-2" /> Carrito de compras
            <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              {totalItems}
            </span>
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 focus:outline-none"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-grow overflow-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-lg mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-center mb-4">
                Agrega algunos productos de nuestro catálogo
              </p>
              <Link 
                to="/catalogo" 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                onClick={onClose}
              >
                Ver catálogo
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="flex bg-white border border-gray-200 rounded-md p-3 hover:shadow-md transition-shadow"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden mr-3 flex-shrink-0">
                    <img 
                      src={item.urlImagen} 
                      alt={item.nombre} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800">{item.nombre}</h3>
                    <p className="text-sm text-gray-500">
                      Stock disponible: {item.stockDisponible}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="text-green-600 font-semibold">
                        RD${Number(item.precio).toFixed(2)}
                      </div>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => handleDecrement(item.id, item.cantidad)}
                          disabled={item.cantidad <= 1}
                          className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                            item.cantidad <= 1 
                              ? 'border-gray-300 text-gray-300 cursor-not-allowed' 
                              : 'border-green-500 text-green-500 hover:bg-green-50'
                          }`}
                        >
                          <FaMinus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.cantidad}</span>
                        <button 
                          onClick={() => handleIncrement(item.id, item.cantidad, item.stockDisponible)}
                          disabled={item.cantidad >= item.stockDisponible}
                          className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                            item.cantidad >= item.stockDisponible 
                              ? 'border-gray-300 text-gray-300 cursor-not-allowed' 
                              : 'border-green-500 text-green-500 hover:bg-green-50'
                          }`}
                        >
                          <FaPlus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Subtotal: RD${(Number(item.precio) * item.cantidad).toFixed(2)}
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm flex items-center"
                      >
                        <FaTrash className="h-3 w-3 mr-1" /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal:</span>
              <span>RD${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-800 mb-4">
              <span>Total:</span>
              <span>RD${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="flex-1 border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
              >
                Seguir comprando
              </button>
              <Link
                to="/checkout"
                onClick={() => {
                  onClose();
                  localStorage.removeItem('show_tracking');
                  localStorage.removeItem('order_id');
                }}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors text-center"
              >
                Proceder al pago
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal; 