import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from "../services/api"

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/` }),
    endpoints: () => ({

    }),
})
