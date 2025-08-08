import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../schema/loginShema";
import { useLoginMutation } from "../slices/userApi"
import { useDispatch } from "react-redux";
import { setUserInfo } from "../slices/auth";
import { toast } from "react-toastify";

type Inputs = z.infer<typeof loginSchema>

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Inputs>({
        resolver: zodResolver(loginSchema)
    });
    const [showPassword, setShowPassword] = useState(false);
    const submitHandler: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await login(data).unwrap()
            dispatch(setUserInfo(res))
            reset()
            toast.success("Logined Successfully!")
            navigate("/");
        } catch (error: any) {
            toast.error(error?.data?.message || error.message);
        }

    }
    return (
        <div className="max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-bold mb-5">Login</h2>
            <form action="" className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <label htmlFor="name" className="block text-sm text-gray-500 mb-1">Email</label>
                    <input
                        type="email"
                        className="border py-1 px-5 w-full border-gray-700 rounded"

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
                <button type="submit" disabled={isSubmitting || isLoading} className="text-white bg-black py-2 px-4 border w-full rounded">Login</button>

            </form>
            <Link to={'/login'}>
                <p className="text-center mt-3">
                    Do not have an account?{' '}
                    <span className=" underline cursor-pointer">
                        Rigister
                    </span>
                </p>
            </Link>

        </div>
    )
}
