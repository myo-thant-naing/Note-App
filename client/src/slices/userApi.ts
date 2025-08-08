import { apiSlice } from "./api"
interface loginInput {
    email: string,
    password: string
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
export const { useLoginMutation, useLogoutMutation } = userApiSlice