import { Link, NavLink } from "react-router-dom";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApi";
import { clearUserInfo } from "../slices/auth";


export default function Header() {
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [logout, { isLoading }] = useLogoutMutation()
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        try {
            await logout({});
            dispatch(clearUserInfo())

        } catch (error) {
            console.log(error);


        }
    }

    return (

        <nav className="flex justify-between items-center m-4">
            <Link to={"/"}> <h2 className="font-bold text-2xl">DORO</h2>
            </Link>

            {
                userInfo ? <button disabled={isLoading} type="button" onClick={logoutHandler} className="cursor-pointer text-white bg-black py-2 px-4 border">Logout</button> : <div className="space-x-4">
                    <NavLink to={"/login"} className="text-white bg-black py-2 px-4 border">
                        Login

                    </NavLink>

                    <NavLink to={"/register"} className="border py-2 px-4">
                        Register
                    </NavLink>
                </div>
            }
        </nav>

    )
}
