import { useEffect, useState } from 'react';
import { FaSpinner, FaInbox, FaExclamationTriangle, FaEnvelope, FaPhone, FaTag, FaCommentAlt, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAppStore } from '../store/useAppStore';

const Solicitudes = () => {
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  
  // Estados para los filtros
  const [filtroTipo, setFiltroTipo] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  
  // Obtenemos el usuario y las funciones del store
  const user = useAppStore((state) => state.user);
  const contacts = useAppStore((state) => state.contacts);
  const getContacts = useAppStore((state) => state.getContacts);

  console.log(user?.role);

  useEffect(() => {
    // Solo los administradores pueden ver las solicitudes
    const cargarSolicitudes = async () => {
      try {
        setCargando(true);
        await getContacts();
        setCargando(false);
      } catch (err) {
        console.error('Error al cargar las solicitudes:', err);
        setError(true);
        setCargando(false);
        toast.error('Error al cargar las solicitudes. Por favor, intenta de nuevo más tarde.');
      }
    };

    cargarSolicitudes();
  }, [user, getContacts]);

  // Función para formatear la fecha
  const formatearFecha = (fechaStr: string) => {
    if (!fechaStr) return 'Fecha no disponible';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filtrar contactos según los criterios
  const contactosFiltrados = () => {
    if (!contacts || !Array.isArray(contacts)) return [];
    
    return contacts.filter(solicitud => {
      // Filtro por tipo de consulta
      if (filtroTipo && solicitud.tipoDeConsulta !== filtroTipo) {
        return false;
      }
      
      // Filtro por fecha desde
      if (fechaDesde && solicitud.createdAt) {
        const fechaSolicitud = new Date(solicitud.createdAt);
        const desde = new Date(fechaDesde);
        desde.setHours(0, 0, 0, 0); // Inicio del día
        
        if (fechaSolicitud < desde) {
          return false;
        }
      }
      
      // Filtro por fecha hasta
      if (fechaHasta && solicitud.createdAt) {
        const fechaSolicitud = new Date(solicitud.createdAt);
        const hasta = new Date(fechaHasta);
        hasta.setHours(23, 59, 59, 999); // Fin del día
        
        if (fechaSolicitud > hasta) {
          return false;
        }
      }
      
      return true;
    });
  };

  // Devuelve un color basado en el tipo de consulta
  const obtenerColorTipo = (tipo: string) => {
    switch (tipo) {
      case 'Informacion':
      case 'Información General':
        return 'bg-blue-100 text-blue-800';
      case 'Productos':
        return 'bg-green-100 text-green-800';
      case 'ProblemasEspecificos':
        return 'bg-red-100 text-red-800';
      case 'Pedidos':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Traducir el tipo de consulta a un texto más amigable
  const traducirTipoConsulta = (tipo: string) => {
    switch (tipo) {
      case 'Informacion':
      case 'Información General':
        return 'Información general';
      case 'Productos':
        return 'Consulta sobre productos';
      case 'ProblemasEspecificos':
        return 'Problemas específicos de salud';
      case 'Pedidos':
        return 'Pedidos y disponibilidad';
      default:
        return tipo || 'Otro tema';
    }
  };

  // Limpiar todos los filtros
  const limpiarFiltros = () => {
    setFiltroTipo('');
    setFechaDesde('');
    setFechaHasta('');
  };

  // Obtener tipos únicos para el selector
  const tiposUnicos = () => {
    if (!contacts || !Array.isArray(contacts)) return [];
    const tipos = new Set(contacts.map(c => c.tipoDeConsulta).filter(Boolean));
    return Array.from(tipos);
  };

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
        <span className="ml-2 text-lg text-gray-700">Cargando solicitudes...</span>
      </div>
    );
  }

  if (error || !user || user.role !== 'Admin') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Acceso restringido</h1>
        <p className="text-gray-600 text-center max-w-md">
          Lo sentimos, no tienes permisos para acceder a esta página. Esta sección está reservada para administradores.
        </p>
      </div>
    );
  }

  // Obtener los contactos filtrados
  const contactosMostrados = contactosFiltrados();

  return (
    <div className="bg-white min-h-screen">
      {/* Encabezado */}
      <div className="bg-green-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Solicitudes de Contacto</h1>
          <p className="mt-2 text-green-100">
            Gestiona las solicitudes de contacto enviadas por los usuarios.
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Panel de filtros */}
        <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-medium text-gray-900 flex items-center">
              <FaFilter className="mr-2 text-gray-500" />
              Filtros
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="ml-3 text-base text-green-600 hover:text-green-800 font-medium px-2 py-1 rounded hover:bg-green-50"
              >
                {mostrarFiltros ? 'Ocultar' : 'Mostrar'}
              </button>
            </h2>
            <div className="text-base text-gray-600">
              {contactosMostrados.length} {contactosMostrados.length === 1 ? 'resultado' : 'resultados'}
              {(filtroTipo || fechaDesde || fechaHasta) && (
                <button
                  onClick={limpiarFiltros}
                  className="ml-3 text-base text-green-600 hover:text-green-800 font-medium px-3 py-1 rounded hover:bg-green-50 border border-green-100"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
          
          {mostrarFiltros && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pt-4 border-t border-gray-100">
              <div>
                <label htmlFor="filtroTipo" className="block text-base font-medium text-gray-700 mb-2">
                  Tipo de Consulta
                </label>
                <select
                  id="filtroTipo"
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm h-10 py-2 px-3 text-base"
                >
                  <option value="">Todos los tipos</option>
                  {tiposUnicos().map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {traducirTipoConsulta(tipo)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="fechaDesde" className="block text-base font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-1" /> Desde
                </label>
                <input
                  type="date"
                  id="fechaDesde"
                  value={fechaDesde}
                  onChange={(e) => setFechaDesde(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm h-10 py-2 px-3 text-base"
                />
              </div>
              
              <div>
                <label htmlFor="fechaHasta" className="block text-base font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-1" /> Hasta
                </label>
                <input
                  type="date"
                  id="fechaHasta"
                  value={fechaHasta}
                  onChange={(e) => setFechaHasta(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm h-10 py-2 px-3 text-base"
                />
              </div>
            </div>
          )}
        </div>

        {contactosMostrados.length === 0 ? (
          <div className="text-center py-12 bg-white shadow rounded-lg">
            <FaInbox className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No hay solicitudes</h3>
            <p className="mt-1 text-sm text-gray-500">
              {(filtroTipo || fechaDesde || fechaHasta) 
                ? 'No se encontraron solicitudes con los filtros seleccionados.' 
                : 'No se han recibido solicitudes de contacto todavía.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contacto
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mensaje
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contactosMostrados.map((solicitud: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {solicitud.createdAt ? formatearFecha(solicitud.createdAt) : 'Fecha no disponible'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="text-green-700 font-semibold">
                                {solicitud.nombreCompleto ? solicitud.nombreCompleto.charAt(0).toUpperCase() : '?'}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{solicitud.nombreCompleto}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <FaEnvelope className="mr-2 text-gray-400" />
                            {solicitud.email}
                          </div>
                          {solicitud.telefono && (
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <FaPhone className="mr-2 text-gray-400" />
                              {solicitud.telefono}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${obtenerColorTipo(solicitud.tipoDeConsulta)}`}>
                            <FaTag className="mr-1 mt-0.5" />
                            {traducirTipoConsulta(solicitud.tipoDeConsulta)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            <FaCommentAlt className="flex-shrink-0 mr-2 text-gray-400 mt-1" />
                            <p className="text-sm text-gray-500 line-clamp-3">{solicitud.mensaje}</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Solicitudes;
