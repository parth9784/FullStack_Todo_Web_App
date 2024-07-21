import React,{useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
    const navigate = useNavigate(); 
    useEffect(()=>{
        const token=localStorage.getItem("authToken")
        // console.log(token)
        if(token){
            navigate("/")
        }
    },[])

    async function onlogin(values) {
        try {
            const response = await axios.post("http://localhost:3001/login", {
                identity: values.email,
                password: values.password
            });

            if (response.status === 200) {
                console.log("Login Successful..");
                localStorage.setItem('authToken', response.data.token);
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const schema = Yup.object().shape({
        email: Yup.string().email("Email must be in example@domain format").required("Email is required"),
        password: Yup.string().min(4, "Password must be at least 4 characters long").required("Password is required")
    });

    const { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: onlogin,
        validationSchema: schema,
    });

    return (
        <div className="bg-gray-200 w-screen h-screen flex items-center justify-around">
            <form onSubmit={handleSubmit} className="w-[400px] bg-white flex flex-col items-center gap-9 rounded-lg">
                <header>
                    <h2 className="text-3xl font-bold text-center mt-7">Login</h2>
                </header>
                
                <div>
                    <label className="sr-only" htmlFor="email">Enter Email</label>
                    <div className="w-72">
                        <div className="relative h-10 w-full min-w-[200px]">
                            <input
                                type="email"
                                placeholder="Email"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className="peer h-full w-full rounded-[7px] pl-4 !border z-[2] !border-gray-300 border-t-transparent bg-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                            />
                        </div>
                    </div>
                    {errors.email && touched.email && <div className="text-sm text-red-700 h-3">{errors.email}</div>}
                </div>

                <div className="flex flex-col">
                    <div>
                        <label className="sr-only" htmlFor="password">Enter Password</label>
                        <div className="w-72">
                            <div className="relative h-10 w-full min-w-[200px]">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    className="peer h-full w-full rounded-[7px] pl-4 !border z-[2] !border-gray-300 border-t-transparent bg-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                                />
                            </div>
                        </div>
                        {errors.password && touched.password && <div className="text-sm text-red-700">{errors.password}</div>}
                    </div>
                    <Link to="/Forgot/" className="text-blue-600 text-sm self-end mt-2">Forgot Password</Link>
                </div>

                <button type="submit" className="w-[170px] text-[17px] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2">
                    Login
                </button>

                <div>
                    <h6 className="mb-5">Don't have an account? &nbsp;<Link to="/signup/" className="text-blue-600">SignUp</Link></h6>
                </div>
            </form>

            <lottie-player
                src="https://lottie.host/61c1408e-f0a3-4250-959e-941f8672c686/e8QIONy54k.json"
                background="#fff"
                speed="1"
                style={{ width: "500px", height: "500px" }}
                loop
                autoplay
                direction="1"
                mode="normal"
            ></lottie-player>
        </div>
    );
}
