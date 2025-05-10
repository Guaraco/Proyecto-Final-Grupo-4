import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaLeaf, FaSeedling, FaShippingFast, FaUserMd } from 'react-icons/fa';
import { GiMedicines, GiHerbsBundle, GiBookshelf } from 'react-icons/gi';
import { RiPlantLine } from 'react-icons/ri';
import { useAppStore } from '../store/useAppStore';
import { FeaturedProduct } from '../types';

// Categorías de productos
const categories = [
  {
    name: 'Hierbas Frescas',
    description: 'Recién cortadas de nuestro jardín',
    icon: <GiHerbsBundle className="h-10 w-10 text-green-600" />,
    link: '/catalogo?categoria=frescas'
  },
  {
    name: 'Hierbas Secas',
    description: 'Perfectas para infusiones y tés',
    icon: <FaLeaf className="h-10 w-10 text-green-600" />,
    link: '/catalogo?categoria=secas'
  },
  {
    name: 'Tinturas',
    description: 'Extractos concentrados medicinales',
    icon: <GiMedicines className="h-10 w-10 text-green-600" />,
    link: '/catalogo?categoria=tinturas'
  },
  {
    name: 'Plantas Medicinales',
    description: 'Cultiva tu propio jardín curativo',
    icon: <RiPlantLine className="h-10 w-10 text-green-600" />,
    link: '/catalogo?categoria=plantas'
  }
];

// Testimonios
const testimonials = [
  {
    name: 'María Cortés',
    text: 'Las tinturas de Doña Rosa han mejorado mis problemas digestivos considerablemente. Su asesoría fue indispensable para mi recuperación.',
    role: 'Cliente desde 2020'
  },
  {
    name: 'Carlos Vega',
    text: 'El cultivo de hierbas medicinales cambió mi vida. Gracias a los talleres de El Jardín de Doña Rosa, ahora tengo mi propio huerto medicinal en casa.',
    role: 'Estudiante de taller'
  },
  {
    name: 'Lucía Fernández',
    text: 'La calidad de sus productos es inigualable. Siempre recomiendo las hierbas orgánicas de Doña Rosa a mis pacientes con problemas de sueño.',
    role: 'Terapeuta holística'
  }
];

