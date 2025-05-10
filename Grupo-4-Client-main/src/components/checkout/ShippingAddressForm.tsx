import React from 'react';

interface ShippingAddressFormProps {
  formData: {
    direccion: string;
    ciudad: string;
    provincia: string;
    codigoPostal: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="col-span-2">
        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
          Dirección
        </label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <div>
        <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
          Ciudad
        </label>
        <input
          type="text"
          id="ciudad"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <div>
        <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">
          Provincia
        </label>
        <select
          id="provincia"
          name="provincia"
          value={formData.provincia}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Seleccionar provincia</option>
          <option value="Distrito Nacional">Distrito Nacional</option>
          <option value="Santo Domingo">Santo Domingo</option>
          <option value="Santiago">Santiago</option>
          <option value="San Cristóbal">San Cristóbal</option>
          <option value="La Vega">La Vega</option>
          <option value="Puerto Plata">Puerto Plata</option>
          <option value="San Pedro de Macorís">San Pedro de Macorís</option>
          <option value="Duarte">Duarte</option>
          <option value="La Altagracia">La Altagracia</option>
          <option value="La Romana">La Romana</option>
        </select>
      </div>
      <div>
        <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700">
          Código Postal
        </label>
        <input
          type="text"
          id="codigoPostal"
          name="codigoPostal"
          value={formData.codigoPostal}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>
    </div>
  );
};

export default ShippingAddressForm; 