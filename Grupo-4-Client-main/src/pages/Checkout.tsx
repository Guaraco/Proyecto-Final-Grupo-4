import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useAppStore } from '../store/useAppStore';
import { toast } from 'react-hot-toast';
import { BuyData } from '../types';
import { buy } from '../services/user/user';
import { useForm } from 'react-hook-form';
import CheckoutTrackingView from '../components/checkout/CheckoutTrackingView';
import CheckoutSummaryPanel from '../components/checkout/CheckoutSummaryPanel';
import { 
  CheckoutFormValues, 
  ContactInfoSection, 
  ShippingAddressSection, 
  PaymentSection 
} from '../components/checkout/CheckoutFormSections';

// Definir costos de envío por zona
const costosPorZona = {
  'Santo Domingo Norte': 150,
  'Santo Domingo Este': 120,
  'Santo Domingo Oeste': 130,
  'Distrito Nacional': 100,
  'Otra': 200
};

const Checkout = () => {
  const items = useAppStore((state) => state.items);
  const totalItems = useAppStore((state) => state.totalItems);
  const totalAmount = useAppStore((state) => state.totalAmount);
  const clearCart = useAppStore((state) => state.clearCart);
  const user = useAppStore((state) => state.user);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [debugMode, setDebugMode] = useState(false);
  const trackingActivated = useRef(false);
  
  const [costoEnvio, setCostoEnvio] = useState(0);
  const [totalConEnvio, setTotalConEnvio] = useState(totalAmount);
  
  const { register, handleSubmit: hookFormSubmit, formState, watch, setValue } = useForm<CheckoutFormValues>({
    defaultValues: {
      nombre: user?.name.split(' ')[0] || '',
      apellido: user?.lastName || '',
      email: user?.email || '',
      telefono: '',
      direccion: '',
      ciudad: '',
      provincia: '',
      pais: 'República Dominicana',
      codigoPostal: '',
      metodoPago: 'tarjeta',
      numeroTarjeta: '',
      fechaExpiracion: '',
      cvv: '',
      nombreTitular: '',
      zona: 'Distrito Nacional',
    }
  });

  const [formData, setFormData] = useState<CheckoutFormValues>({
    nombre: user?.name.split(' ')[0] || '',
    apellido: user?.lastName || '',
    email: user?.email || '',
    telefono: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    pais: 'República Dominicana',
    codigoPostal: '',
    metodoPago: 'tarjeta',
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: '',
    nombreTitular: '',
    zona: 'Distrito Nacional',
  });

  const zona = watch('zona');
  
  useEffect(() => {
    const nuevoCostoEnvio = costosPorZona[zona as keyof typeof costosPorZona] || 0;
    setCostoEnvio(nuevoCostoEnvio);
    setTotalConEnvio(totalAmount + nuevoCostoEnvio);
    
    setFormData(prev => ({
      ...prev,
      zona
    }));
  }, [zona, totalAmount]);

  useEffect(() => {
    if (showTracking) {
      console.log("✅ showTracking ACTIVADO - La pantalla de seguimiento debería mostrarse");
      trackingActivated.current = true;
    } else if (trackingActivated.current) {
      console.warn("⚠️ showTracking cambió a FALSE después de haberse activado");
    }
  }, [showTracking]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'd') {
        setDebugMode(prev => !prev);
        console.log(`Modo depuración ${!debugMode ? 'ACTIVADO' : 'DESACTIVADO'}`);
      }
      
      if (debugMode && e.ctrlKey && e.altKey && e.key === 't') {
        const orderId = `DEBUG-${Date.now().toString().slice(-6)}`;
        localStorage.setItem('order_id', orderId);
        
        toast.success('Pantalla de seguimiento forzada', {
          duration: 3000,
          position: 'bottom-center',
        });
        
        navigate(`/seguimiento/${orderId}`);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [debugMode, navigate]);

  useEffect(() => {
    const pendingTracking = localStorage.getItem('show_tracking');
    const savedOrderId = localStorage.getItem('order_id');
    
    if (!isSubmitting && pendingTracking === 'true' && savedOrderId) {
      console.log("Recuperando seguimiento pendiente para el pedido:", savedOrderId);
      setOrderId(savedOrderId);
      setShowTracking(true);
    }
  }, [isSubmitting]);

  if (items.length === 0) {
    navigate('/catalogo');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    setValue(name as keyof CheckoutFormValues, value);
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    console.log("INICIO DE PROCESO DE FINALIZAR COMPRA");

    try {
      const exactTotal = totalConEnvio;
      const exactSubtotal = totalAmount;
      const exactEnvio = costoEnvio;
      
      const buyData: BuyData = {
        productoId: items[0].id,
        cantidad: items[0].cantidad,
        userId: user?.id || 0,
        total: exactTotal,
        telefono: data.telefono,
        direccion: data.direccion,
        ciudad: data.ciudad,
        pais: data.pais,
        codigoPostal: data.codigoPostal,
      };

      const orderDetails = {
        items: items.map(item => ({
          id: item.id,
          nombre: item.nombre,
          precio: Number(item.precio),
          cantidad: item.cantidad,
          urlImagen: item.urlImagen
        })),
        subtotal: exactSubtotal,
        envio: exactEnvio,
        total: exactTotal,
        direccion: data.direccion,
        ciudad: data.ciudad,
        pais: data.pais,
        codigoPostal: data.codigoPostal,
        telefono: data.telefono
      };
      
      console.log("Guardando detalles exactos del pedido:", orderDetails);
      localStorage.setItem('order_details', JSON.stringify(orderDetails));

      const tempOrderId = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderId(tempOrderId);
      console.log("ID de pedido generado:", tempOrderId);
      
      try {
        console.log("Enviando datos al backend:", buyData);
        const response = await buy(buyData);
        console.log("Respuesta del servidor:", response);
        
        const responseId = response?.id;
        if (responseId) {
          console.log("Usando ID del servidor:", responseId);
          setOrderId(responseId);
          localStorage.setItem('order_id', responseId);
        } else {
          localStorage.setItem('order_id', tempOrderId);
        }
      } catch (error) {
        console.error("Error en la compra:", error);
        toast.error('Hubo un problema con el servidor, pero puedes seguir el estado de tu pedido');
        localStorage.setItem('order_id', tempOrderId);
      }
      
      console.log("Limpiando carrito");
      clearCart();
      
      console.log("Mostrando mensaje de éxito");
      toast.success('¡Pedido realizado con éxito!', {
        duration: 3000,
        position: 'bottom-center',
      });
      
      localStorage.setItem('is_recent_purchase', 'true');
      
      setTimeout(() => {
        const finalOrderId = localStorage.getItem('order_id') || tempOrderId;
        
        navigate(`/seguimiento/${finalOrderId}`);
      }, 1000);
      
    } catch (error) {
      console.error('Error general al procesar el pedido:', error);
      toast.error('No se pudo procesar tu pedido. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentCompleted = (paymentData: any) => {
    toast.success('Pago verificado correctamente', {
      duration: 3000,
      position: 'bottom-center',
    });
    
    if (paymentData.autoComplete) {
      hookFormSubmit(onSubmit)();
    }
  };

  if (showTracking) {
    console.log("RENDERIZANDO COMPONENTE DE SEGUIMIENTO");
    
    const savedOrderDetails = localStorage.getItem('order_details');
    console.log("Detalles recuperados:", savedOrderDetails);
    
    let orderDetails = null;
    try {
      orderDetails = savedOrderDetails ? JSON.parse(savedOrderDetails) : null;
      console.log("Datos parseados correctamente:", orderDetails);
    } catch (error) {
      console.error("Error al parsear los detalles del pedido:", error);
      orderDetails = null;
    }
    
    const orderItems = orderDetails?.items || items;
    const orderSubtotal = orderDetails?.subtotal || totalAmount;
    const orderEnvio = orderDetails?.envio || costoEnvio;
    const orderTotal = orderDetails?.total || totalConEnvio;
    const orderDireccion = orderDetails?.direccion || formData.direccion;
    const orderCiudad = orderDetails?.ciudad || formData.ciudad;
    const orderPais = orderDetails?.pais || formData.pais;
    const orderCodigoPostal = orderDetails?.codigoPostal || formData.codigoPostal;
    const orderTelefono = orderDetails?.telefono || formData.telefono;
    
    console.log("Valores usados en el seguimiento:");
    console.log(`- Subtotal: ${orderSubtotal}`);
    console.log(`- Envío: ${orderEnvio}`);
    console.log(`- Total: ${orderTotal}`);
    
    return (
      <CheckoutTrackingView 
        orderId={orderId}
        orderDetails={{
          items: orderItems,
          subtotal: orderSubtotal,
          envio: orderEnvio,
          total: orderTotal,
          direccion: orderDireccion,
          ciudad: orderCiudad,
          pais: orderPais,
          codigoPostal: orderCodigoPostal,
          telefono: orderTelefono
        }}
      />
    );
  }

  if (debugMode) {
    console.log("🔍 Estado actual:");
    console.log(`- showTracking: ${showTracking}`);
    console.log(`- orderId: ${orderId}`);
    console.log(`- isSubmitting: ${isSubmitting}`);
  }

  const handleEmergencyTracking = () => {
    let trackingId = localStorage.getItem('order_id');
    
    if (!trackingId) {
      trackingId = `TEMP-${Date.now().toString().slice(-6)}`;
      localStorage.setItem('order_id', trackingId);
      
      const tempOrderDetails = {
        items: items.map(item => ({
          id: item.id,
          nombre: item.nombre,
          precio: Number(item.precio),
          cantidad: item.cantidad,
          urlImagen: item.urlImagen
        })),
        subtotal: totalAmount,
        envio: costoEnvio,
        total: totalConEnvio,
        direccion: formData.direccion || "Dirección de ejemplo",
        ciudad: formData.ciudad || "Ciudad de ejemplo",
        pais: formData.pais || "País de ejemplo",
        codigoPostal: formData.codigoPostal || "12345",
        telefono: formData.telefono || "123-456-7890"
      };
      localStorage.setItem('order_details', JSON.stringify(tempOrderDetails));
    }
    
    toast.success('Redirigiendo al seguimiento del pedido...', {
      duration: 2000,
      position: 'bottom-center',
    });
    
    navigate(`/seguimiento/${trackingId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="bg-green-700 py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white text-center">Finalizar Compra</h1>
          <p className="mt-2 text-green-100 text-center">
            Completa los datos para realizar tu pedido
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/carrito" className="text-green-600 hover:text-green-700 inline-flex items-center">
            <FaArrowLeft className="mr-2" /> Volver al carrito
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={hookFormSubmit(onSubmit)}>
              <div className="space-y-6">
                <ContactInfoSection 
                  register={register} 
                  formState={formState} 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                />

                <ShippingAddressSection 
                  register={register} 
                  formState={formState} 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                />

                <PaymentSection 
                  register={register} 
                  formState={formState} 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                  isSubmitting={isSubmitting}
                  handleEmergencyTracking={handleEmergencyTracking}
                  totalConEnvio={totalConEnvio}
                  onPaymentCompleted={handlePaymentCompleted}
                />
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <CheckoutSummaryPanel 
              items={items}
              totalItems={totalItems}
              totalAmount={totalAmount}
              costoEnvio={costoEnvio}
              totalConEnvio={totalConEnvio}
              zona={formData.zona}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Checkout; 