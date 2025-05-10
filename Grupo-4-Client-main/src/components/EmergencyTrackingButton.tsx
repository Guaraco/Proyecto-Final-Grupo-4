import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import EmergencyTrackingModal from './EmergencyTrackingModal';
import { EmergencyTrackingButtonProps } from '../types';

const EmergencyTrackingButton: React.FC<EmergencyTrackingButtonProps> = ({
  buttonText = 'Seguimiento de pedido',
  buttonClassName = '',
  iconOnly = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const defaultButtonClass = 'inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500';
  
  const buttonClasses = buttonClassName || defaultButtonClass;

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={buttonClasses}
      >
        <FaSearch className={iconOnly ? '' : 'mr-2'} />
        {!iconOnly && buttonText}
      </button>
      
      <EmergencyTrackingModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};

export default EmergencyTrackingButton; 