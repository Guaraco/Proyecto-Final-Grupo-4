import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layout/Layout";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Servicios from "./pages/Servicios";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import Compras from "./pages/Compras";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import Perfil from "./pages/Perfil";
import Solicitudes from "./pages/Solicitudes";

const router = createBrowserRouter([

  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/catalogo",
        element: <Catalogo />,
      },
      {
        path: "/nosotros",
        element: <Nosotros />,
      },
      {
        path: "/servicios",
        element: <Servicios />,
      },
      {
        path: "/contacto",
        element: <Contacto />,
      },
      {
        path: "/solicitudes",
        element: <Solicitudes />,
      },
      {
        path: "/carrito",
        element: <Carrito />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/compras",
        element: <Compras />,
      },
      {
        path: "/seguimiento/:orderId",
          element: <OrderTrackingPage />,
      },
      {
        path: "/perfil",
        element: <Perfil />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;

