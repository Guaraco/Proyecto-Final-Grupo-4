import { FaLeaf, FaMortarPestle, FaSeedling, FaBook, FaHandHoldingMedical } from 'react-icons/fa';
import { GiHerbsBundle, GiTeacher } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const serviciosOfrecidos = [
  {
    nombre: "Consultoría Herbolaria",
    descripcion: "Asesoramiento personalizado sobre el uso de hierbas medicinales para diferentes dolencias y condiciones de salud.",
    icono: <FaHandHoldingMedical className="h-10 w-10 text-green-600" />,
    detalles: [
      "Evaluación personalizada de necesidades de salud",
      "Recomendación de hierbas específicas para cada caso",
      "Seguimiento y ajuste de tratamientos",
      "Interacciones con medicamentos convencionales"
    ]
  },
  {
    nombre: "Venta de Hierbas Medicinales",
    descripcion: "Amplia variedad de hierbas medicinales frescas y secas, cultivadas de manera orgánica en nuestro jardín.",
    icono: <GiHerbsBundle className="h-10 w-10 text-green-600" />,
    detalles: [
      "Hierbas frescas recién cortadas",
      "Hierbas secas para infusiones",
      "Paquetes especiales para problemas específicos",
      "Hierbas exóticas y difíciles de encontrar"
    ]
  },
  {
    nombre: "Preparados Medicinales",
    descripcion: "Elaboración artesanal de tinturas, infusiones, ungüentos, jarabes y otros preparados a base de hierbas.",
    icono: <FaMortarPestle className="h-10 w-10 text-green-600" />,
    detalles: [
      "Tinturas concentradas de hierbas",
      "Ungüentos para dolores musculares y articulares",
      "Jarabes para problemas respiratorios",
      "Aceites esenciales y macerados"
    ]
  },
  {
    nombre: "Talleres Educativos",
    descripcion: "Capacitación sobre cultivo, identificación, preparación y uso de plantas medicinales.",
    icono: <GiTeacher className="h-10 w-10 text-green-600" />,
    detalles: [
      "Identificación de plantas medicinales",
      "Métodos de cultivo orgánico",
      "Técnicas de cosecha y secado",
      "Preparación de remedios caseros"
    ]
  },
  {
    nombre: "Huerto Medicinal",
    descripcion: "Venta de plantines y semillas para que puedas crear tu propio huerto medicinal en casa.",
    icono: <FaSeedling className="h-10 w-10 text-green-600" />,
    detalles: [
      "Plantines de hierbas medicinales",
      "Semillas orgánicas certificadas",
      "Kits para huertos urbanos",
      "Asesoramiento sobre cultivo en espacios reducidos"
    ]
  },
  {
    nombre: "Biblioteca Herbolaria",
    descripcion: "Acceso a recursos bibliográficos sobre medicina natural y herbolaria tradicional.",
    icono: <FaBook className="h-10 w-10 text-green-600" />,
    detalles: [
      "Consulta de libros especializados",
      "Recetarios tradicionales",
      "Guías de identificación",
      "Material educativo sobre medicina natural"
    ]
  }
];

const testimonios = [
  {
    nombre: "Carmen Mejía",
    testimonio: "Las tinturas de manzanilla y valeriana que me recomendó Doña Rosa han mejorado significativamente mi calidad de sueño. Ya no necesito medicamentos para dormir.",
    problema: "Insomnio"
  },
  {
    nombre: "Pablo Hernández",
    testimonio: "Con el tratamiento de hierbas para la digestión, mis problemas de acidez disminuyeron considerablemente. El servicio personalizado marcó la diferencia.",
    problema: "Problemas digestivos"
  },
  {
    nombre: "Lucía Fernández",
    testimonio: "Participé en uno de los talleres de plantas medicinales y ahora tengo mi propio huerto en casa. Es increíble lo que he aprendido sobre el poder curativo de las plantas.",
    problema: "Aprendizaje de medicina natural"
  }
];

const plantasMedicinales = [
  {
    nombre: "Manzanilla",
    usos: "Digestiva, calmante, antiinflamatoria",
    imagen: "https://images.unsplash.com/photo-1627283391728-701007067e7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuemFuaWxsYXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    nombre: "Hierbabuena",
    usos: "Digestiva, refrescante, alivia dolores de cabeza",
    imagen: "https://images.unsplash.com/photo-1618130070080-91f4d55a2383?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    nombre: "Aloe Vera",
    usos: "Cicatrizante, refrescante, antiinflamatorio",
    imagen: "https://plus.unsplash.com/premium_photo-1688045553706-e2c642bfa410?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    nombre: "Romero",
    usos: "Estimulante, antiséptico, mejora la circulación",
    imagen: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?q=80&w=400&h=300&auto=format&fit=crop"
  }
];

