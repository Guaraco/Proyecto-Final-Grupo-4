import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppStore } from '../store/useAppStore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { updateInfo, updatePassword } from '../services/user/user';
import { toast } from 'react-toastify';
import { UserProfile, PasswordForm } from '../types';

const Perfil = () => {
  const [profile, setProfile] = useState<UserProfile>({
    nombre: 'Usuario',
    apellido: 'Ejemplo',
    email: 'usuario@ejemplo.com'
  });

  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage] = useState('');
  
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  // Configuración de React Hook Form para el perfil
  const { 
    register: registerProfile, 
    handleSubmit: handleSubmitProfile, 
    formState: { errors: profileErrors }, 
    reset: resetProfile,
    setValue: setProfileValue
  } = useForm<UserProfile>();

  // Configuración de React Hook Form para la contraseña
  const { 
    register: registerPassword, 
    handleSubmit: handleSubmitPassword, 
    formState: { errors: passwordErrors }, 
    reset: resetPassword,
    watch: watchPassword
  } = useForm<PasswordForm>();

  useEffect(() => {
    // Si hay un usuario logueado, actualizar el perfil con sus datos
    if (user) {
      const updatedProfile = {
        nombre: user.name || profile.nombre,
        apellido: user.lastName || profile.apellido,
        email: user.email || profile.email
      };
      setProfile(updatedProfile);
      
      // Actualizar los valores del formulario
      setProfileValue('nombre', updatedProfile.nombre);
      setProfileValue('apellido', updatedProfile.apellido);
      setProfileValue('email', updatedProfile.email);
    }
  }, [user, setProfileValue]);

  const toggleEditMode = () => {
    if (editMode) {
      // Si estamos cancelando la edición, restauramos los datos originales
      resetProfile(profile);
    }
    setEditMode(!editMode);
  };

  const onSubmitProfile: SubmitHandler<UserProfile> = async (data) => {
    try {
      if (user && user.id) {
        console.log('Enviando datos de perfil al backend:', {
          name: data.nombre,
          lastName: data.apellido,
          email: data.email
        });
        
        const response = await updateInfo(
          user.id, {
          id: user.id,
          role: user.role,
          name: data.nombre,
          lastName: data.apellido,
          email: data.email
        });
        
        console.log('Respuesta del backend:', response);
        
        // Actualizar el estado local del perfil
        setProfile(data);
        
        // Actualizar el estado global del usuario en el store
        setUser({
          ...user,
          name: data.nombre,
          lastName: data.apellido,
          email: data.email
        });
        
        setEditMode(false);
        toast.success('Perfil actualizado correctamente');
      } else {
        toast.error('No se pudo identificar al usuario');
      }
    } catch (error) {
      console.error('Error completo al actualizar el perfil:', error);
      toast.error('Error al actualizar el perfil');
    }
  };

  const onSubmitPassword: SubmitHandler<PasswordForm> = async (data) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.error('Las contraseñas no coinciden');
        return;
      }
      
      if (data.newPassword.length < 6) {
        toast.error('La contraseña debe tener al menos 6 caracteres');
        return;
      }
      
      if (user && user.id) {
        console.log('Enviando datos de contraseña al backend:', {
          password: data.newPassword,
          userId: user.id
        });
        
        const response = await updatePassword(user.id, {
          password: data.newPassword
        });
        
        console.log('Respuesta del backend:', response);
        
        resetPassword();
        toast.success('Contraseña actualizada correctamente');
      } else {
        toast.error('No se pudo identificar al usuario');
      }
    } catch (error) {
      console.error('Error completo al actualizar la contraseña:', error);
      toast.error('Error al actualizar la contraseña');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Perfil</h1>
        
        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Sidebar con foto de perfil */}
            <div className="md:w-1/3 bg-green-50 p-6 border-r border-green-100">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-green-200 rounded-full flex items-center justify-center mb-4">
                  <FaUser className="text-green-600 text-5xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{profile.nombre} {profile.apellido}</h2>
                <p className="text-gray-500 mt-1">Cliente desde 2023</p>
                <button 
                  onClick={toggleEditMode}
                  className={`mt-6 flex items-center px-4 py-2 rounded-md ${
                    editMode 
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {editMode ? (
                    <>Cancelar <FaEdit className="ml-2" /></>
                  ) : (
                    <>Editar Perfil <FaEdit className="ml-2" /></>
                  )}
                </button>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Beneficios</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Envío gratis en compras mayores a RD$3000
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    5% de descuento en tu próxima compra
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Acceso a ofertas exclusivas
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Contenido principal */}
            <div className="md:w-2/3 p-6">
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Información Personal
                </h3>
                
                <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      {editMode ? (
                        <>
                          <input
                            type="text"
                            {...registerProfile('nombre', { required: 'El nombre es requerido' })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          />
                          {profileErrors.nombre && (
                            <p className="text-red-500 text-xs mt-1">{profileErrors.nombre.message}</p>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center p-2 bg-gray-50 rounded-md">
                          <FaUser className="text-gray-400 mr-2" />
                          <span>{profile.nombre}</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                      {editMode ? (
                        <>
                          <input
                            type="text"
                            {...registerProfile('apellido', { required: 'El apellido es requerido' })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          />
                          {profileErrors.apellido && (
                            <p className="text-red-500 text-xs mt-1">{profileErrors.apellido.message}</p>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center p-2 bg-gray-50 rounded-md">
                          <FaUser className="text-gray-400 mr-2" />
                          <span>{profile.apellido}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {editMode ? (
                      <>
                        <input
                          type="email"
                          {...registerProfile('email', { 
                            required: 'El email es requerido',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Email inválido'
                            }
                          })}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        />
                        {profileErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{profileErrors.email.message}</p>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center p-2 bg-gray-50 rounded-md">
                        <FaEnvelope className="text-gray-400 mr-2" />
                        <span>{profile.email}</span>
                      </div>
                    )}
                  </div>
                  
                  {editMode && (
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Guardar Cambios <FaSave className="ml-2" />
                      </button>
                    </div>
                  )}
                </form>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Cambiar Contraseña
                </h3>
                
                <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...registerPassword('currentPassword', { required: 'La contraseña actual es requerida' })}
                        className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-gray-400" />
                        ) : (
                          <FaEye className="text-gray-400" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.currentPassword && (
                      <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...registerPassword('newPassword', { 
                          required: 'La nueva contraseña es requerida',
                          minLength: {
                            value: 6,
                            message: 'La contraseña debe tener al menos 6 caracteres'
                          }
                        })}
                        className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-gray-400" />
                        ) : (
                          <FaEye className="text-gray-400" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...registerPassword('confirmPassword', { 
                        required: 'Debe confirmar la contraseña',
                        validate: value => value === watchPassword('newPassword') || 'Las contraseñas no coinciden'
                      })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword.message}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Cambiar Contraseña
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
