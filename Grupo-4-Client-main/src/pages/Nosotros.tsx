import { FaSeedling, FaHeartbeat, FaHandHoldingHeart } from 'react-icons/fa'
import { RiRecycleFill, RiHealthBookFill } from 'react-icons/ri'
import { GiHerbsBundle, GiMedicines, GiPlantRoots, GiMedicinePills } from 'react-icons/gi'

import allan from '../assets/allan.jpeg'
import emmanuel from '../assets/emmanuel.jpef.jpeg'
import morenai from '../assets/morenai.jpeg'

const Nosotros = () => {
  const valores = [
    {
      icon: <GiHerbsBundle className="h-8 w-8 text-green-500" />,
      titulo: "Sabiduría Tradicional",
      descripcion: "Preservamos y compartimos el conocimiento ancestral sobre el poder curativo de las plantas."
    },
    {
      icon: <RiRecycleFill className="h-8 w-8 text-green-500" />,
      titulo: "Cultivo Orgánico",
      descripcion: "Todas nuestras hierbas son cultivadas de manera natural, sin químicos ni pesticidas."
    },
    {
      icon: <FaSeedling className="h-8 w-8 text-green-500" />,
      titulo: "Calidad Garantizada",
      descripcion: "Cuidamos cada detalle del proceso, desde la semilla hasta la cosecha de nuestras hierbas."
    },
    {
      icon: <FaHeartbeat className="h-8 w-8 text-green-500" />,
      titulo: "Pasión por la Salud Natural",
      descripcion: "Creemos en el poder de la naturaleza para promover el bienestar y la salud integral."
    },
    {
      icon: <RiHealthBookFill className="h-8 w-8 text-green-500" />,
      titulo: "Conocimiento Medicinal",
      descripcion: "Décadas de experiencia nos respaldan en el uso y recomendación de hierbas medicinales."
    },
    {
      icon: <FaHandHoldingHeart className="h-8 w-8 text-green-500" />,
      titulo: "Servicio Comunitario",
      descripcion: "Nos dedicamos a ayudar a nuestra comunidad a encontrar soluciones naturales para sus necesidades."
    }
  ]

  const equipo = [
    {
      nombre: "Doña Rosa Jiménez",
      cargo: "Fundadora y Herbolaria",
      src: morenai,
      descripcion: "Con más de 40 años dedicados al cultivo y estudio de plantas medicinales. Su patio en Cristo Rey es un verdadero tesoro de biodiversidad."
    },
    {
      nombre: "Manuel Jiménez",
      cargo: "Especialista en Cultivo",
      src: emmanuel,
      descripcion: "Hijo de Doña Rosa, aprendió desde niño el arte del cultivo orgánico y ahora ayuda a expandir el jardín familiar."
    },
    {
      nombre: "Carmen Vargas",
      cargo: "Experta en Preparaciones",
      src: allan,
      descripcion: "Nuera de Doña Rosa, especializada en la elaboración de tinturas, infusiones y pomadas a base de hierbas medicinales."
    },
   
  ]

  return (
    <div className="bg-white">
      {/* Hero Section - Nuevo diseño */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2000&auto=format&fit=crop" 
            alt="Fondo de hierbas medicinales" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-900 bg-opacity-70 mix-blend-multiply" />
        </div>
        
        <div className="relative pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-28">
          <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="text-center md:text-left md:w-1/2 z-10">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">El Jardín de</span>
                <span className="block text-green-300">Doña Rosa</span>
              </h1>
              <p className="mt-4 max-w-xl mx-auto md:mx-0 text-xl text-green-50 sm:mt-5">
                Tradición herbolaria con más de 40 años cultivando salud natural en Cristo Rey
              </p>
              <div className="mt-8 flex justify-center md:justify-start">
                <div className="inline-flex rounded-md shadow">
                  <a
                    href="/catalogo"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50"
                  >
                    Ver Catálogo
                  </a>
                </div>
                <div className="ml-3 inline-flex rounded-md shadow">
                  <a
                    href="/contacto"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Contáctanos
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center md:justify-end">
              <div className="w-64 h-64 sm:w-72 sm:h-72 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center p-4 border-4 border-green-200/30">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?q=80&w=300&auto=format&fit=crop"
                    alt="Hierbas medicinales"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Iconos temáticos */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  <GiHerbsBundle className="h-8 w-8 text-green-200" />
                </div>
                <p className="text-center text-sm text-white font-medium">Hierbas Frescas</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  <GiPlantRoots className="h-8 w-8 text-green-200" />
                </div>
                <p className="text-center text-sm text-white font-medium">Raíces Medicinales</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  <GiMedicines className="h-8 w-8 text-green-200" />
                </div>
                <p className="text-center text-sm text-white font-medium">Preparados Naturales</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  <GiMedicinePills className="h-8 w-8 text-green-200" />
                </div>
                <p className="text-center text-sm text-white font-medium">Remedios Tradicionales</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Misión y Visión */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Nuestra Misión
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Rescatar, preservar y compartir el conocimiento ancestral sobre las propiedades curativas de las hierbas medicinales. Cultivamos cada planta con amor y dedicación, para ofrecer a nuestra comunidad alternativas naturales que promuevan la salud y el bienestar.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Nos comprometemos a mantener viva la tradición herbolaria, educando sobre el uso responsable de las plantas medicinales y su importante papel en el cuidado integral de la salud.
            </p>
          </div>
          <div className="mt-12 lg:mt-0">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Nuestra Historia
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Todo comenzó en el pequeño patio trasero de la casa de Doña Rosa en Cristo Rey. Lo que empezó como un pasatiempo personal para cultivar algunas hierbas para uso familiar, creció hasta convertirse en un verdadero jardín botánico medicinal.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Con el tiempo, vecinos y conocidos comenzaron a acudir a Doña Rosa en busca de sus remedios naturales y consejos. Hoy, el Jardín de Doña Rosa es un espacio vivo de aprendizaje, cultivo y distribución de hierbas medicinales que beneficia a toda la comunidad.
            </p>
          </div>
        </div>
      </div>

      {/* Sección Nuestros Valores */}
      <div className="bg-green-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Nuestros Valores
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {valores.map((valor, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md px-6 py-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{valor.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{valor.titulo}</h3>
                <p className="text-base text-gray-500">{valor.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección Nuestro Jardín */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Nuestro Jardín Medicinal
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-500">
            En el corazón de Cristo Rey, nuestro jardín alberga más de 50 especies de plantas medicinales, cultivadas con métodos tradicionales y orgánicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2000&auto=format&fit=crop" 
              alt="Jardín de hierbas medicinales" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6 bg-white">
              <h3 className="text-lg font-medium text-gray-900 mb-2">El Huerto Medicinal</h3>
              <p className="text-gray-500">
                Nuestro jardín está organizado por propiedades curativas, facilitando la identificación y el aprendizaje sobre cada hierba.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src={"https://plus.unsplash.com/premium_photo-1673141390230-8b4a3c3152b1?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
              alt="Proceso de secado de hierbas" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6 bg-white">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Proceso Artesanal</h3>
              <p className="text-gray-500">
                El proceso de cultivo, cosecha y preparación se realiza de manera tradicional, preservando todas las propiedades de las plantas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Nuestro Equipo */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-12">
              La Familia Detrás del Jardín
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-500 mb-16">
              El Jardín de Doña Rosa es un emprendimiento familiar que une conocimiento tradicional, pasión y compromiso con la salud natural.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {equipo.map((miembro, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
                  <img
                    src={miembro.src}
                    alt={miembro.nombre}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{miembro.nombre}</h3>
                <p className="text-sm text-green-600 mb-3">{miembro.cargo}</p>
                <p className="text-sm text-gray-500">{miembro.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección CTA */}
      <div className="bg-green-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Buscas remedios naturales?</span>
            <span className="block text-green-200">Explora nuestra colección de hierbas medicinales.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/catalogo"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50"
              >
                Ver Catálogo
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/contacto"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800"
              >
                Visítanos en Cristo Rey
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
