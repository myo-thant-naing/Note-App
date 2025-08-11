import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../slices/userApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { profileSchema } from "../schema/profileSchema";
import AvatarWithPopup from "../components/AvatorPopup";
import { setUserInfo } from "../slices/auth";

type Inputs = z.infer<typeof profileSchema>;

export default function UpdateProfile() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [Update, { isLoading }] = useUpdateProfileMutation();
    const navigate = useNavigate();
    const defaultProfile = "data:image/png;base64,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"
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: userInfo?.name || "",
            email: userInfo?.email || "",
            avator: userInfo?.avator || "", // string or empty
        },
    });

    const [preview, setPreview] = useState<string>(
        userInfo?.avator || ""
    );
    const pickSuggestedAvatar = (url: string) => {
        setPreview(url);
        setValue("avator", url, { shouldValidate: true });

    };
    const submitHandler: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await Update(data).unwrap();
            dispatch(setUserInfo(res));
            toast.success("Updated Successfully");
            navigate("/");
        } catch (error: any) {
            toast.error(error?.data?.message || error.message || "Update failed");
        }
    };
    const deleteAvator = () => {
        pickSuggestedAvatar("noAvator")
        setPreview(defaultProfile)
    }
    return (
        <div className="max-w-lg mx-auto p-4">

            <h2 className="text-2xl font-bold mb-5">Profile</h2>
            <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
                <AvatarWithPopup deleteAvator={deleteAvator} preview={preview} pickSuggestedAvatar={pickSuggestedAvatar} />
                <div>
                    <label className="block text-sm text-gray-500 mb-1">Name</label>
                    <input
                        type="text"
                        className="border py-1 px-5 w-full border-gray-700 rounded"
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className="text-xs mt-1 text-red-500">{errors.name.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-gray-500 mb-1">Email</label>
                    <input
                        type="email"
                        className="border py-1 px-5 w-full border-gray-700 rounded"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-xs mt-1 text-red-500">{errors.email.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className={`py-2 px-4 border w-full rounded transition-colors ${isLoading
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-black text-white hover:bg-gray-800"
                        }`}
                >
                    {isLoading ? "Loading..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
}
