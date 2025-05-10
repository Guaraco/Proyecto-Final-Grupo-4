export type RegisterData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

// CartItem type from store/cart.ts
export type CartItem = {
  id: number;
  productoId: number;
  nombre: string;
  precio: string | number;
  urlImagen: string;
  cantidad: number;
  stockDisponible: number;
};

export type LoginData = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role : string;
};

export type Product = {
  inventario: [
    {
      id: number;
      productoId: number;
      stockDisponible: number;
      producto: {
        nombre: string;
        descripcion: string;
        precio: number;
        categoria: string;
        urlImagen: string;
      }
     
    }
  ]
 
};

export type BuyData = {
  productoId: number;
  cantidad: number;
  userId: number;
  total: number;
  telefono: string;
  direccion: string;
  ciudad: string;
  pais: string;
  codigoPostal: string;
}

export type Purchase = {
  userRecipes: [
    {
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
      user: {
        name: string;
        lastName: string;
        email: string;
      };
      producto: {
        nombre: string;
        categoria: string;
        precio: string;
        urlImagen: string;
      }
    }
  ]
}

export type Contacto = {
  tipoDeConsulta: string;
  nombreCompleto: string;
  email: string;
  telefono: string;
  mensaje: string;
}

export type Category = {
  id: number;
  name: string;
  description: string;
};

export type ProductFilters = {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
};

export type ProductInput = {
  nombre: string;
  descripcion: string;
  precio: number;
  urlImagen: string;
  categoria: string;
  stock: number;
};

export type FeaturedProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

// Interfaces from other files

// From src/store/contact.ts
export type ContactoResponse = Contacto & {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
};

// From src/pages/OrderTrackingPage.tsx and src/components/checkout/CheckoutTrackingView.tsx
export type OrderDetails = {
  items: CartItem[];
  subtotal: number;
  envio: number;
  total: number;
  direccion: string;
  ciudad: string;
  pais: string;
  codigoPostal: string;
  telefono: string;
};

// From src/pages/Perfil.tsx
export type UserProfile = {
  nombre: string;
  apellido: string;
  email: string;
};

export type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

// From src/components/OrderTracking.tsx
export type OrderStatus = 'processing' | 'packed' | 'shipped' | 'in_delivery' | 'delivered';

export type OrderTrackingProps = {
  orderId: string;
  initialStatus?: OrderStatus;
  estimatedDelivery?: string;
  simulateProgress?: boolean;
  onStatusChange?: (status: OrderStatus) => void;
};

// From src/components/PaymentQRCode.tsx
export type PaymentQRCodeProps = {
  amount: number;
  reference?: string;
  phoneNumber?: string;
  merchantName?: string;
  formData?: any;
  onPaymentCompleted?: (paymentData: any) => void;
  autoComplete?: boolean;
};

// From src/components/EmergencyTrackingModal.tsx
export type EmergencyTrackingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// From src/components/EmergencyTrackingButton.tsx
export type EmergencyTrackingButtonProps = {
  buttonText?: string;
  buttonClassName?: string;
  iconOnly?: boolean;
};

// From src/components/checkout/ShippingAddressForm.tsx
export type ShippingAddressFormProps = {
  onSubmit: (data: any) => void;
  defaultValues: any;
};

// From src/components/checkout/PaymentMethodForm.tsx
export type PaymentMethodFormProps = {
  onSubmit: (data: any) => void;
  defaultValues: any;
};

// From src/components/PurchaseReceipt.tsx
export type PurchaseReceiptProps = {
  orderDetails: any;
  orderId: string;
};

// From src/components/checkout/ContactInfoForm.tsx
export type ContactInfoFormProps = {
  onSubmit: (data: any) => void;
  defaultValues: any;
};

// From src/components/checkout/OrderSummary.tsx
export type OrderSummaryProps = {
  items: any[];
  subtotal: number;
  shipping: number;
  total: number;
};

// From src/components/checkout/CheckoutTrackingView.tsx
export type CheckoutTrackingViewProps = {
  orderId: string;
};

// From src/components/checkout/CheckoutSummaryPanel.tsx
export type CheckoutSummaryPanelProps = {
  items: any[];
  subtotal: number;
  shipping: number;
  total: number;
};

// From src/components/checkout/CheckoutFormSections.tsx
export type FormSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  isCompleted: boolean;
  isActive: boolean;
  onEdit: () => void;
};

// From src/components/checkout/CheckoutButton.tsx
export type CheckoutButtonProps = {
  label: string;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

// From src/components/CatalogoModal.tsx
export type CatalogoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: any;
};

// From src/components/CartModal.tsx
export type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

