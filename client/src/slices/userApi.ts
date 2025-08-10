import { apiSlice } from "./api"
interface loginInput {
    email: string,
    password: string
}
interface RegisterInput extends loginInput {
    name: string;
}
interface profileInput {
    email: string;
    avator: string;  // FileList from input, or URL string
    name: string;
}


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data: RegisterInput) => ({
                url: "register",
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        login: builder.mutation({
            query: (data: loginInput) => ({
                url: "login",
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "DELETE",
                credentials: "include"
            })
        }),
        updateProfile: builder.mutation({
            query: (data: profileInput) => ({
                url: "profile",
                method: "PUT",
                body: data,
                credentials: "include",
                headers:
                    data instanceof FormData ? {} : { "Content-Type": "application/json" },
            }),
        }),


    })
})
export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useUpdateProfileMutation } = userApiSlice