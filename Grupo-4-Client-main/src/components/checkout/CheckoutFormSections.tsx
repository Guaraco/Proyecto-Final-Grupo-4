import React from 'react';
import { UseFormRegister, FormState } from 'react-hook-form';
import PaymentMethodForm from './PaymentMethodForm';
import CheckoutButton from './CheckoutButton';

export type CheckoutFormValues = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  pais: string;
  codigoPostal: string;
  metodoPago: string;
  numeroTarjeta?: string;
  fechaExpiracion?: string;
  cvv?: string;
  nombreTitular?: string;
  zona: string;
};

interface FormSectionProps {
  register: UseFormRegister<CheckoutFormValues>;
  formState: FormState<CheckoutFormValues>;
  formData: CheckoutFormValues;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const ContactInfoSection: React.FC<FormSectionProps> = ({ register, formState }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          Información de contacto
        </h2>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            {...register('nombre', { required: 'Este campo es requerido' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
          {formState.errors.nombre && (
            <p className="mt-1 text-sm text-red-600">{formState.errors.nombre.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            {...register('apellido', { required: 'Este campo es requerido' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
          {formState.errors.apellido && (
            <p className="mt-1 text-sm text-red-600">{formState.errors.apellido.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { 
              required: 'Este campo es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Dirección de correo inválida"
              }
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
          {formState.errors.email && (
            <p className="mt-1 text-sm text-red-600">{formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            {...register('telefono', { required: 'Este campo es requerido' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
          {formState.errors.telefono && (
            <p className="mt-1 text-sm text-red-600">{formState.errors.telefono.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const ShippingAddressSection: React.FC<FormSectionProps> = ({ register, formState }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          Dirección de envío
        </h2>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            {...register('direccion', { required: 'Este campo es requerido' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
          {formState.errors.direccion && (
            <p className="mt-1 text-sm text-red-600">{formState.errors.direccion.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
              Ciudad
            </label>
            <input
              type="text"
              id="ciudad"
              {...register('ciudad', { required: 'Este campo es requerido' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
            {formState.errors.ciudad && (
              <p className="mt-1 text-sm text-red-600">{formState.errors.ciudad.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="zona" className="block text-sm font-medium text-gray-700">
              Zona de Santo Domingo
            </label>
            <select
              id="zona"
              {...register('zona', { required: 'Este campo es requerido' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="Distrito Nacional">Distrito Nacional</option>
              <option value="Santo Domingo Norte">Santo Domingo Norte</option>
              <option value="Santo Domingo Este">Santo Domingo Este</option>
              <option value="Santo Domingo Oeste">Santo Domingo Oeste</option>
              <option value="Otra">Otra localidad</option>
            </select>
            {formState.errors.zona && (
              <p className="mt-1 text-sm text-red-600">{formState.errors.zona.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pais" className="block text-sm font-medium text-gray-700">
              País
            </label>
            <select
              id="pais"
              {...register('pais', { required: 'Este campo es requerido' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="República Dominicana">República Dominicana</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Panamá">Panamá</option>
            </select>
            {formState.errors.pais && (
              <p className="mt-1 text-sm text-red-600">{formState.errors.pais.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700">
              Código Postal
            </label>
            <input
              type="text"
              id="codigoPostal"
              {...register('codigoPostal')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PaymentSection: React.FC<FormSectionProps & {
  isSubmitting: boolean;
  handleEmergencyTracking: () => void;
  totalConEnvio: number;
  onPaymentCompleted: (paymentData: any) => void;
}> = ({ 
  formData, 
  handleInputChange, 
  isSubmitting, 
  handleEmergencyTracking, 
  totalConEnvio,
  onPaymentCompleted
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          Método de pago
        </h2>
      </div>
      <div className="p-6">
        <PaymentMethodForm
          formData={formData}
          handleInputChange={handleInputChange}
          totalConEnvio={totalConEnvio}
          onPaymentCompleted={onPaymentCompleted}
        />
        
        {/* Botón de finalizar compra */}
        <CheckoutButton 
          isSubmitting={isSubmitting}
          handleEmergencyTracking={handleEmergencyTracking}
        />
      </div>
    </div>
  );
}; 