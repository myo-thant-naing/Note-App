import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod"
import { registerSchema } from "../schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

type Inputs = z.infer<typeof registerSchema>

export default function Register() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: zodResolver(registerSchema)
    });
    const [showPassword, setShowPassword] = useState(false);
    const submitHandler: SubmitHandler<Inputs> = (data) => {
        console.log(data);

    }
    return (
        <div className="max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-bold mb-5">Register</h2>
            <form action="" className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <label htmlFor="name" className="block text-sm text-gray-500 mb-1">Name</label>
                    <input
                        type="text"
                        className="border py-1 px-5 w-full border-gray-700 rounded"
                        placeholder="eg. John Smitch"
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className="text-xs mt-1 text-red-500">
                            {errors.name.message}
                        </p>
                    )}


                </div>
                <div>
                    <label htmlFor="name" className="block text-sm text-gray-500 mb-1">Email</label>
                    <input
                        type="email"
                        className="border py-1 px-5 w-full border-gray-700 rounded"
                        placeholder="eg. super@gmail.com"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-xs mt-1 text-red-500">
                            {errors.email.message}
                        </p>
                    )}

                </div>
                <div>
                    <label htmlFor="name" className="block text-sm text-gray-500 mb-1">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="border py-1 px-5 w-full border-gray-700 rounded"
                        placeholder="at least 8 chars"
                        {...register("password")}
                    />
                    <div className="flex justify-between items-center mt-2 ">
                        {errors.password && (
                            <p className="text-xs mt-1 text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                        <span></span>
                        <div className="space-x-1 flex items-center justify-self-end">
                            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} className="mt-1" /><span className="text-sm text-gray-500">show password</span>
                        </div>

                    </div>

                </div>
                <button type="submit" disabled={isSubmitting} className="text-white bg-black py-2 px-4 border w-full rounded">Register</button>

            </form>
            <Link to={'/login'}>
                <p className="text-center mt-3">
                    Do you have an account?{' '}
                    <span className=" underline cursor-pointer">
                        login
                    </span>
                </p>
            </Link>

        </div>
    )
}
