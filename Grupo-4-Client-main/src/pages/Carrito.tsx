import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf, FaTrash, FaArrowLeft, FaPlus, FaMinus } from 'react-icons/fa';
import { useAppStore } from '../store/useAppStore';
import { toast } from 'react-toastify';

const Carrito = () => {
  const items = useAppStore((state) => state.items);
  const totalItems = useAppStore((state) => state.totalItems);
  const totalAmount = useAppStore((state) => state.totalAmount);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const updateQuantity = useAppStore((state) => state.updateQuantity);
  const user = useAppStore((state) => state.user);
  const navigate = useNavigate();

  // Incrementar la cantidad de un producto
  const handleIncrement = (id: number, currentQuantity: number, stockDisponible: number) => {
    if (!user) {
      toast.error("Debes iniciar sesión para modificar el carrito");
      navigate('/login');
      return;
    }
    
    if (currentQuantity < stockDisponible) {
      updateQuantity(id, currentQuantity + 1);
    } else {
      toast.info("Has alcanzado el límite de stock disponible");
    }
  };

  // Decrementar la cantidad de un producto
  const handleDecrement = (id: number, currentQuantity: number) => {
    if (!user) {
      toast.error("Debes iniciar sesión para modificar el carrito");
      navigate('/login');
      return;
    }
    
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  // Eliminar un producto del carrito
  const handleRemove = (id: number) => {
    if (!user) {
      toast.error("Debes iniciar sesión para modificar el carrito");
      navigate('/login');
      return;
    }
    
    removeFromCart(id);
  };

  // Verificar que el usuario está autenticado para proceder al pago
  const handleProceedToCheckout = () => {
    if (!user) {
      toast.error("Debes iniciar sesión para proceder al pago");
      navigate('/login');
      return;
    }

    // Limpiamos cualquier seguimiento pendiente al ir a checkout
    localStorage.removeItem('show_tracking');
    localStorage.removeItem('order_id');
    navigate('/checkout');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero */}
      <div className="bg-green-700 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white text-center">Mi Carrito</h1>
          <p className="mt-2 text-green-100 text-center">
            Revisa tus productos y procede al pago
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Carrito vacío */}
        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="h-24 w-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FaLeaf className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">
              Parece que aún no has añadido productos a tu carrito. Descubre nuestra selección de hierbas medicinales y preparados naturales.
            </p>
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <FaArrowLeft className="mr-2" /> Ir al catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Productos ({totalItems})
                  </h2>
                </div>

                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="p-6 flex flex-col sm:flex-row">
                      <div className="sm:w-24 sm:h-24 h-32 w-full mb-4 sm:mb-0 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.urlImagen}
                          alt={item.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 sm:ml-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{item.nombre}</h3>
                          <p className="mt-1 text-sm text-gray-500">Stock disponible: {item.stockDisponible}</p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <p className="text-lg font-medium text-green-600">
                            RD${Number(item.precio).toFixed(2)}
                          </p>
                          <div className="flex items-center">
                            <button
                              onClick={() => handleDecrement(item.id, item.cantidad)}
                              disabled={item.cantidad <= 1}
                              className={`p-2 rounded-full ${
                                item.cantidad <= 1
                                  ? 'text-gray-400 cursor-not-allowed'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <FaMinus className="h-4 w-4" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              max={item.stockDisponible}
                              value={item.cantidad}
                              onChange={(e) => {
                                const newValue = parseInt(e.target.value);
                                if (!isNaN(newValue) && newValue >= 1 && newValue <= item.stockDisponible) {
                                  updateQuantity(item.id, newValue);
                                }
                              }}
                              className="mx-2 w-12 text-center border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            />
                            <button
                              onClick={() => 
                                handleIncrement(item.id, item.cantidad, item.stockDisponible)
                              }
                              disabled={item.cantidad >= item.stockDisponible}
                              className={`p-2 rounded-full ${
                                item.cantidad >= item.stockDisponible
                                  ? 'text-gray-400 cursor-not-allowed'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <FaPlus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Subtotal: RD${(Number(item.precio) * item.cantidad).toFixed(2)}
                          </p>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-600 hover:text-red-800 flex items-center text-sm"
                          >
                            <FaTrash className="h-4 w-4 mr-1" /> Eliminar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resumen */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Resumen del pedido</h2>
                
                <div className="flow-root">
                  <dl className="-my-4 text-sm divide-y divide-gray-200">
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd className="font-medium text-gray-900">RD${totalAmount.toFixed(2)}</dd>
                    </div>
                    
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-gray-600">Impuestos</dt>
                      <dd className="font-medium text-gray-900">Incluidos</dd>
                    </div>
                    
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">Total</dt>
                      <dd className="text-base font-medium text-green-600">
                        RD${totalAmount.toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    Proceder al pago
                  </button>
                  <Link
                    to="/catalogo"
                    className="w-full flex justify-center items-center px-6 py-3 border border-green-600 rounded-md shadow-sm text-base font-medium text-green-600 bg-white hover:bg-green-50"
                  >
                    Seguir comprando
                  </Link>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Formas de pago aceptadas</h3>
                  <div className="flex space-x-2">
                    <div className="p-2 border border-gray-200 rounded">Visa</div>
                    <div className="p-2 border border-gray-200 rounded">MasterCard</div>
                    <div className="p-2 border border-gray-200 rounded">PayPal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito; 