import { type JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store"; // type-only import

export const PublicOnlyRoute = ({ element }: { element: JSX.Element }) => {
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    return userInfo ? <Navigate to="/" replace /> : element;
};
