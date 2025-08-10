import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../Layouts/Main";
import NoteList from "../components/NoteList";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { PublicOnlyRoute } from "./UnAuth";
import { PrivateOnlyRoute } from "./Auth"
import UpdateProfile from "../pages/UpdateProfile";

export const route = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                index: true,
                element: <PrivateOnlyRoute element={<NoteList />} />,
            }, {
                path: "updateProfile",
                element: <PrivateOnlyRoute element={<UpdateProfile />} />,
            },
            {
                path: "register",
                element: <PublicOnlyRoute element={<Register />} />,
            },
            {
                path: "login",
                element: <PublicOnlyRoute element={<Login />} />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);
