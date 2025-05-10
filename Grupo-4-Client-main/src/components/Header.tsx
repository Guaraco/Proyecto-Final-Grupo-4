import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { FaLeaf, FaUserCircle, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'
import CartModal from './CartModal'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const totalItems = useAppStore((state) => state.totalItems);

  const isAdmin = user?.role === 'Admin';

  const login = useAppStore.getState().login;

  useEffect(() => {
    login();
  }, []);

  // Cerrar el menú de perfil al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cerrar el menú de perfil al cambiar de ruta
  useEffect(() => {
    setIsProfileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/", name: "Inicio" },
    { path: "/catalogo", name: "Catálogo" },
    { path: "/nosotros", name: "Nosotros" },
    { path: "/servicios", name: "Servicios" },
    { path: "/contacto", name: "Contacto" },
    ...(isAdmin ? [{ path: "/solicitudes", name: "Solicitudes" }] : []),
  ]

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-600 hover:text-green-500'
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-2">
                <FaLeaf className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xl font-bold text-green-700">Jardín Virtual</span>
            </Link>
          </div>

          {/* Navegación - Visible en pantallas medianas y grandes */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`${isActive(item.path)} px-1 py-2 text-sm font-medium transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Botones de acción */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/carrito"
              className="relative text-gray-600 hover:text-green-500"
            >
              <FaShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {user ? (
              <div ref={profileRef} className="relative flex items-center">
                <button 
                  onClick={toggleProfileMenu}
                  className="flex items-center focus:outline-none"
                >
                  <FaUserCircle className="h-6 w-6 text-green-600 mr-2 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 cursor-pointer">{user.name}</span>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link to="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Mi perfil</Link>
                    <Link to="/compras" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Mis compras</Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }} 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Iniciar sesión
                </Link>
                <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Botón hamburguesa para móviles */}
          <div className="flex items-center md:hidden">
            <Link
              to="/carrito"
              className="relative text-gray-600 hover:text-green-500 mr-3"
            >
              <FaShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-green-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? 'bg-green-50 text-green-500'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-500'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <FaUserCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
                <div className="ml-auto flex items-center">
                  {/* Quitamos el carrito de aquí porque ya está en la barra superior */}
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 px-5 py-3">
                <Link to="/login" className="text-green-600 hover:text-green-800 text-base font-medium text-center">
                  Iniciar sesión
                </Link>
                <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white text-base font-medium py-2 rounded-md text-center transition-colors">
                  Registrarse
                </Link>
              </div>
            )}
            {user && (
              <div className="mt-3 px-2 space-y-1">
                <Link
                  to="/perfil"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-500"
                  onClick={toggleMenu}
                >
                  Mi perfil
                </Link>
                <Link
                  to="/compras"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-500"
                  onClick={toggleMenu}
                >
                  Mis compras
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-500"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal del carrito */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

export default Header
