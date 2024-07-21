import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SetPassword() {
    const navigate = useNavigate();
    async function onlogin(values) {
        const emaill = localStorage.getItem("email");
        try {
            const res = await axios.post("http://localhost:3001/passchange", {
                email: emaill,
                pass:values.email
            });

            if (res.status === 200) {
                localStorage.clear()
                navigate("/login");
            } else {
                console.log("Unexpected status in forgot password...");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const schema = Yup.object().shape({
        email: Yup.string().min(4),
    });

    const { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: onlogin,
        validationSchema: schema,
    });

    return (
        <div className="bg-gray-100 w-screen h-screen flex items-center justify-around">
            <form onSubmit={handleSubmit} className="w-[400px] h-[250px] bg-white flex flex-col items-center gap-9 rounded-lg ">
                <header>
                    <h2 className="text-3xl font-bold  text-center mt-7">Reset Password</h2>
                </header>
                <div>
                    <label className="sr-only" htmlFor="email">Enter Email</label>
                    <div className="w-72">
                        <div className="relative h-10 w-full min-w-[200px]">
                            <input
                                type="text"
                                placeholder="Enter New Password"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="peer h-full w-full rounded-[7px] pl-4 !border z-[2]  !border-gray-300 border-t-transparent  bg-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                            />
                        </div>
                    </div>
                    {errors.email && touched.email && <div className="text-sm text-red-700 h-3">{errors.email}</div>}
                </div>
                <button type="submit" className="text-[17px] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2">
                    Reset Password
                </button>
            </form>
            <lottie-player
                src="https://lottie.host/2e4865f6-8add-4c00-a59c-0706e3699d2e/5bStF8Ce9z.json"
                background="##fff"
                speed="1"
                style={{ width: "700px", height: "700px" }}
                loop
                autoplay
                direction="1"
                mode="normal"
            ></lottie-player>
        </div>
    );
}