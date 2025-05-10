import React from 'react';

interface CheckoutButtonProps {
  isSubmitting: boolean;
  handleEmergencyTracking: () => void;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ 
  isSubmitting, 
  handleEmergencyTracking 
}) => {
  return (
    <div className="mt-8">
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Procesando...
          </span>
        ) : (
          'Finalizar compra'
        )}
      </button>
      
      {/* Botón de emergencia para seguimiento */}
      <div className="mt-4 text-center">
        <p className="text-gray-500 text-sm mb-2">
          {isSubmitting ? 
            "Si después de finalizar la compra no ves la pantalla de seguimiento, haz clic aquí:" :
            "Si ya realizaste una compra y quieres ver su seguimiento, haz clic aquí:"}
        </p>
        <button
          type="button"
          onClick={handleEmergencyTracking}
          className="text-green-600 hover:text-green-800 underline text-sm font-medium"
        >
          Ver seguimiento del pedido
        </button>
      </div>
    </div>
  );
};

export default CheckoutButton; 