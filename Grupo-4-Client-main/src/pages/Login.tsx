import { FaLock } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginData } from "../types";
import { login } from "../services/auth/auth";
import { useAppStore } from "../store/useAppStore";
import { toast } from "react-toastify";

const Login = () => {

  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<LoginData>();
  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await login(data);
      if (response && response.user) {
        setUser(response.user);
        reset();
        toast.success("¡Sesión iniciada correctamente!");
        navigate('/');
      } else {
        toast.error("Credenciales inválidas. Por favor, verifica tus datos.");
        console.error("Respuesta de inicio de sesión inválida:", response);
      }
    } catch (error) {
      toast.error("Error al iniciar sesión. Por favor, intenta nuevamente.");
      console.error("Error al iniciar sesión:", error);
    }
  }

  return (

    <div className="w-5/6 h-screen mx-auto py-5 md:flex md:mx-auto md:w-11/12 lg:mx-auto lg:w-10/12">

        <div className="w-full h-2/6 md:h-full lg:w-1/2">
          <div className="h-full w-full flex items-center justify-center p-4 overflow-hidden relative rounded-t-xl md:rounded-t-none md:rounded-l-xl">
            
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700"></div>
            
      
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
              </div>
              <h1 className="text-white text-2xl md:text-4xl font-bold text-center">Jardín Virtual</h1>
              <p className="text-white text-md md:text-lg text-center mt-2">Tu espacio verde digital</p>
            </div>
            
         
            <div className="absolute bottom-0 w-full">
              <div className="h-8 md:h-12 bg-green-800 opacity-50"></div>
            </div>
          </div>

        </div>

        <div className="w-full bg-white rounded-b-xl md:rounded-bl-none md:rounded-r-xl lg:w-1/2">

            <div className="flex justify-center pt-10">   
                 <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf w-6 h-6 text-green-600"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                </div>
            </div>


            <div className="flex flex-col gap-2 items-center justify-center md:py-5">
                <span className="text-2xl font-bold">Bienvenido de vuelta</span>
                <span className="text-gray-500">Inicia sesión para continuar</span>
            </div>

            <div className="">

                <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="px-10 space-y-5"
                >
                    <div className="flex flex-col gap-2 pt-10">
                        <label className="font-bold" htmlFor="email">Correo electrónico</label>
                        <div className="flex items-center gap-2">
                            <div className="relative w-full">
                            <input 
                                className={`w-full p-2 pl-10 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                type="email" 
                                id="email" 
                                placeholder="Rocky@gmail.com" 
                                {...register("email", { required: "El correo electrónico es obligatorio." })}
                            />
                            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            </div>
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold" htmlFor="password">Contraseña</label>
                        <div className="flex items-center gap-2">
                            <div className="relative w-full">
                            <input 
                                className={`w-full p-2 pl-10 rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                type="password" 
                                id="password" 
                                placeholder="••••••••" 
                                {...register("password", { required: "La contraseña es obligatoria" })}
                            />
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            </div>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    
                    <div className="flex items-center gap-2 ">
                        <input 
                            className="w-4 h-4 cursor-pointer" 
                            type="checkbox" 
                            id="remember"
                            onChange={(e) => {
                                const nameInput = watch("email");
                                
                                if (e.target.checked) {
                                    const userData = { 
                                        email: nameInput || '',
                                    };
                                    localStorage.setItem("rememberedUser", JSON.stringify(userData));
                                } else {
                                    localStorage.removeItem("rememberedUser");
                                }
                            }}
                        />
                        <span className="font-bold">Recordarme</span>
                    </div>

                    <div className="flex justify-center">
                        <button className="w-full font-bold bg-green-500 text-white px-10 py-2 rounded-md cursor-pointer hover:bg-green-600 transition-colors">
                            Iniciar sesión
                        </button>
                    </div>

                    <hr />

                    <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
                        <span>¿No tienes una cuenta?</span>
                        <div className="">
                            <Link to="/register" className="text-green-500">Regístrate</Link>
                        </div>
                    </div>



                    <hr />

                    <div className="flex items-center justify-center space-x-1 md:space-x-4 pb-5">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <p className="text-gray-500">Plantas felices, clientes felices</p>
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                </form>
            </div>
            
           

        </div>
      
    </div>
  )
}

export default Login