const Index = () => {
  const GetProducts = useAppStore((state) => state.GetProducts);
  const products = useAppStore((state) => state.products);
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  
  useEffect(() => {
    // Cargar productos del catálogo
    GetProducts();
  }, [GetProducts]);
  
  useEffect(() => {
    // Cuando los productos estén disponibles, tomar los primeros 4
    if (products && products.inventario && products.inventario.length > 0) {
      const firstFourProducts = products.inventario.slice(0, 4).map(item => ({
        id: item.id,
        name: item.producto.nombre,
        description: item.producto.descripcion,
        price: item.producto.precio,
        image: item.producto.urlImagen || 'https://images.unsplash.com/photo-1591390690700-89624e818b8c?w=600&h=400&q=80&auto=format&fit=crop'
      }));
      
      setFeaturedProducts(firstFourProducts);
    }
  }, [products]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=2070&auto=format&fit=crop&q=80" 
            alt="Hierbas medicinales" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-transparent mix-blend-multiply opacity-90" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="md:w-2/3 lg:w-1/2">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              El Jardín de <span className="text-green-300">Doña Rosa</span>
            </h1>
            <p className="mt-6 text-xl text-green-100 max-w-3xl">
              Tradición y sabiduría ancestral en hierbas medicinales desde 1980. 
              Cultivamos salud natural para tu bienestar.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Ver Catálogo
              </Link>
              <Link
                to="/servicios"
                className="inline-flex items-center justify-center px-5 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50"
              >
                Nuestros Servicios
              </Link>
            </div>
          </div>
        </div>
        {/* Iconos temáticos en la parte inferior del hero */}
        <div className="absolute bottom-0 left-0 right-0 bg-green-900 bg-opacity-70 backdrop-blur-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <GiHerbsBundle className="h-8 w-8 text-green-300" />
                <span className="text-white text-sm">Hierbas Frescas</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaSeedling className="h-8 w-8 text-green-300" />
                <span className="text-white text-sm">Raíces Medicinales</span>
              </div>
              <div className="flex items-center space-x-2">
                <GiMedicines className="h-8 w-8 text-green-300" />
                <span className="text-white text-sm">Preparados Naturales</span>
              </div>
              <div className="flex items-center space-x-2">
                <GiBookshelf className="h-8 w-8 text-green-300" />
                <span className="text-white text-sm">Remedios Tradicionales</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Nuestro Propósito */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Sabiduría ancestral para tu bienestar
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                En El Jardín de Doña Rosa combinamos el conocimiento tradicional sobre hierbas medicinales 
                con técnicas modernas de cultivo orgánico para ofrecerte los mejores productos naturales.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FaLeaf className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Cultivo 100% Orgánico</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Nuestras hierbas crecen sin pesticidas ni químicos, respetando los ciclos naturales
                      de la tierra para garantizar la máxima pureza y potencia medicinal.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FaUserMd className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Asesoría Personalizada</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Doña Rosa y su equipo te guían para encontrar las hierbas ideales según tus 
                      necesidades específicas de salud y bienestar.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FaShippingFast className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Frescura Garantizada</h3>
                    <p className="mt-2 text-base text-gray-500">
                      Enviamos nuestros productos recién cosechados o procesados para asegurar
                      que recibas todos sus beneficios intactos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=1200&auto=format&fit=crop&q=80" 
                  alt="Hierbas medicinales secándose" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-green-900 mix-blend-multiply opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categorías de productos */}
      <div className="bg-green-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Nuestras Categorías
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Descubre la variedad de productos naturales que tenemos para ti
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 flex flex-col h-full">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                    {category.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-gray-900 text-center h-8 overflow-hidden">{category.name}</h3>
                  <p className="mt-2 text-base text-gray-500 text-center h-12 overflow-hidden">{category.description}</p>
                  <div className="mt-auto pt-4 text-center">
                    <Link to={category.link} className="text-green-600 hover:text-green-700 font-medium">
                      Explorar &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Productos destacados */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Productos Destacados
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Los favoritos de nuestra comunidad
            </p>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative w-full h-60 bg-gray-200 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col h-40">
                    <h3 className="text-lg font-medium text-gray-900 h-12 overflow-hidden">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 h-10 overflow-hidden">{product.description}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <p className="text-lg font-medium text-gray-900">RD${Number(product.price).toLocaleString()}</p>
                      <button 
                        className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                        onClick={() => {
                          useAppStore.getState().addToCart({
                            id: product.id,
                            productoId: product.id,
                            nombre: product.name,
                            precio: product.price,
                            urlImagen: product.image,
                            stockDisponible: 10 // Valor por defecto para los productos destacados
                          });
                        }}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center text-gray-500">
              No hay productos disponibles en este momento
            </div>
          )}
          <div className="mt-12 text-center">
            <Link 
              to="/catalogo" 
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Ver Catálogo Completo
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonios */}
      <div className="bg-green-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-green-100 sm:mt-4">
              Historias reales de bienestar y recuperación
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xl font-bold">{testimonial.name[0]}</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-700 rounded-lg shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 py-16 text-center">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">¿Listo para mejorar tu salud?</span>
                  <span className="block text-green-300">Visítanos hoy mismo</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-white">
                  Descubre el poder curativo de las plantas medicinales en El Jardín de Doña Rosa.
                  Tenemos todo lo que necesitas para recuperar tu bienestar natural.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50"
                  >
                    Contáctanos
                  </Link>
                  <Link
                    to="/servicios"
                    className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-green-600"
                  >
                    Conoce nuestros servicios
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
