import React,{useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const navigate=useNavigate();
    useEffect(()=>{
        const token=localStorage.getItem("authToken")
        if(token){
            navigate("/")
        }

    },[])
    
    async function onsignup(values) {
        if (values.password === values.repass) {
          try {
            const response = await axios.post("http://localhost:3001/signup", {
              email: values.email,
              password: values.password,
              username: values.user
            });
    
            if (response.status === 200) {
                console.log("Signup Successfully...")
              navigate("/login");
            } else {
                console.log("Signup Not Successfull")

            }
          } catch (error) {
            console.error('Signup error:', error);
          }
        }
      }


    const schema=Yup.object().shape({
        email:Yup.string().email("Email must me in example@domain format"),
        password:Yup.string().min(4),
    })
    const {handleSubmit,values,handleChange,errors,touched,handleBlur}=useFormik({
        initialValues:{
            email:"",
            password:"",
            user:"",
            repass:""
        },
        onSubmit:onsignup,
        validationSchema:schema,
    })
    return(
        <div className="bg-gray-200 w-screen h-screen flex items-center justify-around flex-shrink">
        <form onSubmit={handleSubmit} className="w-[400px] bg-white flex flex-col items-center gap-9 rounded-lg ">
            <header>
                <h2 className="text-3xl font-bold  text-center mt-7">SignUp</h2>
            </header>
        
        <div >
            <label className="sr-only" htmlFor="user">Enter Username</label>
            <div className="w-72">
            <div className="relative h-10 w-full min-w-[200px] ">
            <input type="text" placeholder="Username" id="user" name="user"
            value={values.user}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="peer h-full w-full rounded-[7px] pl-4 !border z-[2]  !border-gray-300 border-t-transparent  bg-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50" />
            </div>
            </div>
            {errors.user && touched.user && <div className="text-sm text-red-700 h-3">{errors.user}</div>}
        </div>
        <div>
            <label className="sr-only" htmlFor="email">Enter Email</label>
            <div className="w-72">
            <div className="relative h-10 w-full min-w-[200px]">
            <input type="email" placeholder="Email Address" id="email" name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="peer h-full w-full rounded-[7px] pl-4 !border z-[2]  !border-gray-300 border-t-transparent  bg-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50" />
            </div>
            </div>
            {errors.email &&  touched.email && <div className="text-sm text-red-700">{errors.email}</div>}
        </div>

        <div>
            <label className="sr-only" htmlFor="password">Enter Password</label>
            <div className="w-72">
            <div className="relative h-10 w-full min-w-[200px]">
            <input type="password" placeholder="Password" id="password" name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="peer h-full w-full rounded-[7px] pl-4 !border z-[2]  !border-gray-300 border-t-transparent  bg-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50" />
            </div>
            </div>
            {errors.password &&  touched.password && <div className="text-sm text-red-700">{errors.password}</div>}
        </div>

        <div>
            <label className="sr-only" htmlFor="password">Enter Password</label>
            <div className="w-72">
            <div className="relative h-10 w-full min-w-[200px]">
            <input type="password" placeholder=" Re-enter Password" id="repass" name="repass"
            value={values.repass}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="peer h-full w-full rounded-[7px] pl-4 !border z-[2]  !border-gray-300 border-t-transparent  bg-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50" />
            </div>
            </div>
            {errors.repass &&  touched.repass && <div className="text-sm text-red-700">{errors.repass}</div>}
        </div>
        <button type="submit" className=" w-[170px] text-[17px] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2 ">SignUp</button>
        <div>
            <h6 className="mb-5">Already have an Account? &nbsp;<Link to="/login/" className="text-blue-600">Login</Link></h6>
        </div>
        </form>
        <lottie-player src="https://lottie.host/a8342975-9f17-44a9-9549-7180f155e66a/0gE1i2DTG5.json" background="##FFFFFF" speed="1" style={{width: "500px", height: "500px"}} loop autoplay direction="1" mode="normal"></lottie-player>
        <Link to="/signup"></Link>
        </div>
    );
}