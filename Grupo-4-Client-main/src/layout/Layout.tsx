import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useEffect } from "react"
import { useAppStore } from "../store/useAppStore"

const Layout = () => {
  // Obtener la función login del store
  const login = useAppStore.getState().login;

  // Ejecutar login solo una vez al montar el componente
  useEffect(() => {
    login();
  }, []);

  return (
    <>
      <header>
        <Header/>
      </header>

      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default Layout
