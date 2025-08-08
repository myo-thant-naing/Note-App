import { apiSlice } from "./api"
interface loginInput {
    email: string,
    password: string
}
interface RegisterInput extends loginInput {
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
        })
    })
})
export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = userApiSlice