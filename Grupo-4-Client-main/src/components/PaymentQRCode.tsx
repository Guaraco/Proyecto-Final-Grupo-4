import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaCheckCircle, FaCopy, FaMobileAlt, FaSpinner } from 'react-icons/fa';
import { simulatePaymentVerification, generatePaymentReference } from '../services/payment/payment';
import { PaymentQRCodeProps } from '../types';

const PaymentQRCode: React.FC<PaymentQRCodeProps> = ({
  amount,
  reference: propReference,
  phoneNumber = '+1809XXXXXXX',
  merchantName = 'Jardín Virtual',
  formData,
  onPaymentCompleted,
}) => {
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'checking' | 'completed'>('pending');
  const [countdown, setCountdown] = useState(0);
  
  // Generar una referencia si no se proporcionó una
  const reference = propReference || generatePaymentReference();

  // Crear la cadena de datos para el código QR con información adicional del formulario
  const qrDataJSON = JSON.stringify({
    merchant: merchantName,
    reference: reference,
    amount: amount,
    phone: phoneNumber,
    currency: 'DOP',
    formData: formData || {},
    timestamp: Date.now(),
    autoComplete: false // IMPORTANTE: Forzamos autoComplete a false para que siempre requiera hacer clic en "Finalizar compra"
  });

  // Verificación de pago usando el servicio
  const checkPaymentStatus = () => {
    setPaymentStatus('checking');
    
    // Usamos el servicio de simulación
    simulatePaymentVerification(reference)
      .then(paymentData => {
        setPaymentStatus('completed');
        
        // Notificamos a la aplicación que el pago se ha completado
        // PERO no activamos autoComplete, solo notificamos que el pago está verificado
        if (onPaymentCompleted) {
          onPaymentCompleted({
            ...paymentData,
            formData: formData,
            autoComplete: false // Forzamos a false para que siempre requiera hacer clic en "Finalizar compra"
          });
        }
      })
      .catch(error => {
        console.error("Error al verificar el pago:", error);
        setPaymentStatus('pending');
        setCountdown(30); // Reiniciar cuenta regresiva
      });
  };

  // Simulación de cuenta regresiva para auto-verificación
  useEffect(() => {
    if (paymentStatus === 'pending') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev > 0) return prev - 1;
          
          // Cuando la cuenta regresiva llega a 0, limpiamos el intervalo
          clearInterval(timer);
          return 0;
        });
      }, 1000);
      
      // Iniciar con 30 segundos
      setCountdown(30);
      
      return () => clearInterval(timer);
    }
  }, [paymentStatus]);

  // Verificar automáticamente cuando la cuenta regresiva llega a 0
  useEffect(() => {
    if (countdown === 0 && paymentStatus === 'pending') {
      checkPaymentStatus();
    }
  }, [countdown, paymentStatus]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FaMobileAlt className="text-green-600 text-xl mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Pago Móvil</h2>
        </div>
        
        {paymentStatus !== 'pending' && (
          <div className={`flex items-center rounded-full px-3 py-1 text-sm ${
            paymentStatus === 'checking' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {paymentStatus === 'checking' ? (
              <>
                <FaSpinner className="animate-spin mr-1" />
                <span>Verificando</span>
              </>
            ) : (
              <>
                <FaCheckCircle className="mr-1" />
                <span>Pago verificado</span>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="text-center mb-4">
        <p className="text-gray-600 mb-1">Escanea este código para pagar</p>
        <p className="text-2xl font-bold text-green-600 mb-3">RD$ {amount.toFixed(2)}</p>
        
        <div className="flex justify-center mb-4">
          <div className={`p-2 bg-white border border-gray-200 rounded-lg ${
            paymentStatus === 'completed' ? 'opacity-50' : ''
          }`}>
            <QRCodeSVG 
              value={qrDataJSON} 
              size={200} 
              bgColor={"#ffffff"} 
              fgColor={"#000000"} 
              level={"L"} 
              includeMargin={false}
            />
          </div>
        </div>

        {paymentStatus === 'pending' && (
          <p className="text-sm text-gray-500">
            Verificación automática en <span className="font-medium">{countdown}</span> segundos
          </p>
        )}
      </div>
      
      <div className="border border-gray-200 rounded-md p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">Número de referencia:</span>
          <span className="text-sm font-medium">{reference}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Comercio:</span>
          <span className="text-sm font-medium">{merchantName}</span>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-md p-3 mb-4">
        <p className="text-sm text-gray-600 mb-2">Envía el pago a este número:</p>
        <div className="flex justify-between items-center">
          <span className="font-medium">{phoneNumber}</span>
          <button 
            onClick={() => copyToClipboard(phoneNumber)}
            className="text-green-600 hover:text-green-700"
            disabled={paymentStatus !== 'pending'}
          >
            {copied ? <FaCheckCircle /> : <FaCopy />}
          </button>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        {paymentStatus === 'pending' ? (
          <>
            <p>Al realizar el pago, incluye el número de referencia en el mensaje.</p>
            <button 
              onClick={checkPaymentStatus}
              className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300"
            >
              Ya realicé el pago
            </button>
          </>
        ) : paymentStatus === 'checking' ? (
          <p>Estamos verificando tu pago, esto puede tardar unos segundos...</p>
        ) : (
          <p className="text-green-600 font-medium">¡Pago verificado! <strong>Ahora haz clic en "Finalizar compra" para completar tu pedido.</strong></p>
        )}
      </div>
    </div>
  );
};

export default PaymentQRCode; 