import {
    Input, Checkbox, Button, Typography,
} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast';

export function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginUser = async () => {

      
        try {
            const response = await axios.post("https://nuevomern-7y1b.onrender.com/api/login", {
                email,
                password,
            });

            console.log(response.data);

            const userData = JSON.stringify(response.data);
            localStorage.setItem("user", userData);

            const toastId = toast.success(`Bienvenido ${response.data.nombres}`);
            setTimeout(() => {
                toast.dismiss(toastId); // Ocultar el toast después de 3 segundos
                if(response.data.rol == "tutor"){
                    navigate("/profile");
                }else if("admin"){
                    navigate("/admin");
                }else{
                    navigate("/home");
                }
            }, 2000);
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Error:", error.response.data);
        }
    }

    return (

        
        <section className="m-8 flex gap-4">
             <img src="/img/logopngconfiazul.png" alt="Logo" className=" top-0 left-0 w-16 h-16 m-4" />
             <Toaster/>
            <div className="w-full lg:w-3/5 mt-24">

                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">Iniciar Sesion</Typography>

                </div>
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Email
                        </Typography>
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Contraseña
                        </Typography>
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <Checkbox
                        label={<Typography
                            variant="small"
                            color="gray"
                            className="flex items-center justify-start font-medium"
                        >
                            Aceptas &nbsp;
                            <a
                                href="#"
                                className="font-normal text-black transition-colors hover:text-gray-900 underline"
                            >
                                Terminos y condiciones
                            </a>
                        </Typography>}
                        containerProps={{className: "-ml-2.5"}}
                    />
                    <Button onClick={() => loginUser()} className="mt-6" fullWidth
                    style={{ background: "#7ED2F3", color: "#000000" }}>
                        Iniciar Sesion
                    </Button>


                    <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                        No estas Registrado?
                        <Link to="/sign-up" className="text-gray-900 ml-1">Crea una cuenta</Link>
                    </Typography>
                </form>

            </div>
            <div className="w-2/5 h-full hidden lg:block">
                <img
                    src="/img/inicio.jpg"
                    className="h-full w-full object-cover rounded-3xl"
                />
            </div>

        </section>);
}

export default SignIn;
