import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaLeaf } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { createContacto } from '../services/user/user'
import { Contacto as ContactoType } from '../types'
import { toast } from 'react-toastify'

type FormData = {
  tipoDeConsulta: string;
  nombreCompleto: string;
  email: string;
  telefono: string;
  mensaje: string;
}

const Contacto = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [enviando, setEnviando] = useState(false);

  const onSubmit = async (data: FormData) => {
    setEnviando(true);
    try {
      // Crear objeto Contacto según la estructura definida en types
      const contactoData: ContactoType = {
        tipoDeConsulta: data.tipoDeConsulta,
        nombreCompleto: data.nombreCompleto,
        email: data.email,
        telefono: data.telefono || '',
        mensaje: data.mensaje
      };
      
      // Llamar al servicio de creación de contacto
      await createContacto(contactoData);
      
      // Resetear formulario
      reset();
      
      // Mostrar notificación de éxito
      toast.success('¡Mensaje enviado correctamente! Pronto nos pondremos en contacto contigo.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      toast.error('Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-green-700">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover mix-blend-multiply" 
            src="https://images.unsplash.com/photo-1565103420311-8cbbc3cb3f38?q=80&w=2000&auto=format&fit=crop" 
            alt="Hierbas medicinales" 
          />
          <div className="absolute inset-0 bg-green-900 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Contáctanos</h1>
          <p className="mt-6 max-w-3xl text-xl text-green-100">
            Estamos aquí para responder tus dudas sobre nuestras hierbas medicinales y remedios naturales. Ponte en contacto con el Jardín de Doña Rosa.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Información de contacto */}
            <div className="relative overflow-hidden py-10 px-6 bg-gradient-to-b from-green-600 to-green-700 sm:px-10 xl:p-12">
              <div className="absolute inset-0 pointer-events-none sm:hidden" aria-hidden="true">
                <svg 
                  className="absolute inset-0 w-full h-full" 
                  width="343" 
                  height="388" 
                  viewBox="0 0 343 388" 
                  fill="none" 
                  preserveAspectRatio="xMidYMid slice" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z" 
                    fill="url(#linear1)" 
                    fillOpacity=".1" 
                  />
                  <defs>
                    <linearGradient 
                      id="linear1" 
                      x1="254.553" 
                      y1="107.554" 
                      x2="961.66" 
                      y2="814.66" 
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset="1" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden" aria-hidden="true">
                <svg 
                  className="absolute inset-0 w-full h-full" 
                  width="359" 
                  height="339" 
                  viewBox="0 0 359 339" 
                  fill="none" 
                  preserveAspectRatio="xMidYMid slice" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z" 
                    fill="url(#linear2)" 
                    fillOpacity=".1" 
                  />
                  <defs>
                    <linearGradient 
                      id="linear2" 
                      x1="192.553" 
                      y1="28.553" 
                      x2="899.66" 
                      y2="735.66" 
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset="1" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="relative">
                <div className="flex items-center">
                  <FaLeaf className="h-10 w-10 text-green-300" />
                  <h3 className="text-lg font-medium text-white ml-3">Jardín de Doña Rosa</h3>
                </div>
                <p className="mt-6 text-base text-green-50">
                  Encuentra remedios naturales y asesoría personalizada sobre plantas medicinales. Cultivamos salud natural desde 1980.
                </p>
                <dl className="mt-8 space-y-6">
                  <dt><span className="sr-only">Dirección</span></dt>
                  <dd className="flex text-base text-green-50">
                    <FaMapMarkerAlt className="flex-shrink-0 w-6 h-6 text-green-200" aria-hidden="true" />
                    <span className="ml-3">Barrio Cristo Rey, 100 metros al este de la iglesia <br />San José, Costa Rica</span>
                  </dd>
                  <dt><span className="sr-only">Teléfono</span></dt>
                  <dd className="flex text-base text-green-50">
                    <FaPhone className="flex-shrink-0 w-6 h-6 text-green-200" aria-hidden="true" />
                    <span className="ml-3">+1 829-696-5461</span>
                  </dd>
                  <dt><span className="sr-only">WhatsApp</span></dt>
                  <dd className="flex text-base text-green-50">
                    <FaWhatsapp className="flex-shrink-0 w-6 h-6 text-green-200" aria-hidden="true" />
                    <span className="ml-3">+1 829-696-5461</span>
                  </dd>
                  <dt><span className="sr-only">Correo electrónico</span></dt>
                  <dd className="flex text-base text-green-50">
                    <FaEnvelope className="flex-shrink-0 w-6 h-6 text-green-200" aria-hidden="true" />
                    <span className="ml-3">info@jardindedoñarosa.com</span>
                  </dd>
                  <dt><span className="sr-only">Horario</span></dt>
                  <dd className="flex text-base text-green-50">
                    <FaClock className="flex-shrink-0 w-6 h-6 text-green-200" aria-hidden="true" />
                    <span className="ml-3">
                      Lunes a Viernes: 8:00 AM - 5:00 PM<br />
                      Sábados: 9:00 AM - 2:00 PM<br />
                      Domingos: Cerrado
                    </span>
                  </dd>
                </dl>
                <div className="mt-12">
                  <div className="inline-flex rounded-md shadow-sm">
                    <a
                      href="https://api.whatsapp.com/send?phone=18296965461&text=Hola%2C%20me%20gustaría%20obtener%20más%20información%20sobre%20sus%20productos%20medicinales."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 bg-green-500 hover:bg-green-400 focus:ring-2 focus:ring-offset-2 focus:ring-green-400 focus:outline-none rounded-md text-base font-medium text-white flex items-center"
                    >
                      <FaWhatsapp className="w-5 h-5 mr-2" />
                      Contáctanos por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
              <h3 className="text-lg font-medium text-gray-900">Envíanos un mensaje</h3>
              <p className="mt-1 text-gray-500">
                Completa el siguiente formulario y te responderemos a la brevedad posible.
              </p>
              <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
              >
                <div className="sm:col-span-2">
                  <label htmlFor="tipoDeConsulta" className="block text-sm font-medium text-gray-700">
                    Tipo de consulta
                  </label>
                  <div className="mt-1">
                    <select
                      id="tipoDeConsulta"
                      className={`py-3 px-4 block w-full shadow-sm ${errors.tipoDeConsulta ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md`}
                      {...register("tipoDeConsulta", { required: "Por favor selecciona un tipo de consulta" })}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Informacion">Información general</option>
                      <option value="Productos">Consulta sobre productos</option>
                      <option value="ProblemasEspecificos">Problemas específicos de salud</option>
                      <option value="Pedidos">Pedidos y disponibilidad</option>
                      <option value="Otro">Otro tema</option>
                    </select>
                  </div>
                  {errors.tipoDeConsulta && <p className="mt-2 text-sm text-red-600">{errors.tipoDeConsulta.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-700">
                    Nombre completo
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="nombreCompleto"
                      autoComplete="name"
                      className={`py-3 px-4 block w-full shadow-sm ${errors.nombreCompleto ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md`}
                      {...register("nombreCompleto", { required: "Por favor ingresa tu nombre" })}
                    />
                  </div>
                  {errors.nombreCompleto && <p className="mt-2 text-sm text-red-600">{errors.nombreCompleto.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className={`py-3 px-4 block w-full shadow-sm ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md`}
                      {...register("email", { 
                        required: "Por favor ingresa tu correo electrónico",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Por favor ingresa un correo electrónico válido"
                        }
                      })}
                    />
                  </div>
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                  <div className="flex justify-between">
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                      Teléfono
                    </label>
                    <span id="phone-optional" className="text-sm text-gray-500">
                      Opcional
                    </span>
                  </div>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="telefono"
                      autoComplete="tel"
                      className={`py-3 px-4 block w-full shadow-sm border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-md`}
                      {...register("telefono")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between">
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                      Mensaje
                    </label>
                    <span id="message-max" className="text-sm text-gray-500">
                      Máx. 500 caracteres
                    </span>
                  </div>
                  <div className="mt-1">
                    <textarea
                      id="mensaje"
                      rows={4}
                      className={`py-3 px-4 block w-full shadow-sm ${errors.mensaje ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'} rounded-md`}
                      {...register("mensaje", { 
                        required: "Por favor ingresa tu mensaje",
                        maxLength: {
                          value: 500,
                          message: "El mensaje no puede exceder los 500 caracteres"
                        }
                      })}
                    />
                  </div>
                  {errors.mensaje && <p className="mt-2 text-sm text-red-600">{errors.mensaje.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={enviando}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${enviando ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'}`}
                  >
                    {enviando ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Sección del mapa */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Nuestra ubicación</h2>
              <p className="mt-4 text-lg text-gray-500">
                Estamos ubicados en el corazón de Cristo Rey, en un espacio acogedor rodeado de naturaleza.
              </p>
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Indicaciones:</h3>
                <ul className="mt-4 space-y-4 text-gray-500">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-green-500">•</span>
                    <p className="ml-3">Desde la iglesia de Cristo Rey, camina 100 metros hacia el este.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-green-500">•</span>
                    <p className="ml-3">La casa es de color verde con un portón blanco.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-green-500">•</span>
                    <p className="ml-3">Contamos con un pequeño rótulo que indica "Jardín de Doña Rosa - Hierbas Medicinales".</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg h-96">
                {/* Mapa con la ubicación exacta de la Parroquia Cristo Rey */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.237428985486!2d-69.92809232494636!3d18.49682186834767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf89a354bfb121%3A0x44859adab81472f3!2sParroquia%20Cristo%20Rey!5e0!3m2!1ses!2sdo!4v1716349625123!5m2!1ses!2sdo" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de horarios y preguntas frecuentes */}
      <div className="max-w-7xl mx-auto py-16 px-4 divide-y-2 divide-gray-200 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Preguntas Frecuentes</h2>
        <div className="mt-6 pt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
            <div>
              <dt className="text-lg font-medium text-gray-900">¿Necesito cita previa para visitar el jardín?</dt>
              <dd className="mt-2 text-base text-gray-500">No es necesario, puedes visitarnos durante nuestro horario de atención. Sin embargo, para recibir una asesoría personalizada con Doña Rosa, es recomendable agendar una cita con anticipación.</dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-gray-900">¿Venden plantas o solo productos derivados?</dt>
              <dd className="mt-2 text-base text-gray-500">Vendemos tanto plantas vivas para que cultives en tu hogar, como productos elaborados como tinturas, ungüentos, infusiones y preparados medicinales.</dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-gray-900">¿Hacen envíos a domicilio?</dt>
              <dd className="mt-2 text-base text-gray-500">Sí, realizamos envíos dentro del área metropolitana de San José. Para zonas fuera de esta área, trabajamos con servicios de mensajería. Contáctanos para más detalles.</dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-gray-900">¿Ofrecen talleres o capacitaciones?</dt>
              <dd className="mt-2 text-base text-gray-500">Sí, periódicamente organizamos talleres sobre el uso de plantas medicinales, elaboración de remedios caseros y cultivo orgánico. Infórmate sobre nuestro calendario mensual.</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Contacto
