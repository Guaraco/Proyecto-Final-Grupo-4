import { useEffect, useState } from 'react';
import { FaPlus, FaShoppingCart, FaEdit, FaTrash, FaFilter, FaTags } from 'react-icons/fa';
import { useAppStore } from '../store/useAppStore';
import CatalogoModal from '../components/CatalogoModal';
import { toast } from 'react-hot-toast';
import { deleteProduct } from '../services/product/product';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Catalogo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  
  // Estados para los filtros
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroPrecioMin, setFiltroPrecioMin] = useState('');
  const [filtroPrecioMax, setFiltroPrecioMax] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  
  // Obtener el usuario y funciones del store
  const user = useAppStore((state) => state.user);
  const GetProducts = useAppStore((state) => state.GetProducts);
  const inventario = useAppStore((state) => state.products);
  const addToCart = useAppStore((state) => state.addToCart);

  console.log(inventario);

  useEffect(() => {
    GetProducts();
  }, []);

  const isAdmin = user?.role === 'Admin';

  // Función para abrir el modal de añadir producto
  const handleAddProduct = () => {
    setEditProduct(null);
    setIsModalOpen(true);
  };

  // Función para editar un producto existente
  const handleEditProduct = (item: any) => {
    setEditProduct(item);
    setIsModalOpen(true);
  };

  // Función para abrir el modal de confirmación de eliminación
  const openDeleteModal = (item: any) => {
    setProductToDelete(item);
    setDeleteModalOpen(true);
  };

  // Función para eliminar un producto
  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    
    try {
      const result = await deleteProduct(productToDelete.id);
      if (result.success) {
        toast.success('Producto eliminado exitosamente');
        // Recargar la lista de productos
        GetProducts();
      } else {
        toast.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      toast.error('Error al conectar con el servidor');
    } finally {
      // Cerrar el modal y limpiar el producto seleccionado
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  // Función para agregar un producto al carrito
  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      productoId: item.producto.id || item.productoId,
      nombre: item.producto.nombre,
      precio: item.producto.precio,
      urlImagen: item.producto.urlImagen,
      stockDisponible: item.stockDisponible
    });
    
    // Mostrar notificación de éxito
    toast.success(`${item.producto.nombre} añadido al carrito`, {
      duration: 2000,
      position: 'bottom-center'
    });
  };

  // Obtener categorías únicas para el selector
  const categoriasUnicas = () => {
    if (!inventario?.inventario || !Array.isArray(inventario.inventario)) return [];
    
    const categorias = new Set(
      inventario.inventario
        .map(item => item.producto.categoria)
        .filter(Boolean)
    );
    
    return Array.from(categorias);
  };

  // Filtrar productos según los criterios
  const productosFiltrados = () => {
    if (!inventario?.inventario || !Array.isArray(inventario.inventario)) return [];
    
    return inventario.inventario.filter(item => {
      // Filtro por categoría
      if (filtroCategoria && item.producto.categoria !== filtroCategoria) {
        return false;
      }
      
      // Filtro por precio mínimo
      if (filtroPrecioMin && parseFloat(item.producto.precio.toString()) < parseFloat(filtroPrecioMin)) {
        return false;
      }
      
      // Filtro por precio máximo
      if (filtroPrecioMax && parseFloat(item.producto.precio.toString()) > parseFloat(filtroPrecioMax)) {
        return false;
      }
      
      return true;
    });
  };

  // Limpiar todos los filtros
  const limpiarFiltros = () => {
    setFiltroCategoria('');
    setFiltroPrecioMin('');
    setFiltroPrecioMax('');
  };

  // Obtener los productos filtrados
  const productosMostrados = productosFiltrados();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Título del catálogo */}
      <div className="relative bg-green-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Catálogo de Productos
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-green-100">
              Descubre nuestra selección de hierbas medicinales, tinturas y plantas para tu bienestar natural
            </p>
          </div>
        </div>
      </div>

      {/* Contenedor para el botón de añadir producto y filtros */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {isAdmin && (
            <button
              onClick={handleAddProduct}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <FaPlus className="mr-2 h-4 w-4" />
              Añadir Producto
            </button>
          )}
          {!isAdmin && <div></div>}
          
          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FaFilter className="mr-2 h-4 w-4 text-gray-500" />
            {mostrarFiltros ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>
        </div>
        
        {/* Panel de filtros */}
        {mostrarFiltros && (
          <div className="mt-6 mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-medium text-gray-900 flex items-center">
                <FaFilter className="mr-2 text-gray-500" />
                Filtros
              </h2>
              <div className="text-base text-gray-600">
                {productosMostrados.length} {productosMostrados.length === 1 ? 'producto' : 'productos'}
                {(filtroCategoria || filtroPrecioMin || filtroPrecioMax) && (
                  <button
                    onClick={limpiarFiltros}
                    className="ml-3 text-base text-green-600 hover:text-green-800 font-medium px-3 py-1 rounded hover:bg-green-50 border border-green-100"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pt-4 border-t border-gray-100">
              <div>
                <label htmlFor="filtroCategoria" className="block text-base font-medium text-gray-700 mb-2">
                  <FaTags className="inline mr-1" /> Categoría
                </label>
                <select
                  id="filtroCategoria"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm h-10 py-2 px-3 text-base"
                >
                  <option value="">Todas las categorías</option>
                  {categoriasUnicas().map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="filtroPrecioMin" className="block text-base font-medium text-gray-700 mb-2">
                  Precio mínimo (RD$)
                </label>
                <input
                  type="number"
                  id="filtroPrecioMin"
                  value={filtroPrecioMin}
                  onChange={(e) => setFiltroPrecioMin(e.target.value)}
                  min="0"
                  placeholder="Precio mínimo"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm h-10 py-2 px-3 text-base"
                />
              </div>
              
              <div>
                <label htmlFor="filtroPrecioMax" className="block text-base font-medium text-gray-700 mb-2">
                  Precio máximo (RD$)
                </label>
                <input
                  type="number"
                  id="filtroPrecioMax"
                  value={filtroPrecioMax}
                  onChange={(e) => setFiltroPrecioMax(e.target.value)}
                  min="0"
                  placeholder="Precio máximo"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm h-10 py-2 px-3 text-base"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-0">
        {productosMostrados.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productosMostrados.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 relative">
                {item.stockDisponible <= 0 && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg font-semibold z-10">
                    Agotado
                  </div>
                )}
                {isAdmin && (
                  <>
                    <button 
                      onClick={() => handleEditProduct(item)}
                      className="absolute top-0 left-0 bg-blue-600 text-white p-2 rounded-br-lg z-10 hover:bg-blue-700 transition-colors cursor-pointer"
                      title="Editar producto"
                    >
                      <FaEdit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => openDeleteModal(item)}
                      className="absolute top-0 left-10 bg-red-600 text-white p-2 rounded-br-lg z-10 hover:bg-red-700 transition-colors cursor-pointer"
                      title="Eliminar producto"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </>
                )}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.producto.urlImagen} 
                    alt={item.producto.nombre} 
                    className={`w-full h-full object-cover ${item.stockDisponible <= 0 ? 'opacity-70' : ''}`}
                  />
                </div>
                <div className="p-4 flex flex-col h-64">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 h-14 overflow-hidden">{item.producto.nombre}</h2>
                  <p className="text-gray-600 text-sm mb-3 h-10 overflow-hidden">{item.producto.descripcion}</p>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-green-600 font-bold text-lg">RD${item.producto.precio}</p>
                    <p className="text-sm text-gray-500">Stock: {item.stockDisponible}</p>
                  </div>
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <FaTags className="mr-1" /> {item.producto.categoria || 'Sin categoría'}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className={`w-full mt-auto py-2 text-white font-medium rounded-md transition-colors duration-300 flex items-center justify-center ${
                      item.stockDisponible > 0 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={item.stockDisponible <= 0}
                  >
                    <FaShoppingCart className="h-5 w-5 mr-2" />
                    {item.stockDisponible > 0 ? 'Añadir al carrito' : 'Agotado'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white shadow rounded-lg">
            <p className="text-xl text-gray-600">
              {(filtroCategoria || filtroPrecioMin || filtroPrecioMax) 
                ? 'No se encontraron productos con los filtros seleccionados.' 
                : 'No hay productos disponibles en este momento.'}
            </p>
          </div>
        )}
      </div>

      {/* Modal para añadir/editar producto */}
      <CatalogoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editProduct}
      />

      {/* Modal de confirmación para eliminar producto */}
      <Transition.Root show={deleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setDeleteModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FaTrash className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Eliminar producto
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            ¿Estás seguro de que deseas eliminar el producto "{productToDelete?.producto?.nombre}"? 
                            Esta acción no se puede deshacer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={confirmDeleteProduct}
                    >
                      Eliminar
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setDeleteModalOpen(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Catalogo;
