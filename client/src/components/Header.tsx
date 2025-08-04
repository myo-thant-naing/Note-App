import { NavLink } from "react-router-dom";


export default function Header() {
    return (
        <nav className="flex justify-between items-center m-4">
            <h2 className="font-bold text-2xl">DORO</h2>
            <div className="space-x-4">
                <NavLink to={"/login"} className="text-white bg-black py-2 px-4 border">
                    Login
                </NavLink>

                <NavLink to={"/register"} className="border py-2 px-4">
                    Register
                </NavLink>
            </div>
        </nav>
    )
}
