import { createSlice } from "@reduxjs/toolkit"

interface authState {
    userInfo: {
        _id: string,
        name: string,
        avator: string,
        email: string
    } | null
}

const initialState: authState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        clearUserInfo: (state) => {
            state.userInfo = null
            localStorage.removeItem("userInfo")
        }

    }
})


export const { setUserInfo, clearUserInfo } = authSlice.actions
export default authSlice.reducer