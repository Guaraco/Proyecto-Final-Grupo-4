import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { FaTimesCircle, FaSave } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createProduct, updateProduct } from '../services/product/product';
import { toast } from 'react-toastify';
import { useAppStore } from '../store/useAppStore';
import { ProductInput } from '../types';

// Categorías disponibles
const categoriesOptions = [
  { id: 'hierbas-frescas', name: 'Hierbas Frescas' },
  { id: 'hierbas-secas', name: 'Hierbas Secas' },
  { id: 'tinturas', name: 'Tinturas' },
  { id: 'plantas', name: 'Plantas Medicinales' }
];

interface CatalogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any; // El tipo aquí es más flexible para manejar la estructura que viene de la API
}

// Definir un tipo más específico para el formulario - ahora usa ProductInput
type ProductFormData = ProductInput;

const CatalogoModal: React.FC<CatalogoModalProps> = ({
  isOpen,
  onClose,
  product
}) => {
  // Obtener la función para recargar productos
  const GetProducts = useAppStore((state) => state.GetProducts);

  // Configuración de React Hook Form
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset, 
    watch, 
  } = useForm<ProductFormData>({
    defaultValues: {
      nombre: '',
      descripcion: '',
      precio: 0,
      urlImagen: '',
      categoria: 'hierbas-frescas',
      stock: 1
    }
  });

  // Observar el valor de urlImagen para la previsualización
  const urlImagen = watch('urlImagen');

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (product) {
      reset({
        nombre: product.producto?.nombre || '',
        descripcion: product.producto?.descripcion || '',
        precio: product.producto?.precio || 0,
        urlImagen: product.producto?.urlImagen || '',
        categoria: product.producto?.categoria || 'hierbas-frescas',
        stock: product.stockDisponible || 0
      });
    } else {
      reset({
        nombre: '',
        descripcion: '',
        precio: 0,
        urlImagen: '',
        categoria: 'hierbas-frescas',
        stock: 1
      });
    }
  }, [product, reset]);

  // Manejar envío del formulario
  const onSubmitForm: SubmitHandler<ProductFormData> = async (data) => {
    try {
      console.log('Formulario enviado:', data);
      
      // Verificar que todos los campos requeridos estén presentes
      if (!data.nombre || !data.descripcion || !data.urlImagen || !data.categoria) {
        console.error('Faltan campos requeridos en el formulario');
        toast.error('Por favor completa todos los campos requeridos');
        return;
      }
      
      if (product) {
        // Lógica para actualizar un producto existente
        console.log('Actualizando producto existente:', product.id);
        
        // Enviamos los datos en el formato correcto
        const result = await updateProduct(product.id, {
          nombre: data.nombre,
          descripcion: data.descripcion,
          precio: data.precio,
          urlImagen: data.urlImagen,
          categoria: data.categoria,
          stock: data.stock
        });
        
        if (result.success) {
          toast.success('¡Producto actualizado exitosamente!');
          // Recargar la lista de productos para reflejar los cambios
          GetProducts();
        } else {
          toast.error('Error al actualizar el producto. Intenta nuevamente.');
          return;
        }
      } else {
        // Lógica para crear un nuevo producto
        const result = await createProduct({
          nombre: data.nombre,
          descripcion: data.descripcion,
          precio: data.precio,
          urlImagen: data.urlImagen,
          categoria: data.categoria,
          stock: data.stock
        });
        
        if (result.success) {
          toast.success('¡Producto creado exitosamente!');
          // Recargar la lista de productos para mostrar el nuevo
          GetProducts();
        } else {
          toast.error('Error al crear el producto. Intenta nuevamente.');
          return;
        }
      }
      
      onClose();
      reset();
    } catch (error) {
      console.error('Error inesperado:', error);
      toast.error('Error inesperado al procesar el producto');
    }
  };

  // Función para previsualizar la imagen
  const getImagePreview = () => {
    if (urlImagen && typeof urlImagen === 'string' && urlImagen.startsWith('http')) {
      return (
        <div className="mt-2 relative rounded-md overflow-hidden h-32 w-32 bg-gray-100">
          <img 
            src={urlImagen} 
            alt="Vista previa" 
            className="h-full w-full object-cover"
            onError={(e) => {
              // Manejar errores de carga de imagen
              e.currentTarget.src = 'https://via.placeholder.com/150?text=Error+de+imagen';
            }}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-transparent"></div>
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto bg-transparent">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border border-green-400">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Cerrar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      {product ? 'Editar Producto' : 'Añadir Nuevo Producto'}
                    </Dialog.Title>
                    <div className="mt-4">
                      <form onSubmit={handleSubmit(onSubmitForm)}>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          {/* Nombre */}
                          <div className="sm:col-span-6">
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                              Nombre
                            </label>
                            <div className="mt-1">
                              <input
                                id="nombre"
                                {...register('nombre', { required: 'El nombre es obligatorio' })}
                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-base py-2 px-4 ${
                                  errors.nombre ? 'border-red-300' : ''
                                }`}
                              />
                              {errors.nombre && (
                                <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
                              )}
                            </div>
                          </div>

                          {/* Descripción */}
                          <div className="sm:col-span-6">
                            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                              Descripción
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="descripcion"
                                rows={4}
                                {...register('descripcion', { required: 'La descripción es obligatoria' })}
                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-base py-2 px-4 ${
                                  errors.descripcion ? 'border-red-300' : ''
                                }`}
                              />
                              {errors.descripcion && (
                                <p className="mt-1 text-sm text-red-600">{errors.descripcion.message}</p>
                              )}
                            </div>
                          </div>

                          {/* Precio */}
                          <div className="sm:col-span-3">
                            <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                              Precio (RD$)
                            </label>
                            <div className="mt-1">
                              <input
                                type="number"
                                id="precio"
                                step="1"
                                {...register('precio', { 
                                  required: 'El precio es obligatorio',
                                  valueAsNumber: true
                                })}
                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-base py-2 px-4 ${
                                  errors.precio ? 'border-red-300' : ''
                                }`}
                              />
                              {errors.precio && (
                                <p className="mt-1 text-sm text-red-600">{errors.precio.message}</p>
                              )}
                            </div>
                          </div>

                          {/* Stock */}
                          <div className="sm:col-span-3">
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                              Stock
                            </label>
                            <div className="mt-1">
                              <input
                                type="number"
                                id="stock"
                                min="0"
                                {...register('stock', { 
                                  required: 'El stock es obligatorio',
                                  min: { value: 0, message: 'El stock no puede ser negativo' },
                                  valueAsNumber: true
                                })}
                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-base py-2 px-4 ${
                                  errors.stock ? 'border-red-300' : ''
                                }`}
                              />
                              {errors.stock && (
                                <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
                              )}
                            </div>
                          </div>

                          {/* Categoría */}
                          <div className="sm:col-span-6">
                            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                              Categoría
                            </label>
                            <div className="mt-1">
                              <select
                                id="categoria"
                                {...register('categoria')}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-base py-2 px-4"
                              >
                                {categoriesOptions.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* URL de la imagen */}
                          <div className="sm:col-span-6">
                            <label htmlFor="urlImagen" className="block text-sm font-medium text-gray-700">
                              URL de la imagen
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="urlImagen"
                                {...register('urlImagen', { required: 'La URL de la imagen es obligatoria' })}
                                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-base py-2 px-4 ${
                                  errors.urlImagen ? 'border-red-300' : ''
                                }`}
                                placeholder="https://ejemplo.com/imagen.jpg"
                              />
                              {errors.urlImagen && (
                                <p className="mt-1 text-sm text-red-600">{errors.urlImagen.message}</p>
                              )}
                              {getImagePreview()}
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                          <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm"
                          >
                            <FaTimesCircle className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            <FaSave className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                            {isSubmitting 
                              ? 'Procesando...' 
                              : (product ? 'Guardar cambios' : 'Crear producto')}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CatalogoModal;