const Servicios = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=2070&auto=format&fit=crop" 
            alt="Hierbas medicinales" 
          />
          <div className="absolute inset-0 bg-green-900 mix-blend-multiply opacity-70" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Nuestros Servicios
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-green-100">
            Desde 1980, el Jardín de Doña Rosa ofrece una amplia gama de servicios basados en la sabiduría ancestral de las hierbas medicinales. Conoce todo lo que podemos hacer por tu bienestar natural.
          </p>
        </div>
      </div>

      {/* Introducción */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Medicina tradicional al alcance de todos</h2>
          <p className="mt-4 text-lg text-gray-500">
            En el Jardín de Doña Rosa fusionamos el conocimiento ancestral sobre plantas medicinales con métodos de cultivo sostenibles. 
            Nuestra misión es preservar la sabiduría herbolaria y ponerla al servicio de la comunidad a través de productos de calidad y asesoramiento personalizado.
          </p>
        </div>
      </div>

      {/* Servicios principales */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Servicios que ofrecemos
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                En el Jardín de Doña Rosa encontrarás soluciones naturales para diversas dolencias, así como el conocimiento para implementarlas en tu vida diaria. Nuestro enfoque integral busca no solo tratar síntomas, sino promover el bienestar completo.
              </p>
              <div className="mt-8">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Contacta con nosotros
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
                {serviciosOfrecidos.slice(0, 4).map((servicio) => (
                  <div key={servicio.nombre} className="relative">
                    <dt>
                      <div className="absolute h-16 w-16 flex items-center justify-center rounded-md bg-green-50 text-white">
                        {servicio.icono}
                      </div>
                      <p className="ml-20 text-lg leading-6 font-medium text-gray-900">{servicio.nombre}</p>
                    </dt>
                    <dd className="mt-2 ml-20 text-base text-gray-500">{servicio.descripcion}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Detalle de servicios */}
      <div className="bg-green-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Conoce más sobre nuestros servicios</h2>
            <p className="mt-4 text-lg text-gray-500">
              Cada uno de nuestros servicios está diseñado para atender tus necesidades específicas de salud y bienestar, siempre basados en el poder curativo de las plantas.
            </p>
          </div>
          <div className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            {serviciosOfrecidos.map((servicio) => (
              <div key={servicio.nombre} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {servicio.icono}
                    </div>
                    <h3 className="ml-4 text-xl font-medium text-gray-900">{servicio.nombre}</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-500">{servicio.descripcion}</p>
                  <ul className="mt-6 space-y-2">
                    {servicio.detalles.map((detalle, idx) => (
                      <li key={idx} className="flex">
                        <FaLeaf className="h-5 w-5 text-green-500 mt-0.5" />
                        <span className="ml-3 text-gray-500">{detalle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plantas medicinales destacadas */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Plantas medicinales destacadas</h2>
            <p className="mt-4 text-lg text-gray-500">
              Estas son algunas de las plantas medicinales más populares en nuestro jardín, cada una con sus propiedades únicas.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {plantasMedicinales.map((planta) => (
              <div key={planta.nombre} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={planta.imagen} 
                    alt={planta.nombre} 
                    className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
                  />
                </div>
                <div className="px-4 py-5">
                  <h3 className="text-lg font-medium text-gray-900">{planta.nombre}</h3>
                  <p className="mt-2 text-sm text-gray-500">{planta.usos}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proceso de consulta */}
      <div className="bg-green-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center">
            ¿Cómo funciona nuestra consulta herbolaria?
          </h2>
          <div className="mt-12 max-w-lg mx-auto grid gap-8 md:grid-cols-3 lg:max-w-none">
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-green-50 text-green-700 text-xl font-bold">
                      1
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-900 text-center">Evaluación inicial</h3>
                    <p className="mt-3 text-base text-gray-500 text-center">
                      Doña Rosa realiza una entrevista detallada sobre tu historial de salud, síntomas actuales y objetivos de bienestar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-green-50 text-green-700 text-xl font-bold">
                      2
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-900 text-center">Recomendación personalizada</h3>
                    <p className="mt-3 text-base text-gray-500 text-center">
                      Con base en tu evaluación, seleccionamos las hierbas o preparados específicos para tus necesidades.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-green-50 text-green-700 text-xl font-bold">
                      3
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-900 text-center">Seguimiento</h3>
                    <p className="mt-3 text-base text-gray-500 text-center">
                      Programamos citas de seguimiento para evaluar tu progreso y ajustar el tratamiento según sea necesario.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonios */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Testimonios de personas que han experimentado los beneficios de nuestros servicios y productos.
            </p>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonios.map((testimonio) => (
                <div
                  key={testimonio.nombre}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="h-10 flex items-center">
                        <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                          {testimonio.problema}
                        </span>
                      </div>
                      <blockquote className="mt-8 md:flex-grow md:flex md:flex-col">
                        <div className="relative text-lg font-medium text-gray-600 md:flex-grow">
                          <svg
                            className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200"
                            fill="currentColor"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                          >
                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                          </svg>
                          <p className="relative">{testimonio.testimonio}</p>
                        </div>
                        <footer className="mt-4">
                          <p className="text-base font-semibold text-gray-900">{testimonio.nombre}</p>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-green-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">¿Listo para mejorar tu salud de forma natural?</span>
            <span className="block text-green-600">Programa una consulta o visítanos hoy mismo.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Contactar
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="tel:+50622223333"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50"
              >
                Llamar ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
